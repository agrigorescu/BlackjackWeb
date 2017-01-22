<template>
    <main-layout>
        <!--start of the game board-->

        <img id="gameBoard" src="img/gameBoard.png" alt="Game Board">
        <div class="container" id="title">
            <div class="overide chipsStack">
                <div id="redChip" class="fish red">
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
            <div class="row" id="player">
                <div class="box" id="5">5</div>
                <div class="box" id="6">6</div>
                <div class="box" id="7">7</div>
                <div class="box" id="8">8</div>
                <div class="box" id="9">9</div>
            </div>
            <div class="row" id="gameButtons">
                <button type="input" id="stick" disabled>STICK</button>
                <button type="input" id="twist" disabled>TWIST</button>
                <button type="input" id="newGame" class="newGame" disabled>DEAL</button>
                <button type="input" id="reset" disabled>RESET</button><br><br>
                <button type="input" id="five">5p</button>
                <button type="input" id="ten">10p</button>
                <button type="input" id="twenty">20p</button>
                <button type="input" id="fifty">50p</button>
                <button type="input" id="hundred">£1</button>
                <button type="input" id="cancel">Cancel Bet</button>
                <form id="submitBet">
                    <input id="betVal" type="text">
                    <input type="submit" value="Place Bet">
                </form>
                <h3>Bank :  £ <span id="bank">500</span></h3>
            </div>
        
            </div>
<!--end of the game board-->

    </main-layout>
</template>
<script>
    let bank = 500;
    let newBank = 500;
    import MainLayout from '../layouts/Main.vue'
    const Game = require("../services/Game");
    export default {
        components: {
            MainLayout
        },
        mounted: function () {
            //all the jquery
            Game.submitBet();
            Game.chipControl(0);
            Game.cancelBet(bank, newBank);
            
        },
        methods: {
            selectBet: function (val){              
                // Game.calcDraw();
                console.log(val);
            },
            printTest: function(){
                console.log("helo");
            }
        }
    }
</script>