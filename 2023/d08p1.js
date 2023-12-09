import { readFileSync } from 'fs';

// read input
let x = readFileSync(process.argv[2], 'utf-8').trim();

// filter all directions step
const directions = x
  .split('\n')[0]
  .split('')
  .map(direction => (direction === 'L' ? 0 : 1));

// filter network line
const networkLine = x.split(/\n\s*\n/g)[1].split('\n');
// filter network line in object with possibles directions
let network = {};
networkLine.forEach(node => {
  network[node.match(/[A-Z]{3}(?=\s*=)/g)[0]] = [
    node.match(/(?<=\()[A-Z]{3}/g)[0],
    node.match(/[A-Z]{3}(?=\))/g)[0]
  ];
});

// Set the start and stop values
let activeNode = 'AAA';
const targetNode = 'ZZZ';

// caculate the number of step to find 'ZZZ'
let directionIndex = 0;
let step = 0;

while (activeNode !== targetNode) {
  step++;

  activeNode = network[activeNode][directions[directionIndex]];

  if (directionIndex >= directions.length - 1) {
    directionIndex = 0;
  } else {
    directionIndex++;
  }
}

console.log(step);
