import { readFileSync } from 'fs';

// read input
let x = readFileSync(process.argv[2], 'utf-8').trim().split('\n');

// filter handList to get hand and bid of each row
const handsList = x.map(line => {
  line = line.split(' ');
  return { hand: line[0], bid: parseInt(line[1]) };
});

// convert card type to a specific value
let letterMap = {
  A: 23,
  K: 22,
  Q: 21,
  J: 20,
  T: 19,
  9: 17,
  8: 16,
  7: 15,
  6: 14,
  5: 13,
  4: 12,
  3: 11,
  2: 10
};

// decreasing sort algorithm
const decrSort = (a, b) => b - a;

// function to sort hand by it's kind
function classify(hand) {
  const [first, second] = Object.values(
    hand.split('').reduce((acc, curr) => {
      if (acc[curr] === undefined) {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
      }
      return acc;
    }, {})
  ).sort(decrSort);

  if (first === 5) {
    return 6;
  }
  if (first === 4) {
    return 5;
  }
  if (first === 3) {
    if (second === 2) {
      return 4;
    }
    return 3;
  }
  if (first === 2) {
    if (second === 2) {
      return 2;
    }
  }
  if (first === 2) {
    if (second === 1) {
      return 1;
    }
  }
  return 0;
}

// function to obtain rank kind and strength of each hand
function strength(hand) {
  return [
    classify(hand),
    parseInt(
      hand
        .split('')
        .map(card => {
          if (letterMap[card] !== undefined) {
            return String(letterMap[card]);
          } else {
            return '0';
          }
        })
        .join('')
    )
  ];
}

// sort depending on the rank kind and hand strength
handsList.sort((a, b) => {
  a = strength(a.hand);
  b = strength(b.hand);

  if (a[0] === b[0]) {
    return a[1] - b[1];
  }
  return a[0] > b[0] ? 1 : -1;
});

// calculate the total winning
const total = handsList.reduce(
  (acc, curr, index) => (acc += (index + 1) * curr.bid),
  0
);

// calculate the total winning
console.log(total);
