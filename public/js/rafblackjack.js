let hearts = ["Ah", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "Jh", "Qh", "Kh"];
let diamonds = ["Ad", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "10d", "Jd", "Qd", "Kd"];
let spades = ["As",  "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s", "Js", "Qs", "Ks"];
let clubs = ["Ac", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "10c", "Jc", "Qc", "Kc"];
let imgArray = [];
let deck = $.merge($.merge(hearts, diamonds), $.merge(spades, clubs));
let createImagesArray = () => {
    for(let j=0; j<53; j++){
        img = new Image();
        img.src = "../images/" + j;
    } 
}
// this produces 3 decks

// remember to take mod 52 as the img array only goes to 52
let finalDeck = deck.concat(deck).concat(deck);

let deal = () => {
    // random number [0, 155]
    let rand = Math.floor(Math.random() * 156)
}
$(() => {
    console.log(finalDeck);
})