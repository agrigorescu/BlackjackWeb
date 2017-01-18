<template>
    <main-layout>
        <div class="row">
            <form class="col s12">
                <div class="row">
                    <div class="input-field col s6">
                        <!--<i class="material-icons prefix">Username</i>-->
                        <p> Username is:{{ userName }} </p>
                        <input v-model="userName" id="icon_prefix" type="text" class="validate">
                        <label for="icon_prefix"></label>
                    </div>
                    <div class="input-field col s6">
                        <!--<i class="material-icons prefix">Password</i>-->
                        <p> Password is:{{ password }} </p>
                        <input v-model="password" id="password" type="password" class="validate">
                        <label for="passord"></label>
                    </div>
                </div>
                <button class="btn waves-effect waves-light" type="submit" name="action" id="submitLogin" v-on:click="submit($event)">Log In</button>
            </form>
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
                userName: '',
                fullName: '',
                email: '',
                password: '',
                birthDate: '',
                formSubmitted: false
            }
        },
        // submitting the post request to the Bee CLI to start running
        methods: {
            submit: function (event) {
                event.preventDefault();
                console.log({ data: { userName: this.userName, password: this.password } });
                this.$http.post('/login', { data: { userName: this.userName, password: this.password } }, (data) => {
                    console.log(data);
                });
            }
        },
        beforeMount: function () {
            console.log('Mounting');

        }
    }

</script>