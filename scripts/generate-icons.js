import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const svgBuffer = fs.readFileSync('./public/app-icon.svg');

async function generateIcons() {
  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(`./public/icon-${size}x${size}.png`);
    console.log(`Generated icon-${size}x${size}.png`);
  }
  console.log('All icons generated!');
}

generateIcons().catch(console.error);
