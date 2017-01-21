<template>
    <main-layout>
        <!--start of the game board-->
        <div class="row container" id="title">
            <div id="row">
                <h2>{{fullName}}'s Account</h2>
                <div class="col s6">
                    <div id="accountInfo">
                        <div class="boxinfo" id="computer">
                            <h5>{{ fullName }}'s Account</h5>
                            <ul>
                                <li>Name: {{ fullName }}</li>
                                <li>Username: {{ username}}</li>
                                <li>Email: {{ email }}</li>
                                <li>Balance: {{ balance }} <button class="btn waves-effect waves-light miniMenu" v-on:click="showInputForBalance()">Add balance</button>
                                <button class="btn waves-effect waves-light miniMenu" v-on:click="showInputForWithdrawl()">Withdraw balance</button></li>
                                <li v-if="seenAdd"> <input v-model="addBalance" type="number" placeholder="Add amount"> <button class="btn waves-effect waves-light miniMenu" v-on:click="stripeAddMoneyClick()">Add balance</button></li>
                                <li v-if="seenWithdraw"> <input v-model="withdrawBalance" type="number" placeholder="Withdraw amount"> <button class="btn waves-effect waves-light miniMenu" v-on:click="stripeWithdrawMoneyClick()">Withdraw balance</button></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div>
                    <input v-if="clickInviteFriend" v-model="friendEmail" type="number" placeholder="Friend Email"> <button class="btn waves-effect waves-light miniMenu" v-on:click="inviteFriend()">Invite</button>
                </div>

                <div class="col s6">
                    <div id="accountMenu">
                        <button v-on:click="stripeAddCardClick()" class="btn waves-effect waves-light miniMenu" id="customButton">Add Card</button>
                        <button v-on:click="inviteFriendField()" class="btn waves-effect waves-light miniMenu" id="miniMenu2">Invite Friends</button>
                        <button v-on:click="deleteAccount()" class="btn waves-effect waves-light miniMenu" id="miniMenu4">Delete Account</button>

                    </div>
                </div>
                <div id="playButton">
                    <img src="img/blueChip.png" alt="some text">
                    <a href="/play">
                        <h2 id="blueChip">PLAY</h2>
                    </a>
                </div>

                <div class="col s12" id="imgLogo">
                    <img src="img/logo.png" alt="some text">
                </div>

                <!--end of the game board-->
    </main-layout>
</template>

<script>
    import MainLayout from '../layouts/Main.vue'
    const api = require("../services/api");

    let idCookie, tokenCookie;

    let addCardHandler = StripeCheckout.configure({
        key: 'pk_test_5IgrEBfDgN20z1RZS0c0Ki2v',
        image: './img/logofavicon.png',
        locale: 'auto',
        token: function (token) {
            console.log(token);
            this.stripeToken = token;
            console.log(this.stripeToken);
            console.log(this.blackjackIdCookie);
            api.callApi({ method: 'POST', path: 'https://blackjackapi00.herokuapp.com/stripe', params: { blackjackIdCookie: this.blackjackIdCookie, stripeToken: this.stripeToken.id } })
                .then(result => {
                    //store token and ID
                    console.log("data sent");
                })
                .catch(err => {
                    console.log("error");
                });
        }
    });

    let addMoneyHandler = StripeCheckout.configure({
        key: 'pk_test_5IgrEBfDgN20z1RZS0c0Ki2v',
        image: './img/logofavicon.png',
        locale: 'auto',
        token: function (token) {
            console.log(token);
            this.stripeToken = token;
            console.log(this.stripeToken);
            console.log(this.blackjackIdCookie);
            api.callApi({ method: 'POST', path: 'https://blackjackapi00.herokuapp.com/stripeaddmoney', params: { blackjackIdCookie: this.blackjackIdCookie, stripeToken: this.stripeToken.id, amount: this.amount } })
                .then(result => {
                    console.log("data sent");
                })
                .catch(err => {
                    console.log("error");
                });
        }
    });

    let withdrawMoneyHandler = StripeCheckout.configure({
        key: 'pk_test_5IgrEBfDgN20z1RZS0c0Ki2v',
        image: './img/logofavicon.png',
        locale: 'auto',
        token: function (token) {
            console.log(token);
            this.stripeToken = token;
            console.log(this.stripeToken);
            console.log(this.blackjackIdCookie);
            api.callApi({ method: 'POST', path: 'https://blackjackapi00.herokuapp.com/stripeaddmoney', params: { blackjackIdCookie: this.blackjackIdCookie, stripeToken: this.stripeToken.id, amount: this.amount } })
                .then(result => {
                    console.log("data sent");
                })
                .catch(err => {
                    console.log("error");
                });
        }
    });



    export default {
        components: {
            MainLayout
        },
        data: function () {
            return {
                fullName: '',
                email: '',
                username: '',
                balance: '',
                addBalance: '',
                withdrawBalance: '',
                seenAdd: false,
                seenWithdraw: false,
                stripeToken: {},
                blackjackIdCookie: idCookie,
                blackjackTokenCookie: tokenCookie,
                clickInviteFriend: false
            }
        },
        methods: {
            stripeAddCardClick: function () {
                addCardHandler.open({
                    name: 'BlackJack',
                    description: "It's in the game",
                    panelLabel: 'Add card'
                });
            },
            showInputForBalance: function() {
                console.log("show input for balance");
                this.seenAdd = true;
            },
            stripeAddMoneyClick: function () {
                console.log("add money function");
                addMoneyHandler.open({
                    name: 'BlackJack',
                    description: "It's in the game",
                    currency: 'gbp',
                    amount: this.addBalance*100,
                    panelLabel: 'Add money'
                })
            },
            showInputForWithdrawl: function() {
                console.log("show input for withdrawl");
                this.seenWithdraw = true;
            },
            stripeWithdrawMoneyClick: function () {
                console.log("withdraw money function");
                withdrawMoneyHandler.open({
                    name: 'BlackJack',
                    description: "It's in the game",
                    currency: 'gbp',
                    amount: this.withdrawBalance*100,
                    panelLabel: 'Withdraw money'
                })
            },
            deleteAccount: function () {
                api.callApi({ method: 'DELETE', path: 'https://blackjackapi00.herokuapp.com/deleteaccount', params: { blackjackIdCookie: this.blackjackIdCookie, blackjackTokenCookie: this.blackjackTokenCookie } })
                    .then(result => {
                        console.log("data sent");
                    })
                    .catch(err => {
                        console.log("error");
                    });
            },
            inviteFriendField: function() {
                console.log("invite friend field");
                this.clickInviteFriend = true;
            },
            inviteFriend: function() {
                
            }
        },
        beforeMount: function () {
            console.log('Mounting');
            idCookie = this.$cookie.get('blackjackIdCookie');
            console.log("cookie id" + idCookie);
            tokenCookie = this.$cookie.get('blackjackTokenCookie');
            console.log("cookie token" + tokenCookie);
            api.callApi({ method: 'GET', path: 'https://blackjackapi00.herokuapp.com/accountinfo'})
                    .then(result => {
                        //store token and ID
                        console.log("data received");
                        this.fullName = result.body.fullName;
                        this.username = result.body.username;
                        this.email = result.body.email;
                        this.balance = result.body.balance;
                    })
                    .catch(err => {
                        console.log("error");
                    });
        }
    }

</script>