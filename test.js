const stringSimilarity = require(`string-similarity`);

const similarity = stringSimilarity.compareTwoStrings(`healed`, `sealed`);

const matches = stringSimilarity.findBestMatch(`healed`, [
  `edward`,
  `sealed`,
  `theatre`,
]);

console.log(similarity);
console.log(matches);