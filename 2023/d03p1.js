import { readFileSync } from 'fs';

// read input
let x = readFileSync(process.argv[2], 'utf-8').trim();

const inputArray = x.split('\n');

// filter all number and symbol data with line and char index
const filtData = inputArray.map((line, lineIndex) => {
  const regex = /(\d+|[^\.])/g;
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
const symbolMatch = flatFiltData.filter(({ match }) => isNaN(match));
const numberMatch = flatFiltData.filter(({ match }) => !isNaN(match));

// find PartNumbers adjacent to a symbol
const partNumbers = numberMatch.filter(number =>
  symbolMatch.some(
    symbol =>
      symbol.lineIndex <= number.lineIndex + 1 &&
      symbol.lineIndex >= number.lineIndex - 1 &&
      symbol.index <= number.index + String(number.match).length &&
      symbol.index >= number.index - 1
  )
);

// calcualte the sum of PartNumbers
const partNumbersSum = partNumbers.reduce((acc, curr) => acc + curr?.match, 0);

// Print the response
console.log(partNumbersSum);
