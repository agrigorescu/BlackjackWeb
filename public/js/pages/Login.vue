<template>
    <main-layout>
        <div class="row">
            <form @submit.prevent="validateForm('form-2')" class="columns column is-multiline is-12" data-vv-scope="form-2">
        <legend>Form 2</legend>
        <div class="column is-12">
            <label class="label">Username</label>

            <p class="control has-icon has-icon-right">
                <input name="userName" v-model="userName" v-validate.initial="userName" data-vv-rules="required|alpha|min:3" :class="{'input': true, 'is-danger': errors.has('userName', 'form-2') }" type="text" placeholder="Enter Username">
                <i v-show="errors.has('userName', 'form-2')" class="fa fa-warning"></i>
                <span v-show="errors.has('userName', 'form-2')" class="help is-danger">{{ errors.first('userName', 'form-2') }}</span>
            </p>

        </div>
        <div class="input-field col s12 form-group" :class="{'has-error': errors.has('password') }">
            <label class="label">Password</label>
            <p class="control has-icon has-icon-right">
                <input v-model="password" id="password" v-validate.initial="password" data-vv-rules="required|alpha|min:6" :class="{'input': true, 'is-danger': errors.has('password', 'form-2') }" type="password" placeholder="Enter The Password">
                <i v-show="errors.has('password', 'form-2')" class="fa fa-warning"></i>
                <span v-show="errors.has('password', 'form-2')" class="help is-danger">{{ errors.first('password', 'form-2') }}</span>
            </p>
               
        </div>
        <p class="control">
            <button class="button is-primary" type="submit" name="button" v-on:click="submit($event)">Log in</button>
            <button class="button is-danger" type="button" name="button" @click="errors.clear('form-2')">Clear</button>
        </p>
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
                password: '',
                formSubmitted: false
            }
        },
        // submitting the post request to the Bee CLI to start running
    methods: {
        submit: function (event){
            event.preventDefault();
            console.log({data:{userName:this.userName, password:this.password}});
            this.$http.post('/login', {data:{userName:this.userName, password:this.password}}, (data) => {
                console.log(data);
            });
        }
    },
        beforeMount: function () {
            console.log('Mounting');

        }
    }

</script>