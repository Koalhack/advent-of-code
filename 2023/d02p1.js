import { readFileSync } from 'fs';

// read input
const x = readFileSync(process.argv[2], 'utf-8').trim();

// Set game cube limit
const cubeLimit = { red: 12, green: 13, blue: 14 };

const colorRegex = color => new RegExp(`\d*(?=\s*${color})`, 'g');

// convert text to filtered data
const gameData = x.split('\n').map((line, index) => ({
  ID: parseInt(line.match(/\d*(?=:)/g)[0]),
  game: line
    .match(/(?<=:).*/g)[0]
    .split(';')
    .map(set => ({
      red: parseInt(set.match(/\d*(?=\s*red)/g)?.[0]) || 0,
      green: parseInt(set.match(/\d*(?=\s*green)/g)?.[0]) || 0,
      blue: parseInt(set.match(/\d*(?=\s*blue)/g)?.[0]) || 0
    }))
}));

// filter possibleGame with limit
const possibleGame = gameData.filter(game => {
  const validSets = game.game.map(
    set =>
      set.red <= cubeLimit.red &&
      set.green <= cubeLimit.green &&
      set.blue <= cubeLimit.blue
  );
  return validSets.reduce((acc, curr) => acc && curr);
});

// count the sum of valid ID
const PossibleGameIDSum = possibleGame.reduce((arr, curr) => arr + curr.ID, 0);

// print the response
console.log(PossibleGameIDSum);
