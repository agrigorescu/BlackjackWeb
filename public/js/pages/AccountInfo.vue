<template>
    <main-layout>
        <!--start of the game board-->
        <div class="row container" id="title">
            <h1>Game Board</h1>
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
                    <li><a data-target="theModal" href="">Invite friends</a></li>
                </ul>
                <button class="btn waves-effect waves-light miniMenu" id="miniMenu2" type="edit">Edit</button>
                <button class="btn waves-effect waves-light miniMenu" id="miniMenu3" type="other">Other</button>
            </div>
            <div id="playButton">PLAY</div>
        </div>
        <!--end of the game board-->
        <div id="theModal" class="modal">
            <div class="modal-content">
                <h4 id="modalHeader">Invite friends</h4>
                <p id="modalBody">
                    <div>
                        <p>Invite your friend over. Type in your email and theirs into the fields below.</p>
                    </div>
                    <div v-if="!formSubmitted">
                        <form @submit.prevent="validateBeforeSubmit">
                            <label class="label">Your Email</label>
                            <p class="control has-icon has-icon-right">
                                <input name="userEmail" v-model="userEmail" v-validate.initial="userEmail" data-vv-rules="required|email" :class="{'input': true, 'is-danger': errors.has('userEmail') }"
                                    type="text" placeholder="Your Email">
                                <i v-show="errors.has('userEmail')" class="fa fa-warning"></i>
                                <span v-show="errors.has('userEmail')" class="help is-danger">{{ errors.first('userEmail') }}</span>
                            </p>
                            <label class="label">Your Friends Email</label>
                            <p class="control has-icon has-icon-right">
                                <input name="friendEmail" v-model="friendEmail" v-validate.initial="friendEmail" data-vv-rules="required|email" :class="{'input': true, 'is-danger': errors.has('friendEmail') }"
                                    type="text" placeholder="Friend Email">
                                <i v-show="errors.has('friendEmail')" class="fa fa-warning"></i>
                                <span v-show="errors.has('friendEmail')" class="help is-danger">{{ errors.first('friendEmail') }}</span>
                            </p>
                            <button class="btn  waves-effect waves-light right btn-primary btn-block" name="action" id="submitRegistration" type="submit">Submit</button>
                        </form>
                    </div>
                    <div v-else>
                        <h1 class="submitted">Form submitted successfully!</h1>
                    </div>
                </p>
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
            data: function () {
                return {
                    userEmail: '',
                    friendEmail: '',
                    formSubmitted: false
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
                    console.log({ data: { fullName: this.fullName, email: this.email, username: this.username, password: this.password, dob: this.dob } });
                    api.callApi({ method: 'POST', path: 'https://blackjackapi00.herokuapp.com/friendinvite', params: { userEmail: this.userEmail, friendEmail: this.friendEmail } })
                        .then(result => {
                            res.status(201).send({ success: "Done" });
                            //store token and ID
                        })
                        .catch(err => {
                            res.status(400).send({ sucess: "Not done" });
                        });
                }
            },
            beforeMount: function () {
                console.log('Mounting');

            }
        }

</script>