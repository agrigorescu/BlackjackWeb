<template>
    <main-layout>
        <div class="row">
            <div v-if="!formSubmitted">
                <form @submit.prevent="validateBeforeSubmit">
                    <div class="column is-12">
                        <label class="label">User Name</label>
                        <p class="control has-icon has-icon-right">
                            <input name="userName" v-model="userName" v-validate.initial="userName" data-vv-rules="required|alpha|min:3" :class="{'input': true, 'is-danger': errors.has('userName') }"
                                type="text" placeholder="User Name">
                            <i v-show="errors.has('userName')" class="fa fa-warning"></i>
                            <span v-show="errors.has('userName')" class="help is-danger">{{ errors.first('userName') }}</span>
                        </p>
                    </div>
                    <div class="column is-12">
                        <label class="label">Name</label>
                        <p class="control has-icon has-icon-right">
                            <input name="name" v-model="name" v-validate.initial="name" data-vv-rules="required|alpha|min:3" :class="{'input': true, 'is-danger': errors.has('name') }"
                                type="text" placeholder="Name">
                            <i v-show="errors.has('name')" class="fa fa-warning"></i>
                            <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
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
                            <p>Date of birth is: {{ birthDate }}</p>
                            <input v-model="birthDate" id="birthDate" type="date" class="datepicker validate">
                        </div>
                    </div>
                    <button class="btn  waves-effect waves-light right btn-primary btn-block" name="action" id="submitRegistration" type="submit">Submit</button>
                </form>
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
    //VueRecaptcha
    export default {
        components: {
            MainLayout
        },
        data: function () {
            return {
                userName: '',
                name: '',
                email: '',
                password: '',
                birthDate: '',
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
                console.log({data:{userName:this.userName, name:this.name,email:this.email,password:this.password,birthDate:this.birthDate}});
                api.callApi({method: 'POST', path: 'localhost:3000/registration',params:{userName:this.userName, name:this.name,email:this.email,password:this.password,birthDate:this.birthDate}})
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