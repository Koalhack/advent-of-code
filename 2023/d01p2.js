import { readFileSync } from 'fs';

// read input
const x = readFileSync(process.argv[2], 'utf-8').trim();
const inputArray = x.split('\n');

const digitsLetter = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine'
];

const digitsLetterInversed = digitsLetter.map(digitLetter =>
  digitLetter.split('').reverse().join('')
);

// Some regex to have all digit (number or letter)
const regexNumber = new RegExp(`(${digitsLetter.join('|')}|\\d)`, 'g');
const regexNumberInversed = new RegExp(
  `(${digitsLetterInversed.join('|')}|\\d)`,
  'g'
);

// get first and last digit (number or letter);
let digits = inputArray.map(line => [
  line.match(regexNumber)[0],
  line
    .split('')
    .reverse()
    .join('')
    .match(regexNumberInversed)[0]
    .split('')
    .reverse()
    .join('')
]);

// remove in between digits
let calibrationValues = digits.map(digitLine => {
  let lastItem = digitLine.length - 1;

  digitLine = digitLine.map(digit => {
    if (digit.length > 1) {
      digit = String(digitsLetter.indexOf(digit) + 1);
    }
    return digit;
  });

  return parseInt(digitLine[0] + digitLine[lastItem]);
});

// Sum all calibration Values
let calibrationValuesSum = calibrationValues.reduce((acc, curr) => acc + curr);

// print the response
console.log(calibrationValuesSum);
