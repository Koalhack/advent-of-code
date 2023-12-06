import { readFileSync } from 'fs';

// read input
let x = readFileSync(process.argv[2], 'utf-8').trim();

// get all seeds numbers
const seedsRegex = /(?<=seeds:).*/g;
const seeds = x
  .match(seedsRegex)[0]
  .split(' ')
  .filter(seed => seed.length >= 1)
  .map(seed => parseInt(seed));

// get almanac map step and filter it
const blankLineRegex = /\n\s*\n/g;
const almanacMapTitleRegex = /.*(?=map)/g;
const almanacMap = x
  .split(blankLineRegex)
  .slice(1)
  .map(map => {
    return {
      title: map.match(almanacMapTitleRegex)[0].trim(),
      maps: map
        .split('\n')
        .slice(1)
        .map(numberList => {
          const newNumberList = numberList
            .split(' ')
            .map(number => parseInt(number));
          return {
            destinationRange: newNumberList[0],
            sourceRange: newNumberList[1],
            rangeLength: newNumberList[2]
          };
        })
    };
  });

// get the list of all seeds locations
const seedsLocation = seeds.map(seed => {
  return almanacMap.reduce((accStep, currStep) => {
    accStep = currStep.maps.reduce((accMap, currMap) => {
      if (
        accStep >= currMap.sourceRange &&
        accStep <= currMap.sourceRange + currMap.rangeLength
      ) {
        accMap = accStep - currMap.sourceRange + currMap.destinationRange;
      }
      return accMap;
    }, accStep);
    return accStep;
  }, seed);
});

// print the response
const incrSort = (a, b) => a - b;
console.log(seedsLocation.sort(incrSort)[0]);
