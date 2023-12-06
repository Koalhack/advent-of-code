import { readFileSync } from 'fs';

// read input
let x = readFileSync(process.argv[2], 'utf-8').trim().split('\n');

// get the time and distances for each race
const times = x[0]
  .split(':')[1]
  .trim()
  .split(/\s+/)
  .map(time => parseInt(time));

const distances = x[1]
  .split(':')[1]
  .trim()
  .split(/\s+/)
  .map(distance => parseInt(distance));

// get number beat for each race
const NumberBeatList = times.map((time, index) => {
  let maxValue = Math.floor(time / 2) ** 2;
  if (maxValue >= distances[index]) {
    let numberBeat = 0;
    for (let i = 1; i < time; i++) {
      if (i * (time - i) > distances[index]) numberBeat++;
    }
    return numberBeat;
  }
  return 0;
});

// power all element of the Number Beat List
const powerNumberBeatList = NumberBeatList.reduce((acc, curr) => acc * curr);

//print the response
console.log(powerNumberBeatList);
