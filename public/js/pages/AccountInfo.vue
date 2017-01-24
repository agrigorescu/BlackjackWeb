<template>
    <main-layout>
        <!--start of the account info page-->
        <div class="row container" id="title">
            <div id="row">
                <h2>{{fullName}}'s Account</h2>

                <div class="col s12">
                    <div id="accountMenu">
                        <button v-on:click="stripeAddCardClick()" class="btn waves-effect waves-light miniMenu" id="customButton">Add Card</button>
                        <button v-on:click="inviteFriendField()" class="btn waves-effect waves-light miniMenu" id="miniMenu2">Invite Friends</button>
                        <button v-on:click="deleteAccount()" class="btn waves-effect waves-light miniMenu" id="miniMenu4">Delete Account</button>

                    </div>
                </div>

                <div class="col s12" id="accountContent">
                    <div class="col s6">
                        <div id="accountInfo">
                            <div class="boxinfo" id="info">
                                <ul>
                                    <li>Name: {{ fullName }}</li>
                                    <li>Username: {{ username}}</li>
                                    <li>Email: {{ email }}</li>
                                    <li>Balance: {{ balance }}</li>
                                    <button class="btn waves-effect waves-light miniMenu" v-on:click="showInputForBalance()" v-if="seenBalance">Add balance</button>
                                    <button class="btn waves-effect waves-light miniMenu" v-on:click="showInputForWithdrawl()" v-if="seenBalance">Withdraw balance</button></li>
                                    <li v-if="seenAdd"> <input v-model="addBalance" type="number" placeholder="Add amount"> <button class="btn waves-effect waves-light miniMenu" v-on:click="stripeAddMoneyClick()">Add balance</button></li>
                                    <li v-if="seenWithdraw"> <input v-model="withdrawBalance" type="number" placeholder="Withdraw amount"> <button class="btn waves-effect waves-light miniMenu" v-on:click="stripeWithdrawMoneyClick()">Withdraw balance</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col s6">
                        <div id="playButton">
                            <a href="/play">
                                <img id="blueChip" src="img/playChip.png" alt="some text">
                            </a>
                        </div>
                    </div>
                </div>

                <div>
                    <input v-if="clickInviteFriend" v-model="friendEmail" type="email" placeholder="Friend Email" data-vv-rules="required|email"> <button v-if="clickInviteFriend" class="btn waves-effect waves-light miniMenu" v-on:click="inviteFriend()">Invite</button>
                </div>

                <div class="col s12">
                    <div id="imgLogo">
                        <img id="littleLogo" src="img/logo.png" alt="some text">
                    </div>
                </div>

                <!--end of the account info page-->
    </main-layout>
</template>

