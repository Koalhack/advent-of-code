import { readFileSync } from 'fs';

// read input
let x = readFileSync(process.argv[2], 'utf-8').trim();

// get all seeds numbers
const seedsLineRegex = /(?<=seeds:).*/g;
const seedsRangeRegex = /\d+\s*\d+/g;
let seedsRange = x
  .match(seedsLineRegex)[0]
  .match(seedsRangeRegex)
  .map(seedRange => {
    seedRange = seedRange.split(' ');
    return {
      start: parseInt(seedRange[0]),
      end: parseInt(seedRange[0]) + parseInt(seedRange[1])
    };
  });

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

/* // get the list of all seeds locations
const seedsLocation = seedsRange.map(seedRange => {
  let seed = seedRange[0];
  let seedLength = seedRange[1];
  return almanacMap.reduce(
    (accStep, currStep) => {
      accStep = currStep.maps.reduce((accMap, currMap) => {
        let os = Math.max(accStep.start, currMap.sourceRange);
        let oe = Math.max(
          accStep.end,
          currMap.sourceRange + currMap.rangeLength
        );
        if (os < oe) {
          accMap = {
            start: accStep.start
          }
        }
      }, accStep);
      return accStep;
    },
    { start: seed, end: seed + seedLength }
  );
}); */

almanacMap.forEach(step => {
  let lowerSeedsLocations = [];
  while (seedsRange.length > 0) {
    const { start, end } = seedsRange.pop();
    step.maps.every(map => {
      let os = Math.max(start, map.sourceRange);
      let oe = Math.min(end, map.sourceRange + map.rangeLength);
      if (os < oe) {
        lowerSeedsLocations.push({
          start: os - map.sourceRange + map.destinationRange,
          end: oe - map.sourceRange + map.destinationRange
        });
        if (os > start) {
          seedsRange.push({ start: start, end: os });
        }
        if (oe < end) {
          seedsRange.push({ start: oe, end: end });
        }
        return true;
      } else {
        lowerSeedsLocations.push({ start: start, end: end });
      }
    });
  }
  seedsRange = lowerSeedsLocations;
});

// print the response
console.log(seedsRange.sort((a, b) => a.start - b.start));
