import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1x1 transparent PNG (base64)
const placeholderBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
const placeholderBuffer = Buffer.from(placeholderBase64, 'base64');

// Read vite.config.ts to extract all figma:asset aliases
const viteConfigPath = path.join(__dirname, 'vite.config.ts');
let viteConfig = fs.readFileSync(viteConfigPath, 'utf-8');

// Extract all lines like: 'figma:asset/...': path.resolve(__dirname, './src/assets/...')
const regex = /'figma:asset\/([^']+)':\s*path\.resolve\(__dirname,\s*'\.\/src\/assets\/([^']+)'\)/g;
let match;
const assetsDir = path.join(__dirname, 'src', 'assets');

// Ensure assets directory exists
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

let count = 0;
while ((match = regex.exec(viteConfig)) !== null) {
  const [_, hash, filename] = match;
  const filePath = path.join(assetsDir, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, placeholderBuffer);
    console.log(`✅ Created placeholder: ${filename}`);
    count++;
  } else {
    console.log(`⏩ Already exists: ${filename}`);
  }
}

console.log(`\n🎉 Created ${count} placeholder images.`);