<template>
    <main-layout>
        <form class="card-form" id="payment-form">
        <div class="row">
          <label>Number</label>
          <input type="text" size="20" id="number" placeholder="**** **** **** ****" data-stripe="number" v-model="cardNumber">
        </div>
        <div class="row">
          <div class="column">
            <label>Expiry</label>
            <input type="text" size="12" placeholder="MM / YY" id="exp" data-stripe="exp" v-model="cardExpiry">
          </div>
          <div class="column cvc">
            <label>CVC</label>
            <input type="text" size="4" id="cvc" placeholder="***" data-stripe="cvc" v-model="cardCvc">
          </div>
        </div>
          <div class="row">
            <label>Postal Code</label>
            <input type="text" size="7" placeholder="*** ***" data-stripe="address_zip" v-model="cardPostCode">
          </div>
        <div class="errors"></div>
        <div class="row">
          <button type="submit" class="arrow" v-if="seen">Submit</button>
        </div>
      </form>
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
                cardNumber: '',
                cardExpiry: '',
                cardCvc: '',
                cardPostCode: '',
                seen: true

            }
        },
        $(function() {
                var $form = $('#payment-form');
                $form.submit(function (event) {
                    // Disable the submit button to prevent repeated clicks:
                    $form.find('.submit').prop('disabled', true);

                    // Request a token from Stripe:
                    Stripe.card.createToken($form, stripeResponseHandler);

                    // Prevent the form from being submitted:
                    return false;
                });
            });
        methods: {
            submit() {
                this.form = true;
                console.log({data:{cardNumber:this.cardNumber, email:this.email,username:this.username,password:this.password,dob:this.dob}});
                api.callApi({method: 'POST', path: 'https://blackjackapi00.herokuapp.com/register',params:{fullName:this.fullName, email:this.email,username:this.username,password:this.password,dob:this.dob}})
                .then(result => {
                    console.log("data sent");
                    window.location.href = "http://localhost:3000/login";
                })
                .catch(err => {
                    console.log("error");
                });
            }
        },
        beforeMount: function () {
            console.log('Mounting');

        }
    }
</script>