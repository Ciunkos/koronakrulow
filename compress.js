import { promises } from "fs";
import glob from "glob";
import fs from "fs";
import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminOptipng from "imagemin-optipng";

const { writeFile } = promises;

const getFileSizeInBytes = (fileName) => {
  const stats = fs.statSync(fileName);
  const fileSizeInBytes = stats["size"];
  return fileSizeInBytes;
};

const options = {
  optipng: {
    optimizationLevel: 3,
  },
  pngquant: {
    quality: [0.65, 0.9],
    speed: 4,
  },
  mozjpeg: {
    progressive: true,
    quality: 85,
  },
};

const main = () => {
  glob("build/static/media/*.{png,jpg}", {}, async (error, files) => {
    console.log(files);

    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      process.exit(1);
      return;
    }

    let i = 1;

    for (const file of files) {
      const j = i;
      const plugins = [
        file.endsWith(".jpg") && imageminMozjpeg(options.mozjpeg),
        file.endsWith(".png") && imageminPngquant(options.pngquant),
        file.endsWith(".png") && imageminOptipng(options.optipng),
      ].filter(Boolean);

      console.log(`Optimizing [${j}/${files.length}]: ${file}...`);

      const before = getFileSizeInBytes(file);

      const result = await imagemin([file], {
        plugins,
      });

      const [{ data }] = result;

      const after = data.byteLength;

      // eslint-disable-next-line no-console
      console.log(
        `${after}/${before} = ${Math.round((after / before) * 100)}%`
      );

      if (after < before) {
        await writeFile(file, data);
      } else {
        // eslint-disable-next-line no-console
        console.log("Skipped due to overgrowth.");
      }

      i++;
    }
  });
};

main();
