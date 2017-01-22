//------------// RULES //------------ //
// ***** MAXIMUM 5 CARDS        ***** //
// ***** ACES HIGH              ***** //
// ***** 3 DECKS OF CARDS       ***** //
// ***** NO SPLITS              ***** //
// ***** DEALER TWISTS FOR < 17 ***** //
// ***** 2 ACES ON DEAL = 12    ***** //
//----------------------------------- //
import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);

class Game{
    static chipManagement(){
        let zIndex = 0;
        let height = 0;
        let chipArray = [];
        let $counter = 0;
        let $bank = 500;
        $("#double").click(function(){
            if($counter == 0){
                return;
            }
            else {
                $counter *= 2;
                $bank - counter;
            }
            $('#quantity').val($counter.toFixed(2));
            $('#bank').val($bank.toFixed(2));
        });
        $("#resetChip").click(function(){
            //Empty all of the chips in the chipStack div
            height = 0;
            $bank = 500;
            $counter = 0;
            $('.chipStack').empty();
            $("#redChip").show();
            $("#blueChip").show();
            $("#greenChip").show();
            $("#blackChip").show();
            $("#orangeChip").show();
            $('#quantity').val($counter.toFixed(2));
            $('#bank').val($bank.toFixed(2));
        });
        $("#redChip").click(function(){
            console.log("red chip clicked");
            $("#blueChip").hide();
            $("#greenChip").hide();
            $("#blackChip").hide();
            $("#orangeChip").hide();
            $('#redChip').clone().prependTo('.chipsStack').addClass("chip").animate({
                'z-index' : zIndex--,
                'marginTop' : height-=5
            });
            $counter += 0.05;
            $bank -= 0.05;
            $('.chipStackBoard').css({
                position: "absolute",
            });
            $('#quantity').val($counter.toFixed(2));
            $('#bank').val($bank.toFixed(2));
        });
        $("#blueChip").click(function(){
            $("#redChip").hide();
            $("#greenChip").hide();
            $("#blackChip").hide();
            $("#orangeChip").hide();
            $('#blueChip').clone().appendTo('.chipsStack').addClass("chip").animate({
                'z-index' : zIndex--,
                'margin-top' : height-=5
            });
            $counter += 0.50;
            $bank -= 0.50;
            $('#quantity').val($counter.toFixed(2));
            $('#bank').val($bank.toFixed(2));
        });
        $("#orangeChip").click(function(){
            $("#blueChip").hide();
            $("#greenChip").hide();
            $("#blackChip").hide();
            $("#redChip").hide();
            $('#orangeChip').clone().appendTo('.chipsStack').addClass("chip").animate({
                'z-index' : zIndex--,
                'margin-top' : height-=5
            });
            $counter += 0.10;
            $bank -= 0.10;
            $('#quantity').val($counter.toFixed(2));
            $('#bank').val($bank.toFixed(2));
        });
        $("#blackChip").click(function(){
            $("#blueChip").hide();
            $("#greenChip").hide();
            $("#redChip").hide();
            $("#orangeChip").hide();
            $('#blackChip').clone().appendTo('.chipsStack').addClass("chip").animate({
                'z-index' : zIndex--,
                'margin-top' : height-=5
            });
            $counter += 1;
            $bank -= 1;
            $('#quantity').val($counter.toFixed(2));
            $('#bank').val($bank.toFixed(2));
        });
        $("#greenChip").click(function(){
            $("#blueChip").hide();
            $("#redChip").hide();
            $("#blackChip").hide();
            $("#orangeChip").hide();
            $('#greenChip').clone().appendTo('.chipStack').addClass("chip").animate({
                'z-index' : zIndex--,
                'margin-top' : height-=5
            });
            $counter += 0.20;
            $bank -= 0.20;
            $('#quantity').val($counter.toFixed(2));
            $('#bank').val($bank.toFixed(2));
        });
    }
     static generateDeck(){
        const hearts = ["Ah", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "Jh", "Qh", "Kh"];
        const diamonds = ["Ad", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "10d", "Jd", "Qd", "Kd"];
        const clubs = ["Ac", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "10c", "Jc", "Qc", "Ks"];
        const spades = ["As", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s", "Js", "Qs", "Ks"];
        const oneDeck = $.merge($.merge(hearts, diamonds), $.merge(spades, clubs));
        const deck = oneDeck;
        return deck;
    }
    static createImagesArray(deck){
        let imgArray = [];
        for(let j=0; j<52; j++){
            let img = new Image();
            // map deck onto image array
            img.src = `../card_images/${deck[j%52]}.png`;
            imgArray.push(img);
        }
        return imgArray;
    }
    static shuffle(deck){   // cards are shuffled and dealt & spliced from deck - NOT random allocation
        let m = deck.length;
        let n = 0;
        let currentElement; 
        let index;
        // do randomization process 5 times to shuffle thoroughly
        for(let j=0; j<100; j++){
            // While there remain elements to shuffle…
            while(m){
                // Pick random element --> lim [0, m-1]
                index = Math.floor(Math.random() * m--);
                // store shuffled/random element at the end of the array
                currentElement = deck[m];
                deck[m] = deck[index];
                deck[index] = currentElement;
            }
        }
        return deck;
    }
    static deal(deck, imgArray, myScoreArray, compScoreArray, myScore, compScore, myCards, computerCards, dealerDealtCards){
        // the 4 card holder id's for cards to be dealt to start
        let dealID = ["#0", "#1", "#5", "#6"];
        let counter1 = 0;
        let counter2 = 0;
        var compCurrScore = 0;
        var myCurrScore = 0;
        // after deal enable stick and twist buttons
        $("#reset").prop("disabled", false);
        $("#stick").prop("disabled", false);
        $("#twist").prop("disabled", false);
        for(let j=0; j<2; j++){
            counter1++;
            if(j===0){
                $(dealID[j]).html(imgArray[0]);
            }else{
                let img = new Image();
                img.src = "/../../card_images/blank.jpg";
                dealerDealtCards.push(imgArray[0]);
                $(dealID[j]).html(img);                    
            }
            computerCards.push(deck[0]);
            console.log(computerCards);
            imgArray.splice(0, 1);
            deck.splice(0, 1);
            compCurrScore = this.score(computerCards, counter1, compScoreArray, compScore, "dealer");
        }
        for(let j=0; j<2; j++){
            counter2++;
            $(dealID[j+2]).html(imgArray[0]);
            myCards.push(deck[0]);
            imgArray.splice(0, 1);
            deck.splice(0, 1);
            myCurrScore = this.score(myCards, counter2, myScoreArray, myScore, "player");
        }
        console.log("dealt computer hand " + compCurrScore);
        console.log("dealt player hand " + myCurrScore);
    }
    static dealCards(deck, imgArray, counter, cards, boxes){
        cards.push(deck[0]);
        $(boxes[counter-1]).html(imgArray[0]);
        imgArray.splice(0, 1);
        deck.splice(0, 1);
    }
    static playerTurn(deck, imgArray, counter, myScore, scoreArray, myCards, betAmount){
        // let scoreArray = [];
        // the remaining 3 card holders left for player
        $("#twist").unbind().on("click", () => {
            counter++
            let playerBoxes = ["#7", "#8", "#9"];
            this.dealCards(deck, imgArray, counter, myCards, playerBoxes);
            if(counter-1 < 3){
                var myCurrScore = this.score(myCards , counter+2, scoreArray, myScore, "player");
            }
            if(myCurrScore > 21){
                $("#stick").prop("disabled", true);
                $("#twist").prop("disabled", true);
                $("#newGame").prop("disabled", true);
                console.log("player is BUST");
                return;
            }
        });
    }
    static dealerLogic(playerScore, compCurrScore, compCards){
        if(compCards[0].split('')[0] == "A" && compCards[1].split('')[0] == "6" && compCurrScore < playerScore){
            console.log("dealer sticks on soft 17");
            console.log("player wins")
            $("#newGame").prop("disabled", true);
        }
        if(compCards[0].split('')[0] == "A" && compCards[1].split('')[0] == "6" && compCurrScore > playerScore){
            console.log("dealer sticks on soft 17");
            console.log("computer wins");
            $("#newGame").prop("disabled", true);
        }
        if(compCurrScore > 21){
            $("#newGame").prop("disabled", true);
           // this.calcWinnings();
            console.log("DEALER BUST!!!");
            console.log("YOU WIN!!");
        }
        else if(compCurrScore < playerScore){
            console.log("less than player score hence twist");
            $("#stick").trigger("click");
        }else if(compCurrScore < 17){
            console.log("less than 17 hence twist");
            $("#stick").trigger("click");
        }else if(compCurrScore === playerScore){
            $("#newGame").prop("disabled", true);
          //  this.calcDraw();
            console.log("EQUAL SO DRAW!!");
        }else if(compCurrScore > playerScore){
            $("#newGame").prop("disabled", true);
          //  this.calcLoss();
            console.log("COMP WINS!!");
        }else{
            console.log("wtf you doing?");
        }
    }
    static dealerTurn(deck, imgArray, counter, compScore, compScoreArray, compCards, playerScoreArray, dealerDealtCards){ 
        let playerScore = 0;
        let computerScoreDeal = 0;
        $("#stick").unbind().on("click", () => {
            $("#1").html(dealerDealtCards[0]);
            counter++;
            playerScore = playerScoreArray.reduce((a,b) => a + b, 0);
            computerScoreDeal = compScoreArray.reduce((a,b) => a + b, 0);
            if(compCards[0].split('')[0] == "A" && compCards[1].split('')[0] == "6"){
                this.dealerLogic(playerScore, computerScore, compCards);
                return;
            }
            $("#stick").prop("disabled", true); 
            $("#twist").prop("disabled", true);
            if(computerScoreDeal > 17 && computerScoreDeal == playerScore){
                console.log("DRAW!!");
                $("#newGame").prop("disabled", true);
            } 
            if(computerScoreDeal > playerScore){
                console.log("computer wins at deal");
             //   this.calcLoss();
                return;
            }
            let dealerBoxes = ["#2", "#3", "#4"];
            this.dealCards(deck, imgArray, counter, compCards, dealerBoxes);
            if(counter-1 < 3){  // only deal 3 cards
                var compCurrScore = this.score(compCards, counter+2, compScoreArray, compScore, "dealer");
            }
            let computerScore = compScoreArray.reduce((a, b) => a + b, 0);
            console.log("computer score " + computerScore);
            this.dealerLogic(playerScore, computerScore, compCards);
        });
    }
    static score(cards, counter, scoreArray, score, player){
        // arr is only spliting each individual card that is dealt
        // cards is accumulative array of cards without being split
        let arr = cards[counter-1].toString().split('');
        if(arr.length === 3){
            score+=10;
            scoreArray.push(score);
        }else if(cards.length == 2 && cards[0].toString().split('')[0] === "A" && cards[1].toString().split('')[0] === "A"){
            score+=1;      // if two aces drawn take 12 since aces high & cant bust on deal
            scoreArray.push(score);
        }else if(arr[0] == "A"){
            score+=11;
            scoreArray.push(score);
        }else if(arr[0] === "K" || arr[0] === "Q" || arr[0] === "J"){
            score+=10;
            scoreArray.push(score);
        }else{
            score+= parseInt(arr[0]);
            scoreArray.push(score);
        }
        let sum = scoreArray.reduce((a, b) => a + b, 0);
        return sum;
    }
    static resetBoard(){
        $("#reset").click(() => {
            $("#newGame").prop("disabled", false);
            for(let j=0; j<10; j++){
                let img = new Image();
                img.src = `../../card_images/blank.jpg`;
                $(`#${j}`).html(img);
            }
        })
    }
    static init(betVal){
        $("#newGame").on("click", () => {
            this.play(betVal);
        });
    }
    static submitBet(bank, newBank){
        bank = 500;
        newBank = 500;
        $("#submitBet").unbind().on("click", (e) => {
            let betVal = $("#betVal").val();
            e.preventDefault();
            newBank -= betVal;
            $("#newGame").prop("disabled", false);
            $("#five").prop("disabled", true);
            $("#ten").prop("disabled", true);
            $("#twenty").prop("disabled", true);
            $("#fifty").prop("disabled", true);
            $("#hundred").prop("disabled", true);
            $("#bank").html(newBank);
            console.log(betVal);
            this.init(betVal);
        })
    }
    static cancelBet(bank, newBank){
        bank = 500;
        newBank = 500;
        $("#cancel").unbind().on("click", (e) => {
            $("#submitBet")[0].reset();
            $("#five").prop("disabled", false);
            $("#ten").prop("disabled", false);
            $("#twenty").prop("disabled", false);
            $("#fifty").prop("disabled", false);
            $("#hundred").prop("disabled", false);
            $("#bank").html(bank);
            this.chipControl(0);
            this.submitBet(bank, newBank);
        })
    }   
    static chipControl(value){
        $("#five").unbind().on("click", () => {
            value += 5;
            $("#ten").prop("disabled", true);
            $("#twenty").prop("disabled", true);
            $("#fifty").prop("disabled", true);
            $("#hundred").prop("disabled", true);
            $("#betVal").val(value);
        })
        $("#ten").unbind().on("click", () => {
            value += 10;
            $("#five").prop("disabled", true);
            $("#twenty").prop("disabled", true);
            $("#fifty").prop("disabled", true);
            $("#hundred").prop("disabled", true);
            $("#betVal").val(value);
        })
        $("#twenty").unbind().on("click", () => {
            value += 20;
            $("#five").prop("disabled", true);
            $("#ten").prop("disabled", true);
            $("#fifty").prop("disabled", true);
            $("#hundred").prop("disabled", true);
            $("#betVal").val(value);
        })
        $("#fifty").unbind().on("click", () => {
            value += 50;
            $("#five").prop("disabled", true);
            $("#ten").prop("disabled", true);
            $("#twenty").prop("disabled", true);
            $("#hundred").prop("disabled", true);
            $("#betVal").val(value);
        })
        $("#hundred").unbind().on("click", () => {
            value += 100;
            $("#five").prop("disabled", true);
            $("#ten").prop("disabled", true);
            $("#twenty").prop("disabled", true);
            $("#fifty").prop("disabled", true);
            $("#betVal").val(value);
        })
    }
    static play(betVal){
        // x-ScoreArrays' are for holding numbers of the scores
        // x-Cards' are for storing the actual cards i.e. 'Ah, 9s, ...'
        // x-Score's are the the sums of arrays score()
        var dealerDealtCards = [];
        var myScoreArray = [];
        var compScoreArray = [];
        var myCards = [];
        var compCards = [];
        var imgArray = [];
        var myScore = 0;    
        var compScore = 0;
        var counter = 0;
        var deck = this.generateDeck();
        this.shuffle(deck);
        imgArray = this.createImagesArray(deck);
        this.deal(deck, imgArray, myScoreArray, compScoreArray, myScore, compScore, myCards, compCards, dealerDealtCards);
        this.playerTurn(deck, imgArray, counter, myScore, myScoreArray, myCards);
        this.dealerTurn(deck, imgArray, counter, compScore, compScoreArray, compCards, myScoreArray, dealerDealtCards);
        this.chipManagement();
        this.resetBoard();  
        console.log("bet value: " + betVal)
    }
}
module.exports = Game;