<template>
    <main-layout>
        <!--start of the game board-->
        <div class="row container" id="title">
            <h1>'Username''s Account</h1>
            <div id="accountInfo">
                <div class="boxinfo" id="computer">
                    <h5>"Username"'s Account</h5>
                    <ul>
                        <li>Name: Test</li>
                        <li>Username: Test01</li>
                        <li>Email: test01@test.com</li>
                        <li>Games played: 45</li>
                        <li>Games won: 30</li>
                        <li>Games lost: 15</li>
                        <li>Bio - say something about yourself</li>
                    </ul>
                </div>

                <!-- Dropdown Trigger -->
                <a class='dropdown-button btn' id="miniMenu" href='#' data-activates='dropdown1'>Drop Me!</a>
                <!-- Dropdown Structure -->
                <ul id='dropdown1' class='dropdown-content'>
                    <li><a href="#!">one</a></li>
                    <li><a href="#!">two</a></li>
                    <li class="divider"></li>
                    <li><a href="#!">three</a></li>
                </ul>
                <button class="btn waves-effect waves-light miniMenu" id="miniMenu2" type="edit">Edit</button>
                <button class="btn waves-effect waves-light miniMenu" id="miniMenu3" type="other">Other</button>
            </div>
            <div id="playButton">PLAY</div>
        </div>
        <!--end of the game board-->
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
        // submitting the post request to the Bee CLI to start running
        methods: {
        },
        beforeMount: function () {
            console.log('Mounting');

        }
    }

</script>