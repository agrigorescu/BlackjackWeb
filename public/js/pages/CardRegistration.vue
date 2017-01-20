<template>
    <main-layout>
        <form class="card-form" id="payment-form">
        <div class="row">
          <label>Number</label>
          <input type="text" size="20" id="number" placeholder="**** **** **** ****" data-stripe="number">
        </div>
        <div class="row">
          <div class="column">
            <label>Expiry</label>
            <input type="text" size="12" placeholder="MM / YY" id="exp" data-stripe="exp">
          </div>
          <div class="column cvc">
            <label>CVC</label>
            <input type="text" size="4" id="cvc" placeholder="***" data-stripe="cvc">
          </div>
        </div>
          <div class="row">
            <label>Postal Code</label>
            <input type="text" size="7" placeholder="*** ***" data-stripe="address_zip">
          </div>
        <div class="errors"></div>
        <div class="row">
          <button type="submit" class="arrow">Submit</button>
        </div>
      </form>
    </main-layout>
</template>