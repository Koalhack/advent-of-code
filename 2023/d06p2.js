import { readFileSync } from 'fs';

// read input
let x = readFileSync(process.argv[2], 'utf-8').trim().split('\n');

// filter the time and the duration from input
const time = parseInt(x[0].split(':')[1].trim().split(/\s+/).join(''));
const distance = parseInt(x[1].split(':')[1].trim().split(/\s+/).join(''));

// find the first match greater or equals to record distance and calculate the number of possible record
let beatRecord;
let maxValue = Math.floor(time / 2) ** 2;
if (maxValue >= distance) {
  for (let i = 1; i < Math.floor(time / 2); i++) {
    if ((time - i) * i >= distance) {
      beatRecord = time - i - (i - 1);
      break;
    }
  }
}

// print response
console.log(beatRecord);
