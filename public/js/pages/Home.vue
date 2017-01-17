<template>
    <main-layout>
        <div class="container">
            <h5>Home</h5>
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