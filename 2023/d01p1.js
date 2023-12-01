import { readFileSync } from 'fs';

// read input
let x = readFileSync(process.argv[2], 'utf-8').trim();

// get all digits in line
let digits = x.split('\n').map(line => line.match(/\d/g));

// remove in between digits
let calibrationValues = digits.map(digitLine =>
  parseInt(digitLine[0] + digitLine[digitLine.length - 1])
);

// Sum all calibration Values
let calibrationValuesSum = calibrationValues.reduce((acc, curr) => acc + curr);

// print the response
console.log(calibrationValuesSum);
