const hearts = ["Ah", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "Jh", "Qh", "Kh"];
const diamonds = ["Ad", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "10d", "Jd", "Qd", "Kd"];
const spades = ["As",  "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s", "Js", "Qs", "Ks"];
const clubs = ["Ac", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "10c", "Jc", "Qc", "Kc"];
const subDeck = $.merge($.merge(hearts, diamonds), $.merge(spades, clubs));
const deck = subDeck.concat(subDeck).concat(subDeck);
let createImagesArray = () => {
    let imgArray = [];
    for(let j=0; j<52; j++){
        img = new Image();
        img.src = `../card_images/${deck[j]}.png`;
        imgArray.push(img);
    }
    console.log("image array : ");
    console.log(imgArray);
    return imgArray;
}

let shuffle = (deck) => {
    let m = deck.length;
    let currentElement; 
    let index;
    // While there remain elements to shuffle…
    while(m){
        // Pick a remaining element at the end of the array
        index = Math.floor(Math.random() * m--);
        // store the end-unshuffled element in currentElement
        currentElement = deck[m];
        // assign a random element (array[i]) in the current position
        // so shuffled item are at the end of the array
        deck[m] = deck[index];
        // assign the random position the original element
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
        let rand = Math.floor(Math.random() * 156)%52;
        $(id).html(imgArray[rand]);
    }    
}
$(() => {
    shuffle(deck);
    deal();
})