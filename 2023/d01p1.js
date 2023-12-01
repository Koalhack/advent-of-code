import { readFileSync } from 'fs';

let x = readFileSync(process.argv[2], 'utf-8').trim();
