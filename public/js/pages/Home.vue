<template>
    <main-layout>
        <img id="homeBackground" src="img/gameBoardHomepage.png" alt="some text">
        <div class="container">
            <li><v-link href="/login">Login</v-link></li>
            <li><v-link href="/registration">Registration</v-link></li>
            <!--<h5>Home</h5>-->
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
        beforeMount: function(){
            console.log('Mounting');
            
        }
    }
</script>