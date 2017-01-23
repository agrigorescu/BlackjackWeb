$(document).ready(function (){
    let zIndex = 0;
    let height = 0;

    // $("#double").click(function(){
    //     if($counter == 0){
    //         return;
    //     }
    //     else {
    //         $counter *= 2;
    //         $bank - counter;
    //     }
    //     $('#quantity').val($counter.toFixed(2));
    //     $('#bank').val($bank.toFixed(2));
    // });

    $("#resetChip").click(function(){
        //Empty all of the chips in the chipStack div
        height = 0;
        $('.chipStack').empty();
        $("#five").show();
        $("#ten").show();
        $("#twenty").show();
        $("#fifty").show();
        $("#hundred").show();;
    });

    $("#five").click(function(){
        $("#ten").hide();
        $("#twenty").hide();
        $("#fifty").hide();
        $("#hundred").hide();
        $('#five').clone().prependTo('.chipStack').addClass("chip").animate({
            'z-index' : zIndex++,
            'marginTop' : height-=5
        });
        $('.chipStackBoard').css({
            position: "absolute",
        });
    });

    $("#ten").click(function(){
        $("#twenty").hide();
        $("#fifty").hide();
        $("#hundred").hide();
        $("#five").hide();
        $('#ten').clone().appendTo('.chipStack').addClass("chip").animate({
            'z-index' : zIndex++,
            'margin-top' : height-=5
        });
    });

    $("#twenty").click(function(){
        $("#five").hide();
        $("#ten").hide();
        $("#fifty").hide();
        $("#hundred").hide();
        $('#twenty').clone().appendTo('.chipStack').addClass("chip").animate({
            'z-index' : zIndex++,
            'margin-top' : height-=5
        });
    });

    $("#fifty").click(function(){
        $("#five").hide();
        $("#ten").hide();
        $("#twenty").hide();
        $("#hundred").hide();
        $('#fifty').clone().appendTo('.chipStack').addClass("chip").animate({
            'z-index' : zIndex++,
            'margin-top' : height-=5
        });
    });

    $("#hundred").click(function(){
        $("#five").hide();
        $("#twenty").hide();
        $("#fifty").hide();
        $("#ten").hide();
        $('#hundred').clone().appendTo('.chipStack').addClass("chip").animate({
            'z-index' : zIndex++,
            'margin-top' : height-=5
        });
    });
  
});
