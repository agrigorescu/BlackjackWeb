//------------// RULES //------------ //
// ***** MAXIMUM 5 CARDS        ***** //
// ***** ACES HIGH              ***** //
// ***** 3 DECKS OF CARDS       ***** //
// ***** NO SPLITS              ***** //
// ***** DEALER TWISTS FOR < 17 ***** //
// ***** 2 ACES ON DEAL = 12    ***** //
//----------------------------------- //
// currently if player goes bust dealer wins automatically //
import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
const api = require("../services/api");
class Game{
     static withdraw(idCookie){
         $("#withdraw").on("click", () => {
            let bank = $("#bank").html();
            console.log("balance: " + bank);
            $("#bank").html("");
            api.callApi({ method: 'POST', path: 'https://blackjackapi00.herokuapp.com/refund', params: { id: idCookie, amount: bank } })
            .then(result => {
                console.log("data sent");
            })
            .catch(err => {
                console.log("error");
            });
         })
     }
     static deductAtLose(lostBet, idCookie){
         console.log("bet amount:  + " + lostBet + "idCookie: " + idCookie);
         // when we lose deduct value from bank in database 
         api.callApi({ method: 'POST', path: 'https://blackjackapi00.herokuapp.com/refund', params: { id: idCookie, amount: lostBet } })
            .then(result => {
                console.log("data sent");
            })
            .catch(err => {
                console.log("error");
            });
     }
     static addAtWin(betVal, idCookie, playerScore){
        console.log("bet amount:  + " + betVal + "idCookie: " + idCookie);
        // when we win, we only need to add the betVal itself or 1.5*betVal for a natural 
        // money has not been dynamically deducted from the database
        // the /charge path adds onto current amount
        let newBankNatural =  parseInt((betVal)*1.5); 
        let newBank =  parseInt((betVal));
        if(playerScore === 21){
            var winnings = newBankNatural;
        }else{
            var winnings = newBank;
        }
        api.callApi({ method: 'POST', path: 'https://blackjackapi00.herokuapp.com/charge', params: { id: idCookie, amount: winnings } })
        .then(result => {
            console.log("data sent");
        })
        .catch(err => {
            console.log("error");
        });
     }
     static pushAtDraw(betVal){ // only need to update bank value on page since no API call made on draw
         $("#bank").html(parseInt($("#bank").html + betVal));
     }
     static generateDeck(){
        const hearts = ["Ah", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "Jh", "Qh", "Kh"];
        const diamonds = ["Ad", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "10d", "Jd", "Qd", "Kd"];
        const clubs = ["Ac", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "10c", "Jc", "Qc", "Ks"];
        const spades = ["As", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s", "Js", "Qs", "Ks"];
        const oneDeck = $.merge($.merge(hearts, diamonds), $.merge(spades, clubs));
        const deck = oneDeck.concat(oneDeck).concat(oneDeck);
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
        let dealID = ["#card0", "#card1", "#card5", "#card6"];
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
    static playerTurn(deck, imgArray, counter, myScore, scoreArray, myCards, betVal, cookie){
        // let scoreArray = [];
        // the remaining 3 card holders left for player
        $("#twist").unbind().on("click", () => {
            counter++
            let playerBoxes = ["#card7", "#card8", "#card9"];
            this.dealCards(deck, imgArray, counter, myCards, playerBoxes);
            if(counter-1 < 3){
                var myCurrScore = this.score(myCards , counter+2, scoreArray, myScore, "player");
            }
            if(myCurrScore > 21){
                this.loseStateReset(betVal, cookie);
                console.log("YOUR BUST, COMPUTER WINS");
                return;
            }
        });
    }
    static loseStateReset(betVal, cookie){
        this.deductAtLose(betVal, cookie);
        this.chipControl(0);
        $("#five").prop("disabled", true);
        $("#ten").prop("disabled", true);
        $("#twenty").prop("disabled", true);
        $("#fifty").prop("disabled", true);
        $("#hundred").prop("disabled", true);
        $("#stick").prop("disabled", true);
        $("#twist").prop("disabled", true);
        $("#newGame").prop("disabled", true);
        $("#submitBet").prop("disabled", true);
        $("#withdraw").prop("disabled", false);
        $("#betVal").html("");        
    }
    static enableChips(){
        $("#five").prop("disabled", false);
        $("#ten").prop("disabled", false);
        $("#twenty").prop("disabled", false);
        $("#fifty").prop("disabled", false);
        $("#hundred").prop("disabled", false);
        $("#submitBet").prop("disabled", false);
    }
    static drawStateReset(betVal, bank, cookie){
        $("#five").prop("disabled", true);
        $("#ten").prop("disabled", true);
        $("#twenty").prop("disabled", true);
        $("#fifty").prop("disabled", true);
        $("#hundred").prop("disabled", true);
        $("#stick").prop("disabled", true);
        $("#twist").prop("disabled", true);
        $("#newGame").prop("disabled", true);
        $("#submitBet").prop("disabled", true);
        $("#withdraw").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#betVal").html("");
    }
    static winStateReset(betVal, bank, playerScore, cookie){
        this.addAtWin(betVal, cookie);
        $("#five").prop("disabled", true);
        $("#ten").prop("disabled", true);
        $("#twenty").prop("disabled", true);
        $("#fifty").prop("disabled", true);
        $("#hundred").prop("disabled", true);
        $("#stick").prop("disabled", true);
        $("#twist").prop("disabled", true);
        $("#newGame").prop("disabled", true);
        $("#submitBet").prop("disabled", true);
        $("#withdraw").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#betVal").html("");
        let newBankNatural = bank;
        let newBank = bank;
        newBankNatural +=  parseInt((betVal)*2.5);
        newBank +=  parseInt((betVal)*2);
        if(playerScore === 21){
            $("#bank").html(newBankNatural);
            this.submitBet(newBankNatural);
        }else{
            $("#bank").html(newBank);
            this.submitBet(newBank);
        }
    }
    static drawStateReset(betVal, bank){
        let newBank = bank + betVal;
        this.submitBet(newBank);
    }
    // at the point this function is called, player has already stuck - playerScore is fixed
    static dealerLogic(playerScore, compCurrScore, compCards, betVal, bank, cookie){
        if(compCards[0].split('')[0] == "A" && compCards[1].split('')[0] == "6"){
            if(compCurrScore < playerScore){
                console.log("dealer sticks on soft 17");
                console.log("player wins");
                this.winStateReset(betVal, bank, playerScore, cookie);
                $("#newGame").prop("disabled", true);
            }else if(compCurrScore > playerScore){
                this.loseStateReset(betVal, cookie);
                console.log("dealer sticks on soft 17");
                console.log("computer wins");
                $("#newGame").prop("disabled", true);
            }
        }else if(compCurrScore > 21){
            $("#newGame").prop("disabled", true);
            console.log("DEALER BUST, YOU WIN!!");
            this.winStateReset(betVal, bank, playerScore, cookie);
        }else if(compCurrScore < playerScore){
            console.log("less than player score hence twist");
            $("#stick").trigger("click");
        }else if(compCurrScore < 17){
            console.log("less than 17 hence twist");
            $("#stick").trigger("click");
        }else if(compCurrScore === playerScore){
            $("#newGame").prop("disabled", true);
            console.log("EQUAL SO DRAW!!");
            this.pushAtDraw(betVal);
        }else if(compCurrScore > playerScore){
            this.loseStateReset(betVal, cookie);
            $("#newGame").prop("disabled", true);
            console.log("COMP WINS!!");
        }else{
            console.log("wtf you doing?");
        }
    }
    static dealerTurn(deck, imgArray, counter, compScore, compScoreArray, compCards, playerScoreArray, dealerDealtCards, betVal, bank, cookie){ 
        let playerScore = 0;
        let computerScoreDeal = 0;
        $("#stick").unbind().on("click", () => {
            $("#card1").html(dealerDealtCards[0]);
            $("#stick").prop("disabled", true); 
            $("#twist").prop("disabled", true);
            counter++;
            playerScore = playerScoreArray.reduce((a,b) => a + b, 0);
            computerScoreDeal = compScoreArray.reduce((a,b) => a + b, 0);
            if(compCards[0].split('')[0] == "A" && compCards[1].split('')[0] == "6"){
                this.dealerLogic(playerScore, computerScore, compCards, betVal, bank, cookie);
                return;
            }
            if(computerScoreDeal > 17 && computerScoreDeal == playerScore){
                console.log("DRAW!!");
                this.pushAtDraw(betVal);
                $("#newGame").prop("disabled", true);
                return;
            } 
            if(computerScoreDeal > playerScore){
                console.log("computer wins at deal");
                this.loseStateReset(betVal, cookie);
                return;
            }
            let dealerBoxes = ["#card2", "#card3", "#card4"];
            this.dealCards(deck, imgArray, counter, compCards, dealerBoxes);
            if(counter-1 < 3){  // only deal 3 cards
                var compCurrScore = this.score(compCards, counter+2, compScoreArray, compScore, "dealer");
            }
            let computerScore = compScoreArray.reduce((a, b) => a + b, 0);
            console.log("computer score " + computerScore);
            this.dealerLogic(playerScore, computerScore, compCards, betVal, bank, cookie);
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
        $("#reset").on("click", () => { 
            for(let j=0; j<10; j++){
                let id = `#card${j}`;
                let img = new Image();
                img.src = `../../card_images/blank.jpg`;
                $(id).html(img);
            }
            this.enableChips();
        })
    }
    static init(betVal, bank, cookie){
        $("#newGame").unbind().on("click", () => {
            this.play(betVal, bank, cookie);
            $("#submitBet").prop("disabled", true);
            $("#reset").prop("disabled", true);
        });
    }
    static submitBet(cookie){
        $("#submitBet").unbind().on("click", (e) => {
            e.preventDefault();
            $("#withdraw").prop("disabled", true);
            let bank = parseInt($("#bank").html());
            let betVal = parseInt($("#betVal").html());
            console.log("betVal: " + betVal);
            console.log("bank:  " + bank);
            // pass the new bank value into init() which starts game process
            if(bank < betVal){
                setTimeout(() => { 
                    $("#submitBet").prop("disabled", true);
                    $("#message").show().html("Please add funds").delay(3000).fadeOut();
                    $("#betVal").html(""); 
                }, 100);
                console.log("You have no funds, please top up on the accounts page.");
            }else{
                $("#newGame").prop("disabled", false);
                this.disableChips();
                bank -= betVal;
                $("#bank").html(bank);
                this.init(betVal, bank, cookie);
            }
        })
    }
    static disableChips(){
        $("#five").prop("disabled", true);
        $("#ten").prop("disabled", true);
        $("#twenty").prop("disabled", true);
        $("#fifty").prop("disabled", true);
        $("#hundred").prop("disabled", true);
        // if bet cancelled previous bet needs to be destroyed
    }
    static withdrawFunds(){
        $("#withdraw").on("click", (e) => {
            e.preventDefault();
            this.disableChips();
            let amount = $("#bank").html();
            console.log("amount to sent to bank: " + amount);
            $("#bank").html(0);
            this.chipControl(0);
        })
    }
    static printWithdrawFunds(amount){
        return amount;
    }
    static setFunds(balance){
        $("#bank").html(balance);
    }
    static chipControl(value){
        let chipArray = ["#five", "#ten", "#twenty", "#fifty", "#hundred"];
        let chipScore = [5, 10, 20, 50, 100];
        for(let j=0; j<5; j++){
            $(chipArray[j]).unbind().on("click", () => {
                value +=  chipScore[j];  
                let x = value/100;     // do this because JS cant do maths
                let output = Math.round(x * 100) / 100 ;
                this.disableChips();
                $(chipArray[j]).prop("disabled", false);   // disable chips except one clicked
                $("#submitBet").prop("disabled", false);
                $("#betVal").html(output);
            })
        }
    }
    static play(betVal, bank, cookie){
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
        this.withdraw();
        this.deal(deck, imgArray, myScoreArray, compScoreArray, myScore, compScore, myCards, compCards, dealerDealtCards);
        this.playerTurn(deck, imgArray, counter, myScore, myScoreArray, myCards, betVal, cookie);
        this.dealerTurn(deck, imgArray, counter, compScore, compScoreArray, compCards, myScoreArray, dealerDealtCards, betVal, bank, cookie);
        this.resetBoard();  
    }
}
module.exports = Game;