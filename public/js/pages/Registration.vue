<template>
    <main-layout>
        <div class="row container" id="title">
            <div class="row">
                <div v-if="!formSubmitted">
                    <form @submit.prevent="validateBeforeSubmit">
                        <div class="column is-12">
                            <label class="label">User Name</label>
                            <p class="control has-icon has-icon-right">
                                <input name="username" v-model="username" v-validate.initial="username" data-vv-rules="required|alpha|min:3" :class="{'input': true, 'is-danger': errors.has('username') }"
                                    type="text" placeholder="User Name">
                                <i v-show="errors.has('username')" class="fa fa-warning"></i>
                                <span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>
                            </p>
                        </div>
                        <div class="column is-12">
                            <label class="label">Name</label>
                            <p class="control has-icon has-icon-right">
                                <input name="fullName" v-model="fullName" v-validate.initial="fullName" data-vv-rules="required|alpha|min:3" :class="{'input': true, 'is-danger': errors.has('fullName') }"
                                    type="text" placeholder="Name">
                                <i v-show="errors.has('fullName')" class="fa fa-warning"></i>
                                <span v-show="errors.has('fullName')" class="help is-danger">{{ errors.first('fullName') }}</span>
                            </p>
                        </div>
                        <div class="column is-12">
                            <label class="label">Email</label>
                            <p class="control has-icon has-icon-right">
                                <input name="email" v-model="email" v-validate.initial="email" data-vv-rules="required|email" :class="{'input': true, 'is-danger': errors.has('email') }"
                                    type="text" placeholder="Email">
                                <i v-show="errors.has('email')" class="fa fa-warning"></i>
                                <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                            </p>
                        </div>
                        <div class="row">
                            <div class="input-field col s12 form-group" :class="{'has-error': errors.has('password') }">
                                <input v-model="password" id="password" v-validate.initial="password" data-vv-rules="required|alpha|min:3" type="password"
                                    placeholder="Enter The Password" class="form-control">
                            </div>
                        </div>


                        <div class="row">
                            <div class="input-field col s12">
                                <p>Date of birth: {{ dob }}</p>
                                <input v-model="dob" id="dob" type="date" class="datepicker validate">
                            </div>
                        </div>
                        <button class="btn  waves-effect waves-light right btn-primary btn-block" name="action" id="submitRegistration" type="submit">Submit</button>
                    </form>
                </div>
                <div v-else>
                    <h1 class="submitted">Form submitted successfully!</h1>
                </div>
            </div>
        </div>
    </main-layout>
</template>


<script>
    import MainLayout from '../layouts/Main.vue'
    const api = require("../services/api");
    //VueRecaptcha
    export default {
        components: {
            MainLayout
        },
        data: function () {
            return {
                fullName: '',
                email: '',
                username: '',
                password: '',
                dob: '',
                formSubmitted: false,

            }
        },
        methods: {
            validateBeforeSubmit(e) {
                this.$validator.validateAll();
                if (!this.errors.any()) {
                    this.submitForm()
                }
            },
            submitForm() {
                this.formSubmitted = true;
                console.log({data:{fullName:this.fullName, email:this.email,username:this.username,password:this.password,dob:this.dob}});
                api.callApi({method: 'POST', path: 'https://blackjackapi00.herokuapp.com/register',params:{fullName:this.fullName, email:this.email,username:this.username,password:this.password,dob:this.dob}})
                .then(result => {
                    res.status(201).send({success: "Done"});
                    //store token and ID
                })
                .catch(err => {
                    res.status(400).send({sucess:"Not done"});
                });
            }
        },
        beforeMount: function () {
            console.log('Mounting');

        }
    }
</script>