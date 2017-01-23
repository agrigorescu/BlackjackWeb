<template>
    <main-layout>
        <!--start of the game board-->

        <img id="gameBoard" src="img/gameBoard.png" alt="Game Board">
        <div class="container" id="title">
            <div class="chipsStack overide">
                <div id="redChip" class="fish red">
                    <div class="value">5p</div>
                </div>
            </div>
            <div class="chipsStack">
                <div id="orangeChip" class="fish orange">
                    <div class="value">10p</div>
                </div>
            </div>
            <div class="chipsStack">
                <div id="greenChip" class="fish green">
                    <div class="value">20p</div>                
                </div>
            </div>
            <div class="chipsStack">
                <div id="blueChip" class="fish blue">
                    <div class="value">50p</div>                
                </div>
            </div>
            <div class="chipsStack">
                <div id="blackChip" class="fish black">
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
                <h5 style="padding:30px">Bank :  £ <span id="bank"></span></h5>
                <button v-on:click="getBalance()">Withdraw Funds</button>
                <button v-on:click="addFunds()">Add Funds</button>
            </div>
        </div>
<!--end of the game board-->

    </main-layout>
</template>
<script>
    let idCookie;
    let bank =0;
    let newBank = bank;
    let balance = [];
    let newFunds = [];
    import MainLayout from '../layouts/Main.vue'
    const api = require("../services/api");
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
                bank = $("#bank").html();
                console.log("balance: " + bank);
                $("#bank").html("");
                api.callApi({ method: 'POST', path: 'https://blackjackapi00.herokuapp.com/refund', params: { id: idCookie, amount: bank } })
                .then(result => {
                    console.log("data sent");
                })
                .catch(err => {
                    console.log("error");
                });
            },  
            printBalance: function(){
                console.log("balance: " + balance);
            }
        },
        beforeMount: function() {
            idCookie = this.$cookie.get('blackjackIdCookie');
            api.callApi({ method: 'GET', path: `https://blackjackapi00.herokuapp.com/account/${idCookie}` })
                .then(result => {
                    console.log("data received");
                    console.log("result is ");
                    console.log(result);
                    let account = result.body.success;
                    //displaying the information from the db
                    bank = account.balance;
                    console.log("balance: " + bank);
                    $("#bank").html(bank);
                })
                .catch(err => {
                    console.log("error");
                });
        }
    }
</script>