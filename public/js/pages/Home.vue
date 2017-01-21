<template>
    <main-layout>
        <img id="homeBackground" src="img/gameBoardHomepage.png" alt="some text">
        <div class="container">
            <div class="row homeChips">
                <ul>
                    <li id="login"><a href="/login">
                        <img id="loginChip" src="img/loginChip.png" alt="some text"> 
                    </a></li>
                    
                    <li id="register"><a href="/registration">
                        <img id="registerChip" src="img/registerChip.png" alt="some text"> 
                    </a></li>
                </ul>
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
        beforeMount: function(){
            console.log('Mounting');
            
        }
    }
</script>