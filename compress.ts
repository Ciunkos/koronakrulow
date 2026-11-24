import { promises } from "fs";
import { glob } from "glob";
import fs from "fs";
import sharp from "sharp";

const { writeFile } = promises;

// Read each file fully before overwriting it.
sharp.cache(false);

const getFileSizeInBytes = (fileName: string) => {
  const stats = fs.statSync(fileName);
  const fileSizeInBytes = stats["size"];
  return fileSizeInBytes;
};

// Same settings as the former imagemin pipeline:
// mozjpeg { quality: 95, progressive: true } -> jpeg with mozjpeg defaults,
// pngquant { quality: [0.9, 0.95], speed: 4 } -> png palette, quality 95, effort 7 (= 11 - speed),
// optipng { optimizationLevel: 4 } -> maximum zlib compression.
const options = {
  jpeg: {
    mozjpeg: true,
    progressive: true,
    quality: 95,
  },
  png: {
    palette: true,
    quality: 95,
    effort: 7,
    compressionLevel: 9,
  },
};

const optimize = (file: string) => {
  const image = sharp(file);

  return file.endsWith(".jpg")
    ? image.jpeg(options.jpeg).toBuffer()
    : image.png(options.png).toBuffer();
};

const main = async () => {
  // glob 9+ returns files in no particular order; sort for stable output.
  const files = (await glob("build/static/media/*.{png,jpg}")).sort();
  console.log(files);

  let i = 1;

  for (const file of files) {
    const j = i;

    console.log(`Optimizing [${j}/${files.length}]: ${file}...`);

    const before = getFileSizeInBytes(file);

    const data = await optimize(file);

    const after = data.byteLength;

    console.log(`${after}/${before} = ${Math.round((after / before) * 100)}%`);

    if (after < before) {
      await writeFile(file, data);
    } else {
      console.log("Skipped due to overgrowth.");
    }

    i++;
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
