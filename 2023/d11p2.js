import { readFileSync } from 'fs';

// read input
let input = readFileSync(process.argv[2], 'utf-8').trim().split('\n');

const galaxyChar = '#';
const ExpansionSize = 1000000;
let emptyRows = Array.from({ length: input.length }, () => true);
let emptyCols = Array.from({ length: input[0].length }, () => true);

//find all empty row and col
input.forEach((row, y) =>
  row.split('').forEach((col, x) => {
    if (col === galaxyChar) {
      emptyRows[y] = false;
      emptyCols[x] = false;
    }
  })
);

//get the index of all empty row
const emptyRowsIndex = emptyRows
  .map((val, index) => (val === false ? val : index))
  .filter(val => val !== false);
const emptyColsIndex = emptyCols
  .map((val, index) => (val === false ? val : index + 1))
  .filter(val => val !== false);

//filter all galaxies and get it's coordinates
const allGalaxyPos = input.flatMap((line, y) =>
  line
    .split('')
    .map((char, x) => (char === galaxyChar ? { x: x, y: y } : null))
    .filter(char => char !== null)
);

// add new offset ExpansionSize to each galaxies
const allGalaxyPosExpansion = allGalaxyPos.map(galaxy => {
  const newRowExpansionOffset = emptyRowsIndex.filter(
    rowIndex => rowIndex <= galaxy.y
  ).length;
  const newColExpansionOffset = emptyColsIndex.filter(
    colIndex => colIndex <= galaxy.x
  ).length;

  galaxy.y += newRowExpansionOffset * ExpansionSize - newRowExpansionOffset;
  galaxy.x += newColExpansionOffset * ExpansionSize - newColExpansionOffset;
  return galaxy;
});

// calculate for each all possible shortest path to other galaxy
const shortestPathGalaxies = allGalaxyPosExpansion.map((galaxy, index) => {
  let resArray = [];
  allGalaxyPos.forEach((galaxy2, index2) => {
    if (index < index2) {
      resArray.push(
        Math.abs(galaxy2.y - galaxy.y) + Math.abs(galaxy2.x - galaxy.x)
      );
    }
  });
  return resArray;
});

//print the response
console.log(shortestPathGalaxies.flat().reduce((acc, curr) => acc + curr, 0));
