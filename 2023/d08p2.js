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

// get all node ending with 'A' character
let activeNodes = Object.keys(network).filter(
  node => node.split('')[2] === 'A'
);

let cycles = [];

const greteastCommonDivisor = (a, b) =>
  b === 0 ? a : greteastCommonDivisor(b, a % b);

activeNodes.forEach(node => {
  let cycle = [];

  let current_directions = directions;
  let directionIndex = 0;
  let step = 0;
  let firstZ = null;

  while (true) {
    while (step == 0 || node.split('')[2] !== 'Z') {
      step++;
      node = network[node][current_directions[directionIndex]];

      if (directionIndex >= directions.length - 1) {
        directionIndex = 0;
      } else {
        directionIndex++;
      }
    }
    cycle.push(step);

    if (firstZ === null) {
      firstZ = node;
      step = 0;
    } else if (node === firstZ) {
      break;
    }

    cycles.push(cycle);
  }
  let nums = cycles.map(cycle => cycle[0]);

  let lowestCommonMultple = nums.pop();

  nums.forEach(num => {
    lowestCommonMultple = Math.floor(
      (lowestCommonMultple * num) /
        greteastCommonDivisor(lowestCommonMultple, num)
    );
  });

  // print the response
  console.log(lowestCommonMultple);
});
