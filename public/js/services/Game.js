// ***** MAXIMUM 5 cards        ***** //
// ***** ACES HIGH              ***** //
// ***** 3 DECKS OF CARDS       ***** //
// ***** NO SPLITS              ***** //
// ***** DEALER TWISTS FOR < 17 ***** //

import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);

class Game{
    static generateDeck(){
        const hearts = ["Ah", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "Jh", "Qh", "Kh"];
        const diamonds = ["Ad", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "10d", "Jd", "Qd", "Kd"];
        const clubs = ["Ac", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "10c", "Jc", "Qc", "Kc"];
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
    static shuffle(deck){
        let m = deck.length;
        let currentElement; 
        let index;
        // do randomization process 5 times to shuffle thoroughly
        for(let j=0; j<5; j++){
            // While there remain elements to shuffle…
            while(m>0){
                // Pick random element in the lim [0, m-1]
                index = Math.floor(Math.random() * m--);
                // swap the end element with a random element in array
                currentElement = deck[m];
                deck[m] = deck[index];
                deck[index] = currentElement;
            }
        }
        return deck;
    }
    static deal(deck, imgArray, myScoreArray, compScoreArray, myScore, compScore, myCards, compCards){
        // the 4 card holder id's for cards to be dealt to start
        let counter1 = 0;
        let counter2 = 0;
        let dealID = ["#0", "#1", "#5", "#6"];
        $("#newGame").on("click", (e) => {
            $("#stick").prop("disabled", false);
            $("#twist").prop("disabled", false);
            console.log("dealt");
            e.preventDefault();
            for(let j=0; j<2; j++){
                counter1++;
                $(dealID[j]).html(imgArray[0]);
                compCards.push(deck[0]);
                imgArray.splice(0, 1);
                deck.splice(0, 1);
                var compCurrScore = this.score(compCards, counter1, compScoreArray, compScore, "dealer");
            }
            for(let j=0; j<2; j++){
                counter2++;
                $(dealID[j+2]).html(imgArray[0]);
                myCards.push(deck[0]);
                imgArray.splice(0, 1);
                deck.splice(0, 1);
                var myCurrScore = this.score(myCards, counter2, myScoreArray, myScore, "player");
            }
            console.log("dealt computer hand " + compCurrScore);
            console.log("dealt player hand " + myCurrScore);
            if(myCurrScore == 21){
                console.log("21 test");
                $("#twist").on("click", () => {
                    $("#twist").prop("disabled", true);
                });
            }
            if(myCurrScore < 30){
                myCurrScore = 11;
                console.log(myCurrScore);
            }
            if(compCurrScore == 21){
                $("#stick").on("click", () => {
                    $("#stick").prop("disabled", true);
                });
            }
        });
    } 
    static playerTurn(deck, imgArray, counter, myScore, scoreArray, myCards){
        // let scoreArray = [];
        // the remaining 3 card holders left for player
        $("#twist").on("click", () => {
            counter++;
            myCards.push(deck[0]);
            let playerBoxes = ["#7", "#8", "#9"];
            $(playerBoxes[counter-1]).html(imgArray[0]);
            imgArray.splice(0, 1);
            deck.splice(0, 1);
            console.log("player current score " + myCurrScore);
            if(myCurrScore == 22){
                console.log("BUST!!");
                scoreArray.push(11); 
            }else if(myCurrScore == 21){
                console.log("BLACKJACK!!");
            }else if(counter-1 < 3){
                var myCurrScore = this.score(myCards , counter+2, scoreArray, myScore, "player");
            }else{
                console.log("wtf");
            }
        });
    }
    static dealerLogic(playerScore, compCurrScore){
        if(compCurrScore > 21){
            console.log("BUST!!!");
        }
        else if(compCurrScore < playerScore){
            console.log("less than player score");
            $("#stick").trigger("click");
        }else if(compCurrScore < 17){
            console.log("less than 17");
            $("#stick").trigger("click");
        }else if(compCurrScore === playerScore){
            console.log("DRAW!!");
        }else if(compCurrScore > playerScore){
            console.log("COMP WINS!!");
        }else{
            console.log("wtf");
        }
    }
    static dealerTurn(deck, imgArray, counter, compScore, scoreArray, compCards, playerScoreArray){ 
        // use recursion once score calculated i.e. < 17 || myScore -> twist
        // let scoreArray = [];
        $("#stick").on("click", () => {
            $("#twist").prop("disabled", true);
            counter++;
            compCards.push(deck[0]);
            let dealerBoxes = ["#2", "#3", "#4"];
            $(dealerBoxes[counter-1]).html(imgArray[0]);
            imgArray.splice(0, 1);
            deck.splice(0, 1);
            if(counter-1 < 3){
                var compCurrScore = this.score(compCards, counter+2, scoreArray, compScore, "dealer");
            }
            let playerScore = playerScoreArray.reduce((a,b) => a + b, 0);
            console.log("player score: " + playerScore);
            console.log("computer score " + compCurrScore);
            this.dealerLogic(playerScore, compCurrScore)
        });
    }
    static score(cards, counter, scoreArray, score, player){
        console.log("Cards");
        console.log(cards);
        let arr = cards[counter-1].toString().split('');
        console.log(arr);
        if(arr.length === 3){
            score+=10;
            scoreArray.push(score);
        }else if(arr[0] === "A"){
            score+=11;
            scoreArray.push(score);
        }
        else if(arr[0] === "K" || arr[0] === "Q" || arr[0] === "J"){
            score+=10;
            scoreArray.push(score);
        }
        else{
            score+= parseInt(arr[0]);
            scoreArray.push(score);
        }
        let sum = scoreArray.reduce((a, b) => a + b, 0);
        return sum;
    }
    // static reset(deck, myScoreArray, compScoreArray, myCards, compCards, myScore, compScore, counter, imgArray, computerScore, playerScore){
    //     $("#reset").click(() => {
    //         $("#stick").removeClass("stick");
    //         $("#twist").removeClass("stick");
    //         console.log("reset clicked");
    //         // for(let j=0; j<10; j++){
    //         //     let img = new Image();
    //         //     img.src = `../card_images/blank.jpg`;
    //         //     $(`#${j}`).html(img);
    //             // myScoreArray = [];
    //             // compScoreArray = [];
    //             // myCards = [];
    //             // compCards = [];
    //             // myScore = 0;
    //             // compScore = 0;
    //             // counter = 0;
    //             // computerScore = 0;
    //             // playerScore = 0;
    //             // let imgArray = this.createImagesArray(deck);
    //             this.play();
    //        // }
    //     })
    // }
    static play(deck){
        // x-ScoreArrays' are for holding numbers of the scores
        // x-Cards' are for storing the actual cards i.e. 'Ah, 9s, ...'
        // x-Score's are the the sums of arrays score()
        this.shuffle(deck);
        let myScoreArray = [];
        let compScoreArray = [];
        let myCards = [];
        let compCards = [];
        let myScore = 0;
        let compScore = 0;
        let counter = 0;
        let imgArray = this.createImagesArray(deck);
        this.deal(deck, imgArray, myScoreArray, compScoreArray, myScore, compScore, myCards, compCards);
        this.playerTurn(deck, imgArray, counter, myScore, myScoreArray, myCards);
        this.dealerTurn(deck, imgArray, counter, compScore, compScoreArray, compCards, myScoreArray);
     //   this.reset(deck, myScoreArray, compScoreArray, myCards, compCards, myScore, compScore, counter, imgArray, computerScore, playerScore);
    }
}
module.exports = Game;