/**
* Creating an instance of the Vue class and importing vue validation
**/

import Vue from 'vue.js'
import VeeValidate from '../../node_modules/vee-validate/dist/vee-validate.js';

Vue.use(VeeValidate);

export var app = new Vue({
    el: '#app',
    data: {
        userName: '',
        fullName: '',
        email: '',
        password: '',
        birthDate: ''
    },
    // submitting the post request to the database with the info
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
                if (! success) {
                    // handle error
                    return;
                } else {
                    
                }
                alert('From Submitted!');
            });
        }
    }



        submit(event) {
            event.preventDefault();
            console.log({ data: { userName: this.userName, fullName: this.fullName, email: this.email, password: this.password, birthDate: this.birthDate } });
            this.$http.post('/registration', { data: { userName: this.userName, fullName: this.fullName, email: this.email, password: this.password, birthDate: this.birthDate } }, (data) => {
                console.log(data);
            });
        }
    }
});