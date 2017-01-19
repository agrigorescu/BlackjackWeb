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
        let currentElement; 
        let index;
        // do randomization process 5 times to shuffle thoroughly
        for(let j=0; j<5; j++){
            // While there remain elements to shuffle…
            while(m>0){
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
    static deal(deck, imgArray, myScoreArray, compScoreArray, myScore, compScore, myCards, compCards, dealerDealtCards){
        // the 4 card holder id's for cards to be dealt to start
        let counter1 = 0;
        let counter2 = 0;
        var compCurrScore = 0;
        var myCurrScore = 0;
        let dealID = ["#0", "#1", "#5", "#6"];
        $("#newGame").on("click", (e) => {
            // after deal enable stick and twist buttons
            $("#stick").prop("disabled", false);
            $("#twist").prop("disabled", false);
            e.preventDefault();
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
                compCards.push(deck[0]);
                console.log(compCards);
                imgArray.splice(0, 1);
                deck.splice(0, 1);
                compCurrScore = this.score(compCards, counter1, compScoreArray, compScore, "dealer");
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
        });
    }
    static dealCards(deck, imgArray, counter, cards, boxes){
        cards.push(deck[0]);
        $(boxes[counter-1]).html(imgArray[0]);
        imgArray.splice(0, 1);
        deck.splice(0, 1);
    }
    static playerTurn(deck, imgArray, counter, myScore, scoreArray, myCards){
        // let scoreArray = [];
        // the remaining 3 card holders left for player
        $("#twist").on("click", () => {
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
            console.log("player score: " + myCurrScore);
        });
    }
    static dealerLogic(playerScore, compCurrScore, compCards){
        if(compCards[0].split('')[0] == "A" && compCards[1].split('')[0] == "6"){
            console.log("dealer sticks on soft 17");
        }
        if(compCurrScore > 21){
            $("#newGame").prop("disabled", true);
           // this.calcWinnings();
            console.log("DEALER BUST!!!");
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
        // use recursion once score calculated i.e. < 17 || myScore -> twist
        // let scoreArray = [];
        $("#stick").on("click", () => {
            $("#1").html(dealerDealtCards[0]);
            counter++;
            playerScore = playerScoreArray.reduce((a,b) => a + b, 0);
            computerScoreDeal = compScoreArray.reduce((a,b) => a + b, 0);
            console.log("comp cards: ");
            console.log(compCards);
            if(compCards[0].split('')[0] == "A" && compCards[1].split('')[0] == "6"){
                this.dealerLogic(playerScore, computerScore, compCards);
                return;
            }
            $("#stick").prop("disabled", true); 
            $("#twist").prop("disabled", true); 
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
    static reset(){
        $("#reset").click(() => {
            $("#newGame").prop("disabled", false);
            for(let j=0; j<10; j++){
                let img = new Image();
                img.src = `../../card_images/blank.jpg`;
                $(`#${j}`).html(img);
            }
            // myScoreArray = 0;
            // compScoreArray = 0;
            // myCards = 0; 
            // compCards = 0;
            // myScore = 0;
            // compScore = 0;
            // counter = 0;
            // computerScore = 0;
            // playerScore = 0;
            // imgArray = 0;
            this.play();
           // }
        })
    }
    static calcWinnings(betAmount, bankAmount){
        bankAmount += betAmount * betAmount;
        console.log(bankAmount);
        //return parseFloat($('#quantity').val(bankAmount));
    }

    static calcLoss(betAmount, bankAmount){
        bankAmount -= betAmount;
        console.log(bankAmount);
        return bankAmount;
        //return parseFloat($('#quantity').val(bankAmount));
    }
    static calcDraw(betAmount, bankAmount){
        betAmount = betAmount;
        console.log(betAmount);
        //return $('#quantity').val(betAmount).toFixed(2);
    }
    static setBetAmount(betAmount){
        console.log(betAmount);
        //$("#quantity").html(betAmount);
        return betAmount;
    }
    static getBankAmount(){
        return parseFloat($('#bank').val());
    }
    static play(){
        // x-ScoreArrays' are for holding numbers of the scores
        // x-Cards' are for storing the actual cards i.e. 'Ah, 9s, ...'
        // x-Score's are the the sums of arrays score()
        let betAmount = this.setBetAmount();
        let bankAmount = this.getBankAmount();
        let imgArray = [];
        let deck = this.generateDeck();
        this.shuffle(deck);
        imgArray = this.createImagesArray(deck);
        let dealerDealtCards = [];
        let myScoreArray = [];
        let compScoreArray = [];
        let myCards = [];
        let compCards = [];
        let myScore = 0;
        let compScore = 0;
        let counter = 0;
        this.deal(deck, imgArray, myScoreArray, compScoreArray, myScore, compScore, myCards, compCards, dealerDealtCards);
        this.playerTurn(deck, imgArray, counter, myScore, myScoreArray, myCards);
        this.dealerTurn(deck, imgArray, counter, compScore, compScoreArray, compCards, myScoreArray, dealerDealtCards);
        this.reset();
    }
}
module.exports = Game;