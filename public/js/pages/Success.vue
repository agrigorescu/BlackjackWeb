<template>
    <main-layout>
       
                <h2> Confirmation of registration!! </h2>

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
            submit: function (event) {
                event.preventDefault();
                console.log({ data: { userName: this.userName, password: this.password } });
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