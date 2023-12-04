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

// get the numbers of Valid ScratchCard
const totalValidScratchPoint = validScratchNumbers.map(
  lineNumbers => lineNumbers.length
);

// calculate the numbers of scratchCard and copies of scratchCard depending on the win numbers
let total = { scratchCard: 0, holdback: {} };
totalValidScratchPoint.forEach((win, index) => {
  total.scratchCard++;

  for (let i = 1; i <= win; i++) {
    if (typeof total.holdback[index + i] === 'undefined') {
      total.holdback[index + i] = 1 + (1 * total.holdback[index] || 0);
    } else {
      total.holdback[index + i] += 1 + (1 * total.holdback[index] || 0);
    }
  }

  total.scratchCard += total.holdback[index] || 0;
});

// print the response
console.log(total.scratchCard);
