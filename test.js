var leoProfanity = require('leo-profanity');
var frenchBadwordsList = require('french-badwords-list');
 
// Only keep french badwords
leoProfanity.clearList();
leoProfanity.add(frenchBadwordsList.array);
 
// output: true
let tableau = leoProfanity.check('je taime');
 
console.log(tableau);