<template>
    <main-layout>
        <!--start of the game board-->


        <img id="gameBoard" src="img/gameBoard.png" alt="Game Board">
        <div class="container" id="title">
            <div class="overide chipsStack">
                <div v-on:click="selectBet(5)" id="redChip" class="fish red">
                    <div class="value">5p</div>
                </div>
            </div>
            <div class="overide chipsStack">
                <div v-on:click="selectBet(10)" id="orangeChip" class="fish orange">
                    <div class="value">10p</div>
                </div>
            </div>
            <div class="overide chipsStack">
                <div v-on:click="selectBet(20)" id="greenChip" class="fish green">
                    <div class="value">20p</div>                
                </div>
            </div>
            <div class="overide chipsStack">
                <div v-on:click="selectBet(50)" id="greenChip" class="fish blue">
                    <div class="value">50p</div>                
                </div>
            </div>
            <div class="overide chipsStack">
                <div v-on:click="selectBet(100)" id="blackChip" class="fish black">
                    <div class="value">£1</div>  
                </div>
            </div>
            <div class="overide chipsStack">
                <div id="resetChip" class="fish gray">
                    <div>Reset</div>
                </div>
            </div>

            <div class="row" id="computer">   
                <div class="box" id="0">0</div>
                <div class="box" id="1">1</div>
                <div class="box" id="2">2</div>
                <div class="box" id="3">3</div>
                <div class="box" id="4">4</div>
            </div>
            <!--<div class="row">
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
            </div>
            <div class="container bettingBoard">
                    <div class="row">
                        <div class="col s12">
                            <form id='myform' method='POST' action='#'>
                                <div>
                                    <label for="bank">Your Amount</label>
                                    <input class='qty' id="bank" type='text' name='bank' />
                                </div>
                                <div>
                                    <label for="quantity">Bet Amount</label>
                                    <input class='qty' id="quantity" type='text' name='quantity' />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s4">
                            <div id="resetChip" class="fish gray">
                                <div>Reset</div>
                            </div>
                        </div>
                        <div class="col s4">
                            <div v-on:click="selectBet(5)" id="redChip" class="fish red">
                                <div class="value">5p</div>
                            </div>
                        </div> 
                        <div class="col s4">
                            <div v-on:click="selectBet(10)" id="orangeChip" class="fish orange">
                                <div class="value">10p</div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s4">
                                <div v-on:click="selectBet(20)" id="greenChip" class="fish green">
                                    <div class="value">20p</div>
                                </div>
                        </div>
                        <div class="col s4">
                            <div v-on:click="selectBet(50)" id="blueChip" class="fish blue">
                                <div class="value">50p</div>
                            </div>
                        </div>
                        <div class="col s4">
                            <div v-on:click="selectBet(100)" id="blackChip" class="fish black">
                                <div>£1</div>  
                            </div>
                        </div>                           
                    </div>
                    <div class="row">
                        <div class="col s12 chipStackBoard">
                            <div class="col s12 chipStack">
                            </div>
                        </div> 
                    </div>
                    <div class="row">
                        <div class="col s12">
                            
                        </div>
                    </div>
                </div>
                <div id="bettingButtons">
                    <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                        <i class="material-icons right"></i>                        
                    </button>
                    <button class="btn waves-effect waves-light" id="continue" title="Continue the game with original bet">Continue (1x)</button>                
                    <button class="btn waves-effect waves-light" id="double" title="Continue the game, but double the bet">Double (2x)</button>
                    <button class="btn waves-effect waves-light" id="quit" title="Quit the game!">Quit Game</button>
                </div>

                <div id="scoreboard">
                    <div id="myscore">me: 1</div>
                    <div id="compscore">dealer: 2</div>
                </div>
            </div>-->
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
        },
        methods: {
            selectBet: function (val){              
                Game.setBetAmount(val);
                // Game.calcDraw();
            }
        }
    }
</script>