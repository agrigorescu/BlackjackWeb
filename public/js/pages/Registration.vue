<template>
    <main-layout>
        <div class="row">
            <div v-if="!formSubmitted">
                <form class="col s12">
                    <div class="row">
                        <div class="input-field col s12 form-group">
                            <p>Email is: {{ email }}</p>
                            <input v-model="email" class="form-control" type="email" placeholder="Email" id="email">
                            <!--<p class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</p>-->
                        </div>
                    </div>
                </form>
                <!--<form class="col s12" @submit.prevent="validateBeforeSubmit">
                <div class="row">
                    <div class="input-field col s12 form-group" :class="{'has-error': errors.has('userName') }">
                        <p>Username is: {{ userName }}</p>
                        <input v-model="userName" placeholder="Username" id="userName" v-validate.initial="userName" data-rules="required|alpha|min:3"
                            class="form-control" type="text">
                        <p class="text-danger" v-if="errors.has('userName')">{{ errors.first('userName') }} </p>
                    </div>
                    <div class="input-field col s12 form-group" :class="{'has-error': errors.has('fullName') }">
                        <p>Full name is: {{ fullName }}</p>
                        <input v-model="fullName" id="fullName" v-validate.initial="fullName" data-rules="required|alpha|min:3" class="form-control"
                            type="text" placeholder="Full Name">
                        <p class="text-danger" v-if="errors.has('fullName')">{{ errors.first('fullName') }}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12 form-group" :class="{'has-error': errors.has('email') }">
                        <p>Email is: {{ email }}</p>
                        <input v-model="email" v-validate.initial="email" data-rules="required|email" class="form-control" type="email" placeholder="Email"
                            id="email">
                        <p class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12 form-group" :class="{'has-error': errors.has('password') }">
                        <p>Password is: {{ password }}</p>
                        <input v-model="password" id="password" v-validate.initial="password" data-rules="required|alpha_dash|min:3" data-vv-rules="confirmed:passwordConfirm"
                            type="password" placeholder="Enter The Password" class="form-control">
                        <p class="text-danger">The passwords do not match</p>
                        <input name="passwordConfirm" type="password" placeholder="Confirm the password" class="input is-danger">
                        <p class="text-danger" v-if="errors.has('password')">{{ errors.first('password') }}</p>

                    </div>
                </div>
                <div>
                    <div class="input-field col s12">
                        <p>Date of birth is: {{ birthDate }}</p>
                        <input v-model="birthDate" id="birthDate" type="date" class="datepicker validate">
                    </div>
                </div>
                <div class="g-recaptcha" data-sitekey="6LdmCBIUAAAAACYEIR3fqgwela0__PMvyRayteqR"></div>
                <button class="btn waves-effect waves-light right" type="submit" name="action" id="submitRegistration" v-on:click="submit($event)">Submit</button>
            </form>-->
            </div>
            <div v-else>
                <h1 class="submitted">Form submitted successfully!</h1>
            </div>
        </div>
    </main-layout>
</template>


<script>
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
        methods: {
            // validateBeforeSubmit(e) {
            //     this.$validator.validateAll();
            //     if (!this.errors.any()) {
            //         this.submitForm()
            //     }
            // },
            validateBeforeSubmit() {
                // Validate All returns a promise and provides the validation result.
                this.$validator.validateAll().then(success => {
                    if (!success) {
                        // handle error
                        return;
                    } else {

                    }
                    alert('From Submitted!');
                });
            },
            submit(event) {
                event.preventDefault();
                console.log({ data: { userName: this.userName, fullName: this.fullName, email: this.email, password: this.password, birthDate: this.birthDate } });
                // this.$http.post('/registration', { data: { userName: this.userName, fullName: this.fullName, email: this.email, password: this.password, birthDate: this.birthDate } }, (data) => {
                //     console.log(data);
                // });
            }
        },
        beforeMount: function () {
            console.log('Mounting');

        }
    }
</script>