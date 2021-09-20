import { existsSync, promises } from "fs";
import delay from "@sandstreamdev/std/async/delay.js";
import fetch from "node-fetch";
import jimp from "jimp";

import * as actions from "./src/actions.js";

const { writeFile } = promises;

const main = async () => {
  let mode = 0;

  const index = {};

  let tooLong = false;

  for (const [key, action] of Object.entries(actions)) {
    const { message } = action;

    if (!message) {
      continue;
    }

    if (message.length > 48) {
      console.log(
        "Too long message " +
          message.length +
          "/48 of " +
          key +
          " of " +
          message
      );
      tooLong = true;
    }
  }

  if (tooLong) {
    return;
  }

  for (const [key, action] of Object.entries(actions)) {
    const { message } = action;

    if (!message) {
      continue;
    }

    const outputPath = `./src/stripes/${key}.jpg`;

    if (existsSync(outputPath)) {
      index[key] = key;

      continue;
    }

    while (true) {
      try {
        console.log("Pobieranie paska " + key);

        const encodedMessage = encodeURIComponent(message);

        const response = await fetch("https://pasek-tvpis.pl/", {
          credentials: "omit",
          headers: {
            accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7",
            "cache-control": "max-age=0",
            "content-type": "application/x-www-form-urlencoded",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
          },
          referrer: "https://pasek-tvpis.pl/",
          referrerPolicy: "no-referrer-when-downgrade",
          body: `fimg=${mode}&msg=${encodedMessage}`,
          method: "POST",
          mode: "cors",
        });

        const data = await response.buffer();

        console.log("Pasek pobrany");

        const image = await jimp.read(data);

        console.log(image.getWidth() + " x " + image.getHeight());

        const resized = image.autocrop().resize(jimp.AUTO, 720);

        console.log(resized.getWidth() + " x " + resized.getHeight());

        const cropped = resized.cover(1280, 720);

        const croppedData = await cropped.getBufferAsync("image/jpeg");

        await writeFile(outputPath, croppedData);

        index[key] = key;

        await delay(5000);

        mode = mode === 0 ? 1 : 0;

        break;
      } catch (error) {
        console.error(error);
      }
    }
  }

  const imports = Object.keys(index).map(
    (key) => `import ${key} from "./${key}.jpg";`
  );

  const exports = `export {\r\n${Object.keys(index)
    .map((x) => `  ${x},`)
    .join("\r\n")}\r\n};`;

  const indexModule = `${imports.join("\r\n")}\r\n\r\n${exports}\r\n`;

  await writeFile(`./src/stripes/index.js`, indexModule, "utf8");
};

main();
