var chipConversion = function(amount) {
    var count = 0;
    var coins = [1, 2, 5, 10, 20, 50, 100, 200];

    var changer = function(index, value){

    var currentChip = coins[index];

    if( index === 0){
        if( value % currentChip === 0){
            count++;
         }
        return;
    }

    while( value >= 0 ){
      changer(index-1, value);
      value -= currentChip;
    }
  }
  changer(coins.length-1, amount);
  return count;
};


