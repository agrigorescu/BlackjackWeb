$(() => {
    console.log("the dom is ready");

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 100 // Creates a dropdown of 15 years to control year
    });

});