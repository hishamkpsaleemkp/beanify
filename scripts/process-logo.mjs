// Crops the supplied transparent logo into tight assets (full logo, "B" mark) in garnet + bone.
// Usage: node scripts/process-logo.mjs
import sharp from "sharp";
import path from "node:path";

const SRC = path.resolve("public/assets/beenify-logo.png");
const OUT = path.resolve("public/assets");
const GARNET = [0x78, 0x1c, 0x2e];
const BONE = [0xf9, 0xf6, 0xee];

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;

// The supplied PNG is already transparent: the shape lives in the alpha channel.
const alpha = new Uint8Array(width * height);
for (let i = 0; i < width * height; i++) alpha[i] = data[i * 4 + 3];

function bbox(x0, x1) {
  let minX = x1, maxX = x0, minY = height, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = x0; x < x1; x++) {
      if (alpha[y * width + x] > 12) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

// Find the first empty column run after the "B" symbol to split mark / wordmark.
const inked = (x) => { for (let y = 0; y < height; y++) if (alpha[y * width + x] > 12) return true; return false; };
let markEnd = 0, seen = false;
for (let x = 0; x < width; x++) {
  if (inked(x)) seen = true;
  else if (seen) { markEnd = x; break; }
}

const full = bbox(0, width);
const mark = bbox(0, markEnd);
console.log("full", full, "mark", mark);

async function render(rgb, box, file) {
  const buf = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    buf[i * 4] = rgb[0];
    buf[i * 4 + 1] = rgb[1];
    buf[i * 4 + 2] = rgb[2];
    buf[i * 4 + 3] = alpha[i];
  }
  await sharp(buf, { raw: { width, height, channels: 4 } })
    .extract(box)
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, file));
}

await render(GARNET, full, "logo.png");
await render(BONE, full, "logo-light.png");
await render(GARNET, mark, "logo-mark.png");
await render(BONE, mark, "logo-mark-light.png");

// Favicon / app icons: garnet mark on bone, square.
async function icon(size, file) {
  const inner = Math.round(size * 0.6);
  const m = await sharp(path.join(OUT, "logo-mark.png")).resize({ width: inner, height: inner, fit: "inside" }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: { r: 0xf9, g: 0xf6, b: 0xee, alpha: 1 } } })
    .composite([{ input: m, gravity: "centre" }])
    .png()
    .toFile(file);
}
await icon(512, path.resolve("src/app/icon.png"));
await icon(180, path.resolve("src/app/apple-icon.png"));
