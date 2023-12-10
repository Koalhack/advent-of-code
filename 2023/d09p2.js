import { readFileSync } from 'fs';

// read input
let x = readFileSync(process.argv[2], 'utf-8').trim().split('\n');

// get all history lines nums
const historyLines = x.map(line => line.split(' ').map(num => parseInt(num)));

// get all next history value for each line of nums
let historyNextValueList = [];
historyLines.forEach((historyLine, index) => {
  let activeLineHistory = [historyLine];

  // calculate the difference of each nums recursively
  while (
    !activeLineHistory[activeLineHistory.length - 1].every(curr => curr === 0)
  ) {
    activeLineHistory.push(
      activeLineHistory[activeLineHistory.length - 1].reduce(
        (acc, curr, index2) => {
          if (index2 !== 0) {
            acc.diff.push(curr - acc.active);
          }
          acc.active = curr;
          return acc;
        },
        { active: 0, diff: [] }
      ).diff
    );
  }

  // calculate the difference of all first values of each recursive differences to get previous value
  historyNextValueList[index] = activeLineHistory
    .reverse()
    .reduce((acc, curr) => {
      return curr[0] - acc;
    }, 0);
});

// print the response
console.log(historyNextValueList.reduce((acc, curr) => acc + curr, 0));
