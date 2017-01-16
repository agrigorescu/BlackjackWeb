const hearts = ["Ah", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "Jh", "Qh", "Kh"];
const diamonds = ["Ad", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "10d", "Jd", "Qd", "Kd"];
const spades = ["As",  "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s", "Js", "Qs", "Ks"];
const clubs = ["Ac", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "10c", "Jc", "Qc", "Kc"];
const subDeck = $.merge($.merge(hearts, diamonds), $.merge(spades, clubs));
const deck = subDeck.concat(subDeck).concat(subDeck);
let createImagesArray = () => {
    let imgArray = [];
    for(let j=0; j<156; j++){
        img = new Image();
        img.src = `../card_images/${deck[j%52]}.png`;
        imgArray.push(img);
        console.log(img.src);
    }
    return imgArray;
}

let shuffle = (deck) => {
    let m = deck.length;
    let currentElement; 
    let index;
    // While there remain elements to shuffle…
    while(m){
        // Pick random element in the lim [0, m-1]
        index = Math.floor(Math.random() * m--);
        // let current element be last element
        currentElement = deck[m];
        // now swap this last element with a random element
        deck[m] = deck[index];
        deck[index] = currentElement;
    }
    console.log(deck);
    return deck;
}
// this produces 3 decks
let finalDeck = deck.concat(deck).concat(deck);

let deal = () => {
    let imgArray = createImagesArray();
    let dealID = ["#0", "#1", "#5", "#6"];
    for(let j=0; j<4; j++){
        let id = dealID[j];
        // random num between [0, 155] - 3 decks - take %52 because image arry is [0, 52]
        let rand = Math.floor(Math.random() * 156);
        $(id).html(imgArray[j]);
    }    
}
$(() => {
    shuffle(deck);
    deal();
})