import sharp from "sharp";
import { readFile } from "node:fs/promises";
// Манифест хранит пути к результатам генерации; семейное фото не публикуется.
const manifest = JSON.parse(
  await readFile(
    new URL("../docs/illustration-assets.json", import.meta.url),
    "utf8",
  ),
);
for (const asset of manifest) {
  await sharp(asset.source)
    .resize({ width: 1024, withoutEnlargement: true })
    .webp({ quality: 86 })
    .toFile(`public/illustrations/${asset.name}.webp`);
  await sharp(asset.source)
    .resize({ width: 512, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(`public/illustrations/${asset.name}-small.webp`);
}
