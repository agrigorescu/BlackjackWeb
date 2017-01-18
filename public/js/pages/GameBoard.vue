<template>
    <main-layout>
        <!--start of the game board-->
        <div class="row container" id="title">
            <h1>Game Board</h1>
            <div id="gameBoard">
                <div id="computer">
                    <p>computer / dealer</p>
                    <div class="box" id="0">0</div>
                    <div class="box" id="1">1</div>
                    <div class="box" id="2">2</div>
                    <div class="box" id="3">3</div>
                    <div class="box" id="4">4</div>
                </div>
                <div id="player">
                    <p>player / user</p>
                    <div class="box" id="5">5</div>
                    <div class="box" id="6">6</div>
                    <div class="box" id="7">7</div>
                    <div class="box" id="8">8</div>
                    <div class="box" id="9">9</div>
                </div>


                <div id="gamebuttons">
                    <button type="input" id="hit">HIT</button>
                    <button type="input" id="stick">STICK</button>
                    <button type="input" id="newGame">NEW GAME</button>
                </div>


                <div id="game">
                    <div id="betAmount"></div>
                    <div id="totalAmount"></div>
                    <div id="dealer"></div>

                    <div id="bet">
                        <button id="reset">Reset</button>
                        <div class="fish red">
                            <button type="button">5p</button>
                        </div>

                        <div class="fish orange">
                            <button type="button">10p</button>
                        </div>

                        <div class="fish green">
                            <button type="button">20p</button>
                        </div>

                        <div class="fish blue">
                            <button type="button">50p</button>
                        </div>

                        <div class="fish black">
                            <button type="">£1</button>
                        </div>
                    </div>
                </div>

                <div id="blackJackButtons">
                    <button data-id="quit" title="Quit the game!">Quit Game</button>
                    <button data-id="continue" title="Continue the game with original bet">Continue (1x)</button>
                    <button data-id="double" title="Continue the game, but double the bet">Double (2x)</button>
                </div>
            </div>
        </div>
        <!--end of the game board-->
    </main-layout>
</template>