<script>

    import MainLayout from '../layouts/Main.vue'
    const api = require("../services/api");

    let idCookie, tokenCookie;

    /**  
     * Stripe handler for adding a card
     * */
    let addCardHandler = StripeCheckout.configure({
        key: 'pk_test_5IgrEBfDgN20z1RZS0c0Ki2v',
        image: './img/logofavicon.png',
        locale: 'auto',
        token: function (token) {
            console.log(token);
            this.stripeToken = token.card;
            console.log(this.stripeToken.id);
            console.log(idCookie);
            api.callApi({ method: 'POST', path: 'http://blackjackapi00.herokuapp.com/payment', params: { id: idCookie, source: this.stripeToken.id } })
                .then(result => {
                    console.log("data sent");
                })
                .catch(err => {
                    console.log("error");
                });
        }
    });

    /**
     * Stripe handler for adding money
     * */
    // let addMoneyHandler = StripeCheckout.configure({
    //     key: 'pk_test_5IgrEBfDgN20z1RZS0c0Ki2v',
    //     image: './img/logofavicon.png',
    //     locale: 'auto',
    //     token: function (token) {
    //         console.log(token);
    //         this.stripeToken = token;
    //         console.log(this.stripeToken);
    //         console.log(this.blackjackIdCookie);
    //         api.callApi({ method: 'POST', path: 'https://blackjackapi00.herokuapp.com/charge', params: { id: this.blackjackIdCookie, cardToken: this.stripeToken, amount: this.amount } })
    //             .then(result => {
    //                 console.log("data sent");
    //                 this.seenAdd = false;
    //             })
    //             .catch(err => {
    //                 console.log("error");
    //             });
    //     }
    // });

    /**
     *  Stripe handler for withdrawing money
     * */
    // let withdrawMoneyHandler = StripeCheckout.configure({
    //     key: 'pk_test_5IgrEBfDgN20z1RZS0c0Ki2v',
    //     image: './img/logofavicon.png',
    //     locale: 'auto',
    //     token: function (token) {
    //         console.log(token);
    //         this.stripeToken = token;
    //         console.log(this.stripeToken);
    //         console.log(this.blackjackIdCookie);
    //         api.callApi({ method: 'POST', path: 'https://blackjackapi00.herokuapp.com/refund', params: { id: this.blackjackIdCookie, cardToken: this.stripeToken, amount: this.amount } })
    //             .then(result => {
    //                 console.log("data sent");
    //                 this.seenWithdraw = false;
    //             })
    //             .catch(err => {
    //                 console.log("error");
    //             });
    //     }
    // });



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
                blackjackIdCookie: '',
                blackjackTokenCookie: '',
                clickInviteFriend: false,
                friendEmail: '',
                existingUserId: '',
                seenBalance: true
            }
        },
        methods: {
            /**
             * Adding a card to the db
             * */
            stripeAddCardClick: function () {
                addCardHandler.open({
                    name: 'BlackJack',
                    description: "It's in the game",
                    panelLabel: 'Add card'
                });
            },

            /**
             * This method makes the input field for adding money visible
             * */
            showInputForBalance: function () {
                console.log("show input for balance");
                this.seenAdd = true;
                this.seenBalance = false;
            },

            /**
             * Adding money to the user's balance
             * */
            stripeAddMoneyClick: function () {
                    // console.log("add money function");
                    // addMoneyHandler.open({
                    //     name: 'BlackJack',
                    //     description: "It's in the game",
                    //     currency: 'gbp',
                    //     amount: this.addBalance * 100,
                    //     panelLabel: 'Add money'
                    // });
                    api.callApi({ method: 'POST', path: 'https://blackjackapi00.herokuapp.com/charge', params: { id: idCookie, amount: this.amount } })
                        .then(result => {
                            console.log("data sent");
                            this.seenAdd = false;
                            api.callApi({ method: 'GET', path: `https://blackjackapi00.herokuapp.com/account/${idCookie}` })
                                .then(result => {
                                    console.log("data received");
                                    //retrieve the information from the db
                                    console.log("result is");
                                    console.log(result);
                                    let account = result.body.success;
                                    //displaying the information from the db
                                    this.fullName = account.fullName;
                                    this.username = account.username;
                                    this.email = account.email;
                                    this.balance = account.balance;
                                })
                        })
                        .catch(err => {
                            console.log("error");
                        });
                },

            /**
             * This method makes the input field for withdrawing money visible
             * */
            showInputForWithdrawl: function () {
                console.log("show input for withdrawl");
                this.seenWithdraw = true;
                this.seenBalance = false;
            },

            /**
             * Withdrawing money from the balance
             * */
            stripeWithdrawMoneyClick: function () {
                console.log("withdraw money function");
                // withdrawMoneyHandler.open({
                //     name: 'BlackJack',
                //     description: "It's in the game",
                //     currency: 'gbp',
                //     amount: this.withdrawBalance * 100,
                //     panelLabel: 'Withdraw money'
                // });
                api.callApi({ method: 'POST', path: 'https://blackjackapi00.herokuapp.com/refund', params: { id: idCookie, amount: this.amount } })
                    .then(result => {
                        console.log("data sent");
                        this.seenWithdraw = false;
                        api.callApi({ method: 'GET', path: `https://blackjackapi00.herokuapp.com/account/${idCookie}` })
                            .then(result => {
                                    console.log("data received");
                                    //retrieve the information from the db
                                    console.log("result is");
                                    console.log(result);
                                    let account = result.body.success;
                                    //displaying the information from the db
                                    this.fullName = account.fullName;
                                    this.username = account.username;
                                    this.email = account.email;
                                    this.balance = account.balance;
                                })
                        })
                    .catch(err => {
                        console.log("error");
                    });

            },

            /**
             * Sends a request to delete the user's account
             * */
            deleteAccount: function () {
                api.callApi({ method: 'DELETE', path: `https://blackjackapi00.herokuapp.com/account/${idCookie}`, params: { id: idCookie } })
                    .then(result => {
                        console.log("data sent");
                        //delete cookie
                        this.$cookie.delete('blackjackIdCookie');
                        this.$cookie.delete('blackjackTokenCookie');
                        console.log("cookie has been deleted");
                        window.location.href = "http://blackjackwebtest.herokuapp.com/";
                    })
                    .catch(err => {
                        console.log("error");
                    });
            },

            /**
             * This method makes the input field for inviting a friend visible
             * */
            inviteFriendField: function () {
                console.log("invite friend field");
                this.clickInviteFriend = true;
            },

            /**
             * Send a request to the db to send and email invite to a friend
             * */
            inviteFriend: function () {
                console.log({ data: { firendEmail: this.friendEmail, existingUserId: idCookie } });
                api.callApi({ method: 'POST', path: 'https://blackjackapi00.herokuapp.com/invite', params: { firendEmail: this.friendEmail, existingUserId: idCookie } })
                    .then(result => {
                        console.log("send data");
                        this.clickInviteFriend = false;
                    })
                    .catch(err => {
                        console.log("error");
                    });
            }
        },

        /**
         * Getting the user's info from the db before showing the page
         * */
        beforeMount: function () {
            console.log('Mounting');
            idCookie = this.$cookie.get('blackjackIdCookie');
            console.log("cookie id  " + idCookie);
            tokenCookie = this.$cookie.get('blackjackTokenCookie');
            console.log("cookie token   " + tokenCookie);
            api.callApi({ method: 'GET', path: `https://blackjackapi00.herokuapp.com/account/${idCookie}`  })
                .then(result => {
                    console.log("data received");
                    console.log("result is ");
                    console.log(result);
                    let account = result.body.success;
                    //displaying the information from the db
                    this.fullName = account.fullName;
                    this.username = account.username;
                    this.email = account.email;
                    this.balance = account.balance;
                })
                .catch(err => {
                    console.log("error");
                });
        }
    }

</script>