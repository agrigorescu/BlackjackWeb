<template>
    <main-layout>
        <!--start of the game board-->
        <img id="gameBoard" src="img/gameBoard.png" alt="Game Board">
        <div class="container" id="title">
            <div class="chipsStack">
                <div id="five" class="fish red">
                    <div class="value">5p</div>
                </div>
            </div>
            <div class="chipsStack">
                <div id="ten" class="fish orange">
                    <div class="value">10p</div>
                </div>
            </div>
            <div class="chipsStack">
                <div id="twenty" class="fish green">
                    <div class="value">20p</div>                
                </div>
            </div>
            <div class="chipsStack">
                <div id="fifty" class="fish blue">
                    <div class="value">50p</div>                
                </div>
            </div>
            <div class="chipsStack">
                <div id="hundred" class="fish black">
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
                    <div class="box" id="card0"></div>
                    <div class="box" id="card1"></div>
                    <div class="box" id="card2"></div>
                    <div class="box" id="card3"></div>
                    <div class="box" id="card4"></div>
                </div>
                <div class="player">
                    <div class="box" id="card5"></div>
                    <div class="box" id="card6"></div>
                    <div class="box" id="card7"></div>
                    <div class="box" id="card8"></div>
                    <div class="box" id="card9"></div>
                </div>
            </div>
            <div class="row" id="gameButtons">
                <button type="input" id="stick" disabled>STICK</button>
                <button type="input" id="twist" disabled>TWIST</button>
                <button type="input" id="newGame" disabled>DEAL</button>
                <button type="input" id="reset" disabled>RESET CARDS</button><br><br>
                <h5 style="padding:5px">Bet Value :  £ <span id="betVal"></span></h5>
                <button type="input" id="submitBet" disabled>Submit Bet</button>
                <h5 style="padding:30px">Bank :  £ <span id="bank">20</span></h5>
                <button v-on:click="getBalance()">Withdraw Funds</button>
                <button v-on:click="addFunds()">Add Funds</button>
            </div>
        </div>
<!--end of the game board-->

            <div class="row">
                <div class="chipStackBoard">
                    <div class="chipStack"></div>
                    </div> 
            </div>
        </div>
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