<script>
    import MainLayout from '../layouts/Main.vue'

    const api = require("../services/api");
    export default {
        components: {
            MainLayout
        },
        data: function () {
            return {
                userName: '',
                fullName: '',
                email: '',
                password: '',
                birthDate: '',
                formSubmitted: false
            }
        },
        beforeMount: function () {
            console.log('Mounting');
            // ***** MAXIMUM 5 cards        ***** //
            // ***** ACES HIGH              ***** //
            // ***** 3 DECKS OF CARDS       ***** //
            // ***** NO SPLITS              ***** //
            // ***** DEALER TWISTS FOR < 17 ***** //
            const hearts = ["Ah", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "Jh", "Qh", "Kh"];
            const diamonds = ["Ad", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "10d", "Jd", "Qd", "Kd"];
            const spades = ["As", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s", "Js", "Qs", "Ks"];
            const clubs = ["Ac", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "10c", "Jc", "Qc", "Kc"];
            const oneDeck = $.merge($.merge(hearts, diamonds), $.merge(spades, clubs));
            const deck = oneDeck
            let int = 0;
            let createImagesArray = () => {
                let imgArray = [];
                for (let j = 0; j < 52; j++) {
                    img = new Image();
                    // map deck onto image array
                    img.src = `../card_images/${deck[j % 52]}.png`;
                    imgArray.push(img);
                }
                return imgArray;
            }
            let shuffle = (deck) => {
                let m = deck.length;
                let currentElement;
                let index;
                // do randomization process 5 times to shuffle thoroughly
                for (let j = 0; j < 5; j++) {
                    // While there remain elements to shuffle…
                    while (m > 0) {
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
            let deal = (deck, imgArray, myScoreArray, compScoreArray, myScore, compScore, myCards, compCards) => {
                // the 4 card holder id's for cards to be dealt to start
                let counter1 = 0;
                let counter2 = 0;
                let dealID = ["#0", "#1", "#5", "#6"];
                $("#newGame").click((e) => {
                    e.preventDefault();
                    for (let j = 0; j < 2; j++) {
                        counter1++;
                        $(dealID[j]).html(imgArray[0]);
                        compCards.push(deck[0]);
                        imgArray.splice(0, 1);
                        deck.splice(0, 1);
                        var compCurrScore = score(compCards, counter1, compScoreArray, compScore, "dealer");
                    }
                    for (let j = 0; j < 2; j++) {
                        counter2++;
                        $(dealID[j + 2]).html(imgArray[0]);
                        myCards.push(deck[0]);
                        imgArray.splice(0, 1);
                        deck.splice(0, 1);
                        var myCurrScore = score(myCards, counter2, myScoreArray, myScore, "player");
                    }
                    console.log("deal comp hand " + compCurrScore);
                    console.log("deal player hand " + myCurrScore);
                    return compCurrScore;
                })
            }
            let playerTurn = (imgArray, counter, myScore, scoreArray, myCards) => {
                // let scoreArray = [];
                // the remaining 3 card holders left for player
                $("#hit").click((e) => {
                    e.preventDefault();
                    counter++;
                    myCards.push(deck[0]);
                    let playerBoxes = ["#7", "#8", "#9"];
                    $(playerBoxes[counter - 1]).html(imgArray[0]);
                    imgArray.splice(0, 1);
                    deck.splice(0, 1);
                    if (counter - 1 < 3) {
                        var myCurrScore = score(myCards, counter + 2, scoreArray, myScore, "player");
                    }
                    console.log(" player current score " + myCurrScore);
                    if (myCurrScore > 21) {
                        console.log("BUST!!");
                        return;
                    }
                    return myCurrScore;
                });
            }
            let score = (cards, counter, scoreArray, score, player) => {
                console.log(cards);
                let arr = cards[counter - 1].toString().split('');
                console.log(arr);
                if (arr.length === 3) {
                    score += 10;
                    scoreArray.push(score);
                } else if (arr[0] === "A") {
                    score += 11;
                    scoreArray.push(score);
                }
                else if (arr[0] === "K" || arr[0] === "Q" || arr[0] === "J") {
                    score += 10;
                    scoreArray.push(score);
                }
                else {
                    score += parseInt(arr[0]);
                    scoreArray.push(score);
                }
                let sum = scoreArray.reduce((a, b) => a + b, 0);
                return sum;
            }
            let dealerTurn = (imgArray, counter, compScore, scoreArray, compCards, myCurrentScore, playerScore) => {
                // use recursion once score calculated i.e. < 17 || myScore -> twist
                // let scoreArray = [];
                $("#stick").click(() => {
                    counter++;
                    compCards.push(deck[0]);
                    let dealerBoxes = ["#2", "#3", "#4"];
                    $(dealerBoxes[counter - 1]).html(imgArray[0]);
                    imgArray.splice(0, 1);
                    deck.splice(0, 1);
                    if (counter - 1 < 3) {
                        var compCurrScore = score(compCards, counter + 2, scoreArray, compScore, "dealer");
                    }
                    // logic to determine the dealers actions
                    console.log(" computer score " + compCurrScore);
                    if (compCurrScore < playerScore) {
                        $("#stick").trigger("click");
                    }
                    if (compCurrScore < 17) {
                        $("#stick").trigger("click");
                    }
                    if (compCurrScore == playerScore) {
                        console.log("DRAW!!");
                    }
                    if (compCurrScore > playerScore) {
                        console.log("COMP WINS!!");
                    }
                    if (compCurrScore > 21) {
                        console.log("BUST!!!");
                    }
                });
            }
            let reset = () => {
                $("#reset").click(() => {
                    console.log("reset clicked");
                    for (let j = 0; j < 10; j++) {
                        img = new Image();
                        img.src = `../card_images/blank.jpg`;
                        $(`#${j}`).html(img);
                        myScoreArray = [];
                        compScoreArray = [];
                        myCards = [];
                        compCards = [];
                        myScore = 0;
                        compScore = 0;
                        counter = 0;
                        computerScore = 0;
                        playerScore = 0;
                        let imgArray = createImagesArray();
                        location.reload();
                    }
                })
            }

        },
        mounted: function () {
            //all the jquery
            shuffle(deck);
            // these variables are for the purpose of dynamically storing cards
            // scoreArray and Cards arrays 
            let myScoreArray = [];
            let compScoreArray = [];
            let myCards = [];
            let compCards = [];
            let myScore = 0;
            let compScore = 0;
            let counter = 0;
            let imgArray = createImagesArray();
            let computerScore = deal(deck, imgArray, myScoreArray, compScoreArray, myScore, compScore, myCards, compCards);
            let playerScore = playerTurn(imgArray, counter, myScore, myScoreArray, myCards);
            dealerTurn(imgArray, counter, compScore, compScoreArray, compCards, playerScore);
            reset();
        }
    }
</script>