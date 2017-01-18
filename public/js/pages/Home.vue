<template>
    <main-layout>
        <img id="homeBackground" src="img/gameBoardHomepage.png" alt="some text">
        <div class="container">
            <li><a href="/login">Login</a></li>
            <li><a href="/registration">Registration</a></li>
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