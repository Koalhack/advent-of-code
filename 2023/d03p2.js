import { readFileSync } from 'fs';

// read input
let x = readFileSync(process.argv[2], 'utf-8').trim();

const inputArray = x.split('\n');

// filter all number and gear data with line and char index
const filtData = inputArray.map((line, lineIndex) => {
  const regex = /(\d+|\*)/g;
  let m;
  let res = [];
  while ((m = regex.exec(line)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    res.push({
      match: !isNaN(parseInt(m[0])) ? parseInt(m[0]) : m[0],
      lineIndex: lineIndex,
      index: m.index
    });
  }

  return res;
});

// split number and symbol match
const flatFiltData = filtData.flat();
const gearMatch = flatFiltData.filter(({ match }) => isNaN(match));
const numberMatch = flatFiltData.filter(({ match }) => !isNaN(match));

// find all number adjacent to a gear
const gearNumbers = gearMatch.map(gear => {
  return numberMatch.filter(
    number =>
      gear.lineIndex + 1 >= number.lineIndex &&
      gear.lineIndex - 1 <= number.lineIndex &&
      gear.index + 1 >= number.index &&
      gear.index - 1 <= number.index + String(number.match).length - 1
  );
});

// filter minimum two adjacent number to a gear
const twoPartAdjacentNumber = gearNumbers.filter(gear => gear.length >= 2);

// calculate the power of all number adjacent to gear
const powerPartNumber = twoPartAdjacentNumber.map(gear =>
  gear.reduce((acc, curr) => acc * curr.match, 1)
);

// calculate the sum of the power of all number adjacent to gear
const powerPartNumberSum = powerPartNumber.reduce((acc, curr) => acc + curr, 0);

// print the response
console.log(powerPartNumberSum);
