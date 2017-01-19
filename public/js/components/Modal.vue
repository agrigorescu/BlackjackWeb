<template>
    <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <div v-if="!formSubmitted">
                        <form @submit.prevent="validateBeforeSubmit">
                            <label class="label">Your Friends Email</label>
                            <p class="control has-icon has-icon-right">
                                <input name="friendEmail" v-model="friendEmail" v-validate.initial="friendEmail" data-vv-rules="required|email" :class="{'input': true, 'is-danger': errors.has('friendEmail') }"
                                    type="text" placeholder="Friend Email">
                                <i v-show="errors.has('friendEmail')" class="fa fa-warning"></i>
                                <span v-show="errors.has('friendEmail')" class="help is-danger">{{ errors.first('friendEmail') }}</span>
                            </p>
                            <button class="btn  waves-effect waves-light right btn-primary btn-block" name="action" id="submitRegistration" type="submit" >Submit</button>
                        </form>
                    </div>
                    <div v-else @click="$emit('close')">
                        <h1 class="submitted">Form submitted successfully!</h1>
                    </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
    const api = require("../services/api");
    export default {
        data: function () {
                return {
                    friendEmail: '',
                    showModal: false,
                    existingUserId: '',
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
                    this.existingUserId = this.$cookie.get('idCookie');
                    console.log(this.existingUserId);
                    console.log({ data: { firendEmail: this.friendEmail, existingUserId: this.existingUserId} });
                    api.callApi({ method: 'POST', path: 'https://blackjackapi00.herokuapp.com/invite', params: { firendEmail: this.friendEmail, existingUserId: this.existingUserId } })
                        .then(result => {
                            console.log("send data");
                            //store token and ID
                        })
                        .catch(err => {
                            console.log("error");
                        });
                }
        }
    }
</script>