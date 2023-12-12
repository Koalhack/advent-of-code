import { readFileSync } from 'fs';

// read input
let input = readFileSync(process.argv[2], 'utf-8').trim();

// define old char and new char with it's limitations of direction
const oldChar = ['F', '7', 'J', 'L', '-', '|', 'S'];
const newChar = {
  '┌': { left: [], top: [], right: ['┐', '┘', '─'], bottom: ['┘', '└', '|'] },
  '┐': { left: ['┌', '└', '─'], top: [], right: [], bottom: ['┘', '└', '|'] },
  '┘': { left: ['┌', '└', '─'], top: ['┐', '┌', '|'], right: [], bottom: [] },
  '└': { left: [], top: ['┐', '┌', '|'], right: ['┐', '┘', '─'], bottom: [] },
  '─': { left: ['┌', '└', '─'], top: [], right: ['┐', '┘', '─'], bottom: [] },
  '|': { left: [], top: ['┐', '┌', '|'], right: [], bottom: ['┘', '└', '|'] },
  S: {
    left: ['┌', '└', '─'],
    top: ['┐', '┌', '|'],
    right: ['┐', '┘', '─'],
    bottom: ['┘', '└', '|']
  }
};

// replace old char by new one
Object.keys(newChar).forEach((char, index) => {
  input = input.replaceAll(oldChar[index], char);
});

let activesPos = [];
let inputMap = input.split('\n').map(line => line.split(''));

// find the location of the 'S' char
input.split('\n').forEach((row, y) => {
  row.split('').forEach((col, x) => {
    if (col === 'S') {
      activesPos.push({ char: col, x: x, y: y });
    }
  });
});

// follow all possible pipes network while all actives pipes join to the same location
while (
  activesPos.length <= 1 ||
  activesPos.reduce(
    (acc, curr) => {
      acc.state = acc.val.x === curr.x && acc.val.y === curr.y;
      acc.val = curr;
      return acc;
    },
    { state: null, val: activesPos[0] }
  ).state === false
) {
  //create x, y matrix of the input data
  input.split('\n').forEach((row, y) => {
    row.split('').forEach((col, x) => {
      //for each active pipe find the next pipe
      activesPos.forEach(activePos => {
        function addActive() {
          inputMap[y][x] = `\x1b[31m${inputMap[y][x]}\x1b[0m`;
          if (activePos.char !== 'S') {
            activesPos.shift();
          }
          activesPos.push({
            char: col,
            x: x,
            y: y,
            last: { char: activePos.char, x: activePos.x, y: activePos.y }
          });
          console.log(activesPos);
        }

        if (activePos.y === y && x !== activePos?.last?.x) {
          if (
            (x === activePos.x + 1 &&
              newChar[activePos.char].right.includes(col)) ||
            (x === activePos.x - 1 &&
              newChar[activePos.char].left.includes(col))
          ) {
            addActive();
          }
        }

        if (activePos.x === x && y !== activePos?.last?.y) {
          if (
            (y === activePos.y - 1 &&
              newChar[activePos.char].top.includes(col)) ||
            (y === activePos.y + 1 &&
              newChar[activePos.char].bottom.includes(col))
          ) {
            addActive();
          }
        }

        if (
          activePos.char === 'S' &&
          x > activePos.x + 1 &&
          y > activePos.y + 1
        ) {
          activesPos.shift();
        }
      });
    });
  });
}

console.log(inputMap.map(line => line.join('')).join('\n'));

/* console.log(
  inputMap
    .map(line => line.join('').match(/(?<=\s+)\S{1,3}(?=\s+)/g) || [])
    .reduce((acc, curr) => acc + curr.join('').length, 0)
); */
