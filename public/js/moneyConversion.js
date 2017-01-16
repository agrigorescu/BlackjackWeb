
























// function makeChange (total, coins) {
//     var tail = coins.slice(0), // clone coins, because we're about to modify it
//         head = tail.shift(); // grab the first coin out of the purse

//     // If total is less than zero, or there are no coins left, this isn't a match
//     if (total < 0 || !head) {
//         return 0;
//     }
//     // If the total reached 0, this is a match
//     else if (total === 0 ) {
//         return 1;
//     }
//     // Otherwise, branch
//     else {
//         // The first branch sends the total and a subset of `coins`
//         // The second branch send a reduced total, and all the `coins` 
//         return makeChange(total, tail) + makeChange(total-head, coins);
//     }
// }










// var chipConversion = function(amount) {
//     var count = 0;
//     var coins = [1, 2, 5, 10, 20, 50, 100, 200];

//     var changer = function(index, value){

//     var currentChip = coins[index];

//     if( index === 0){
//         if( value % currentChip === 0){
//             count++;
//          }
//         return;
//     }

//     while( value >= 0 ){
//       changer(index-1, value);
//       value -= currentChip;
//     }
//   }
//   changer(coins.length-1, amount);
//   return count;
// };


