<template>
    <main-layout>
        <!--start of the game board-->
        <img id="gameBoard" src="img/gameBoard.png" alt="Game Board">
        <div class="container" id="title">
            <div class="chipsStack">
                <div v-on:click="selectBet(5)" id="redChip" class="fish red">
                    <div class="value">5p</div>
                </div>
            </div>
            <div class="chipsStack">
                <div v-on:click="selectBet(10)" id="orangeChip" class="fish orange">
                    <div class="value">10p</div>
                </div>
            </div>
            <div class="chipsStack">
                <div v-on:click="selectBet(20)" id="greenChip" class="fish green">
                    <div class="value">20p</div>                
                </div>
            </div>
            <div class="chipsStack">
                <div v-on:click="selectBet(50)" id="blueChip" class="fish blue">
                    <div class="value">50p</div>                
                </div>
            </div>
            <div class="chipsStack">
                <div v-on:click="selectBet(100)" id="blackChip" class="fish black">
                    <div class="value">£1</div>  
                </div>
            </div>
            <div class="chipsStack">
                <div id="resetChip" class="fish gray">
                    <div>Reset</div>
                </div>
            </div>
            <div class="container">
                <div class="computer">   
                    <div class="box" id="card0">0</div>
                    <div class="box" id="card1">1</div>
                    <div class="box" id="card2">2</div>
                    <div class="box" id="card3">3</div>
                    <div class="box" id="card4">4</div>
                </div>
                <div class="player">
                    <div class="box" id="card5">5</div>
                    <div class="box" id="card6">6</div>
                    <div class="box" id="card7">7</div>
                    <div class="box" id="card8">8</div>
                    <div class="box" id="card9">9</div>
                </div>
            </div>
            <div class="row" id="gameButtons">
                <button type="input" id="stick" disabled>STICK</button>
                <button type="input" id="twist" disabled>TWIST</button>
                <button type="input" id="newGame" disabled>DEAL</button>
                <button type="input" id="reset" disabled>RESET CARDS</button><br><br>
                <button type="input" id="five">5p</button>
                <button type="input" id="ten">10p</button>
                <button type="input" id="twenty">20p</button>
                <button type="input" id="fifty">50p</button>
                <button type="input" id="hundred">£1</button>
                <h5 style="padding:5px">Bet Value :  £ <span id="betVal"></span></h5>
                <button type="input" id="submitBet" disabled>Submit Bet</button>
                <h5 style="padding:30px">Bank :  £ <span id="bank">20</span></h5>
                <button v-on:click="getBalance()">Withdraw Funds</button>
                <button v-on:click="addFunds()">Add Funds</button>
            </div>
        </div>
<!--end of the game board-->
                <button type="input" id="newGame" class="newGame">DEAL</button>
                <button type="input" id="reset">RESET</button>
            </div>
            <!--<div class="container bettingBoard">
                    <div class="row">
                        <div class="col s12">
                            <form id='myform'>
                                <div>
                                    <label for="bank">Your Amount</label>
                                    <input class='qty' id="bank" type='text' name='bank' />
                                </div>
                                <div>
                                    <label for="quantity">Bet Amount</label>
                                    <input class='qty' id="quantity" type='text' name='quantity' />
                                </div>
                                <input type="submit" value="Submit">    
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
>>>>>>> game-board-design

    </main-layout>
</template>
<script>
    let bank = 20;
    let newBank = 20;
    let balance = [];
    let newFunds = [];
    import MainLayout from '../layouts/Main.vue'
    const Game = require("../services/Game");
    export default {
        components: {
            MainLayout
        },
        mounted: function (){
            // the game can only be initiated inside submitBet when bet is placed
            Game.submitBet(bank, newBank);
            Game.chipControl(0);
        },
        methods: {
            getBalance: function(){
                // balance = $("#bank").html();
                balance.push($("#bank").html());
                console.log("balance: " + $("#bank").html());
                $("#bank").html("");
            },
            printBalance: function(){
                console.log("balance: " + balance);
            },
            addFunds: function(){
            
            }
        }
    }
</script>