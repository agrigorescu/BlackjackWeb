// ***** MAXIMUM 5 cards        ***** //
// ***** ACES HIGH              ***** //
// ***** 3 DECKS OF CARDS       ***** //
// ***** NO SPLITS              ***** //
// ***** DEALER TWISTS FOR < 17 ***** //
const hearts = ["Ah", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "Jh", "Qh", "Kh"];
const diamonds = ["Ad", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "10d", "Jd", "Qd", "Kd"];
const spades = ["As",  "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s", "Js", "Qs", "Ks"];
const clubs = ["Ac", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "10c", "Jc", "Qc", "Kc"];
const oneDeck = $.merge($.merge(hearts, diamonds), $.merge(spades, clubs));
const deck = oneDeck.concat(oneDeck).concat(oneDeck);
let createImagesArray = () => {
    let imgArray = [];
    for(let j=0; j<156; j++){
        img = new Image();
        // map deck onto image array
        img.src = `../card_images/${deck[j%52]}.png`;
        imgArray.push(img);
    }
    return imgArray;
}
let shuffle = (deck) => {
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
let deal = (deck, imgArray) => {
    // the 4 card holder id's for cards to be dealt to start
    let dealID = ["#0", "#1", "#5", "#6"];
    for(let j=0; j<4; j++){
        $(dealID[j]).html(imgArray[j]);
    }
    imgArray.splice(0, 4);
    deck.splice(0, 4);
    console.log(deck);
}
let playTurn = (imgArray, counter) => {
    // the remaining 3 card holders left for player
    let boxesLeft = ["#7", "#8", "#9"];
    $(boxesLeft[counter-1]).html(imgArray[0]);
    imgArray.splice(0, 1);
    deck.splice(0, 1);
    console.log(deck);
}
$(() => {
    let counter = 0;
    shuffle(deck);
    console.log(deck);
    let imgArray = createImagesArray();
    $("#newGame").click(() => {
        deal(deck, imgArray);
    })
    $("#hit").click(() => {
        counter++;
        playTurn(imgArray, counter);
    })
})