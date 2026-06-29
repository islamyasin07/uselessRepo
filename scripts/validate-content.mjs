import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const catalogPaths = ["public/data/characters.json", "public/universe/characters.json"];
const validSides = new Set(["angel", "evil"]);
const validCategories = new Set(["anime", "singer", "gaming", "realm"]);
const requiredFields = ["category", "name", "video", "background", "side", "bio", "role", "stats"];

const errors = [];

const readCatalog = (path) => {
  try {
    return JSON.parse(readFileSync(join(root, path), "utf8"));
  } catch (error) {
    errors.push(`${path}: could not parse JSON (${error.message})`);
    return { characters: [] };
  }
};

const catalogs = catalogPaths.map((path) => ({ path, data: readCatalog(path) }));

for (const { path, data } of catalogs) {
  if (!Array.isArray(data.characters)) {
    errors.push(`${path}: characters must be an array`);
    continue;
  }

  const names = new Set();
  const sideCounts = { angel: 0, evil: 0 };

  for (const character of data.characters) {
    for (const field of requiredFields) {
      if (character[field] == null || character[field] === "") {
        errors.push(`${path}: ${character.name || "unknown"} is missing ${field}`);
      }
    }

    if (names.has(character.name)) {
      errors.push(`${path}: duplicate character name "${character.name}"`);
    }
    names.add(character.name);

    if (!validSides.has(character.side)) {
      errors.push(`${path}: ${character.name} has invalid side "${character.side}"`);
    } else {
      sideCounts[character.side] += 1;
    }

    if (!validCategories.has(character.category)) {
      errors.push(`${path}: ${character.name} has invalid category "${character.category}"`);
    }

    for (const field of ["image", "video", "background"]) {
      if (!character[field]) continue;
      const assetPath = join(root, "public", character[field].replace(/^\//, ""));
      if (!existsSync(assetPath)) {
        errors.push(`${path}: ${character.name} ${field} does not exist: ${character[field]}`);
      }
    }

    if (!Array.isArray(character.stats) || character.stats.length !== 3) {
      errors.push(`${path}: ${character.name} must have exactly 3 stats`);
    } else {
      for (const stat of character.stats) {
        if (!stat.label || !stat.value) {
          errors.push(`${path}: ${character.name} has an incomplete stat`);
        }
      }
    }
  }

  if (sideCounts.angel < 6) {
    errors.push(`${path}: expected at least 6 angel entries`);
  }
  if (sideCounts.evil < 5) {
    errors.push(`${path}: expected at least 5 evil entries`);
  }
}

const [primary, mirror] = catalogs;
if (JSON.stringify(primary.data) !== JSON.stringify(mirror.data)) {
  errors.push("public/data/characters.json and public/universe/characters.json must stay in sync");
}

if (errors.length) {
  console.error(["Content validation failed:", ...errors.map((error) => `- ${error}`)].join("\n"));
  process.exit(1);
}

console.log("Content validation passed.");
