<template>
    <main-layout>
        <!--start of the game board-->


        <img src="img/gameBoard.png" alt="some text">
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
                    <button type="input" id="stick" class="stick" disabled>STICK</button>
                    <button type="input" id="twist" disabled>TWIST</button>
                    <button type="input" id="newGame" class="newGame">NEW GAME</button>
                </div>
                <div id="game">
                    <div id="betAmount"></div>
                    <div id="totalAmount"></div>
                    <div id="dealer"></div>

                    <div id="bet">
                        <!--<button id="reset">Reset</button>-->
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
                <div id="scoreboard">
                    <div id="myscore">me: 1</div>
                    <div id="compscore">dealer: 2</div>
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
    const Game = require("../services/Game");
    let deck = Game.generateDeck();
    export default {
        components: {
            MainLayout
        },
        mounted: function () {
            //all the jquery
            Game.play(deck);
        }
    }
</script>