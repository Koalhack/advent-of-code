import { readFileSync } from 'fs';

// read input
const x = readFileSync(process.argv[2], 'utf-8').trim();

// decreasing sort function
const decrSort = (a, b) => b - a;

// convert text to filtered data
const gameData = x.split('\n').map(line => {
  let sets = line.match(/(?<=:).*/g)[0];
  return {
    ID: parseInt(line.match(/\d*(?=:)/g)[0]),
    game: {
      red: sets
        .match(/\d*(?=\s*red)/g)
        .map(cube => parseInt(cube || 0))
        .sort(decrSort)[0],
      green: sets
        .match(/\d*(?=\s*green)/g)
        .map(cube => parseInt(cube || 0))
        .sort(decrSort)[0],
      blue: sets
        .match(/\d*(?=\s*blue)/g)
        .map(cube => parseInt(cube || 0))
        .sort(decrSort)[0]
    }
  };
});

// calculate the sum of the power of these sets
const gameSumPowerSets = gameData.reduce(
  (acc, curr) => acc + curr.game.red * curr.game.green * curr.game.blue,
  0
);

console.log(gameSumPowerSets);
