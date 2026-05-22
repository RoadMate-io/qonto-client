import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

// Résoudre __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packagePath = path.resolve(__dirname, './package.json');
const content = await readFile(packagePath, 'utf-8');
const pkg = JSON.parse(content);

// Déterminer le type de bump (patch par défaut)
const bumpType = process.argv[2] || 'patch';
const [major, minor, patch] = pkg.version.split('.').map(Number);

let newVersion;
switch (bumpType) {
  case 'major':
    newVersion = `${major + 1}.0.0`;
    break;
  case 'minor':
    newVersion = `${major}.${minor + 1}.0`;
    break;
  case 'patch':
  default:
    newVersion = `${major}.${minor}.${patch + 1}`;
    break;
}

pkg.version = newVersion;
await writeFile(packagePath, JSON.stringify(pkg, null, 2) + '\n');

console.log(`🔁 Version bumped to ${pkg.version}`);