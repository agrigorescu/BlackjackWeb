<template>
    <main-layout>
        <!--start of the game board-->
        <div class="row container" id="title">
            <div id="row">
                <h2>'Username''s Account</h2>
                <div class="col s6">
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
                    </div>
                </div>

                <div class="col s6">
                    <div id="accountMenu">

                        <!-- Dropdown Trigger -->
                        <a class='dropdown-button btn' id="miniMenu" href='#' data-activates='dropdown1'>Drop Me!</a>
                        <!-- Dropdown Structure -->
                        <ul id='dropdown1' class='dropdown-content'>
                            <li><a href="#!">one</a></li>
                            <li><a href="#!">two</a></li>
                            <li class="divider"></li>
                            <li><a href="#!">three</a></li>
                            <li><a id="show-modal" @click="showModal = true">Show Modal</a></li>
                        </ul>
                        <button class="btn waves-effect waves-light miniMenu" id="miniMenu2" type="edit">Edit</button>
                        <button class="btn waves-effect waves-light miniMenu" id="miniMenu3" type="other">Other</button>

                    </div>
                </div>
                <div id="playButton">
                    <a href="/play">
                        <h2>PLAY</h2>
                    </a>
                </div>

                <div class="col s12" id="imgLogo">
                    <img src="img/logo.png" alt="some text">
                </div>

                <!--end of the game board-->

                <!--add the modal structure-->
                <modal v-if="showModal" @close="showModal = false">
                    <!--you can use custom content here to overwrite default content-->
                    <h3 slot="header">custom header</h3>
                </modal>
    </main-layout>
</template>

<script>
    import MainLayout from '../layouts/Main.vue'
    import Modal from '../components/Modal.vue'

        const api = require("../services/api");
        export default {
            components: {
                MainLayout,
                Modal
            },
            data: function () {
                return {
                    showModal: false
                }
            },
            methods: {
                openDropdown() {
                        $('.dropdown-button').dropdown({
                            inDuration: 300,
                            outDuration: 225,
                            constrain_width: false, // Does not change width of dropdown to that of the activator
                            hover: true, // Activate on hover
                            gutter: 0, // Spacing from edge
                            belowOrigin: false, // Displays dropdown below the button
                            alignment: 'left' // Displays dropdown with edge aligned to the left of button
                        }
                        );
                    }
            },
            beforeMount: function () {
                console.log('Mounting');

            }
        }

</script>