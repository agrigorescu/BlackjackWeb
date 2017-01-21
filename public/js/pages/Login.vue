<template>
    <main-layout>     
        <div class="row container" id="titleLogin">
            <div class="row">
                <form @submit.prevent="validateBeforeSubmit('form-2')" class="columns column is-multiline is-12" data-vv-scope="form-2">
                    <div class="column is-12">
                        <label class="label">Username</label>
                        <p class="control has-icon has-icon-right">
                            <input name="username" v-model="username" v-validate.initial="username" data-vv-rules="required|alpha|min:3" :class="{'input': true, 'is-danger': errors.has('username', 'form-2') }"
                                type="text" placeholder="Enter Username">
                            <i v-show="errors.has('username', 'form-2')" class="fa fa-warning"></i>
                            <span v-show="errors.has('username', 'form-2')" class="help is-danger">{{ errors.first('username', 'form-2') }}</span>
                        </p>
                    </div>

                    <div class="column is-12">
                        <label class="label">Password</label>
                        <p class="control has-icon has-icon-right">
                            <input v-model="password" id="password" v-validate.initial="password" data-vv-rules="required|alpha|min:6" :class="{'input': true, 'is-danger': errors.has('password', 'form-2') }"
                                type="password" placeholder="Enter The Password">
                            <i v-show="errors.has('password', 'form-2')" class="fa fa-warning"></i>
                            <span v-show="errors.has('password', 'form-2')" class="help is-danger">{{ errors.first('password', 'form-2') }}</span>
                        </p>

                    </div>
                    <p class="control">
                        <button class="button btn waves-effect waves-light is-primary" type="submit" name="button" v-on:click="submitForm($event)">Log in</button>
                    </p>
                </form>
            </div>
        </div>
    </main-layout>
</template>

<script>
    /**
 * Creating an instance of the Vue class
 * */
    import MainLayout from '../layouts/Main.vue'

    const api = require("../services/api");
    export default {
        components: {
            MainLayout
        },
        data: function () {
            return {
                username: '',
                password: '',
                formSubmitted: false
            }
        },

        methods: {
            /**
             * Validating the form before submitting
             * */
            validateBeforeSubmit(e) {
                this.$validator.validateAll();
                if (!this.errors.any()) {
                    this.submitForm()
                }
            },
            /**
             * Submitting the form to the db
             * */
            submitForm() {
                this.formSubmitted = true;
                console.log({ data: { username: this.username, password: this.password } });
                api.callApi({ method: 'POST', path: 'https://blackjackapi00.herokuapp.com/login', params: { username: this.username, password: this.password } })
                    .then(result => {
                        //store token and ID in a cookie
                        console.log("this is what goes in the cookie");
                        console.log(result.body.success);
                        let cookie = result.body.success;
                        this.$cookie.set('blackjackIdCookie', cookie.id, 1);
                        this.$cookie.set('blackjackTokenCookie', cookie.token, 1);
                        //redirecting to the account info page
                        window.location.href = "http://blackjackwebtest.herokuapp.com/accountinfo";
                    })
                    .catch(err => {
                        console.log("error");
                    });
            }
        },
        beforeMount: function () {
            console.log('Mounting');
        }
    }

</script>