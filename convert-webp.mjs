import sharp from "sharp";
import { readdir, stat, unlink } from "node:fs/promises";
import { join, extname, basename } from "node:path";

const ROOTS = ["src/assets/images"];

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (/\.(png|jpe?g)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

const files = (await Promise.all(ROOTS.map(walk))).flat();

let before = 0;
let after = 0;

for (const file of files) {
  const src = await stat(file);

  // Project screenshots keep PNG-style lossless fidelity, portraits get quality 82.
  const opts =
    extname(file).toLowerCase() === ".png"
      ? { quality: 88, effort: 6 }
      : { quality: 82, effort: 6 };

  const dest = join(
    file.slice(0, -extname(file).length) + ".webp",
  );

  await sharp(file).webp(opts).toFile(dest);

  const out = await stat(dest);
  before += src.size;
  after += out.size;

  const pct = Math.round((1 - out.size / src.size) * 100);
  console.log(
    `${basename(file).padEnd(24)} ${(src.size / 1024).toFixed(0).padStart(5)}kB -> ${(out.size / 1024).toFixed(0).padStart(4)}kB  -${pct}%`,
  );
}

console.log(
  `\ntotal ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024 / 1024).toFixed(2)}MB  -${Math.round((1 - after / before) * 100)}%`,
);
