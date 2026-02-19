// generate-sql.js
// Run with: node generate-sql.js

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the dataSync.ts file (adjust path if needed)
const dataSyncPath = resolve(__dirname, 'src/utils/dataSync.ts');
const dataSyncContent = readFileSync(dataSyncPath, 'utf-8');

// Extract the FALLBACK_CHARACTERS array using a simple regex
const match = dataSyncContent.match(/const FALLBACK_CHARACTERS: Character\[\] = (\[[\s\S]*?\]);/);
if (!match) {
  console.error('Could not find FALLBACK_CHARACTERS in dataSync.ts');
  process.exit(1);
}

// Use eval to parse the array (safe because it's your own code)
const fallbackCharacters = eval('(' + match[1] + ')');

// Generate SQL INSERT statements
let sql = 'INSERT INTO characters (name, species, habitat, description, image_url, personality_traits, fun_facts, discovered) VALUES\n';
const values = fallbackCharacters.map(char => {
  const name = char.name.replace(/'/g, "''");
  const species = char.animalType?.replace(/'/g, "''") || '';
  const habitat = char.category || '';
  const description = char.description?.replace(/'/g, "''") || '';
  const imageUrl = `characters/${char.id}.png`; // Adjust naming convention as needed
  const personalityTraits = char.personality ? `ARRAY[${char.personality.map(t => `'${t.replace(/'/g, "''")}'`).join(',')}]` : 'NULL';
  const funFacts = char.funFact ? `ARRAY['${char.funFact.replace(/'/g, "''")}']` : 'NULL';
  const discovered = true;

  return `('${name}', '${species}', '${habitat}', '${description}', '${imageUrl}', ${personalityTraits}, ${funFacts}, ${discovered})`;
}).join(',\n');

sql += values + ';';

console.log(sql);