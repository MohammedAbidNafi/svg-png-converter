import * as fs from "fs";
import * as path from "path";
import convert from "svg2png";

const inputFolder = "input";
const outputFolder = "output";

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

fs.readdirSync(inputFolder).forEach((file) => {
  if (path.extname(file) === ".svg") {
    const inputPath = path.join(inputFolder, file);
    const outputPath = path.join(outputFolder, `${path.parse(file).name}.png`);

    const svgBuffer = fs.readFileSync(inputPath);

    convert(svgBuffer)
      .then((buffer: string | NodeJS.ArrayBufferView) =>
        fs.writeFileSync(outputPath, buffer)
      )
      .then(() => console.log(`Converted ${file} to PNG.`))
      .catch((e: any) => console.error(`Error converting ${file}:`, e));
  }
});
