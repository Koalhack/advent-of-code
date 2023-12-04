import { readFileSync } from 'fs';

// read input
let x = readFileSync(process.argv[2], 'utf-8').trim();

const inputArray = x.split('\n');

// regex for winningNumbers and scratchedNumbers
const winningNumbersRegex = /(?<=:).*(?=\|)/g;
const scratchedNumbersRegex = /(?<=\|).*/g;

// split input in two array one for all winningNumber an one for all scratchedNumbers
const winningNumbers = inputArray.map(line =>
  line
    .match(winningNumbersRegex)[0]
    .split(' ')
    .filter(numbers => numbers.length >= 1)
    .map(numbers => parseInt(numbers))
);

const scratchedNumbers = inputArray.map(line =>
  line
    .match(scratchedNumbersRegex)[0]
    .split(' ')
    .filter(numbers => numbers.length >= 1)
    .map(numbers => parseInt(numbers))
);

// find all Valid Scratched Numbers
const validScratchNumbers = scratchedNumbers.map(
  (lineNumbers, lineNumbersIndex) =>
    lineNumbers.filter(number =>
      winningNumbers[lineNumbersIndex].some(
        winningNumber => winningNumber === number
      )
    )
);

// calcualte the total of points
const totalValidScratchPoint = validScratchNumbers.reduce(
  (acc, curr, index) => {
    return acc + (curr.length > 0 ? 2 ** (curr.length - 1) : 0);
  },
  0
);

// print the response
console.log(totalValidScratchPoint);
