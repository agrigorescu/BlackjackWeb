$(document).ready(function (){
    let zIndex = 0;
    let height = 0;
    let chipArray = [];
    let $counter = 0;
    let $bank = 500;

    $("#double").click(function(){
        if($counter == 0){
            return;
        }
        else {
            $counter *= 2;
            $bank - counter;
        }
        $('#quantity').val($counter.toFixed(2));
        $('#bank').val($bank.toFixed(2));
    });

    $("#resetChip").click(function(){
        //Empty all of the chips in the chipStack div
        height = 0;
        $bank = 500;
        $counter = 0;
        $('.chipStack').empty();
        $("#redChip").show();
        $("#blueChip").show();
        $("#greenChip").show();
        $("#blackChip").show();
        $("#orangeChip").show();
        $('#quantity').val($counter.toFixed(2));
        $('#bank').val($bank.toFixed(2));
    });

    $("#redChip").click(function(){
        $("#blueChip").hide();
        $("#greenChip").hide();
        $("#blackChip").hide();
        $("#orangeChip").hide();
        $('#redChip').clone().prependTo('.chipStack').addClass("chip").animate({
            'z-index' : zIndex++,
            'marginTop' : height-=5
        });
        $counter += 0.05;
        $bank -= 0.05;
        $('.chipStackBoard').css({
            position: "absolute",
        });
        $('#quantity').val($counter.toFixed(2));
        $('#bank').val($bank.toFixed(2));
    });

    $("#orangeChip").click(function(){
        $("#blueChip").hide();
        $("#greenChip").hide();
        $("#blackChip").hide();
        $("#redChip").hide();
        $('#orangeChip').clone().appendTo('.chipStack').addClass("chip").animate({
            'z-index' : zIndex++,
            'margin-top' : height-=5
        });
        $counter += 0.10;
        $bank -= 0.10;
        $('#quantity').val($counter.toFixed(2));
        $('#bank').val($bank.toFixed(2));
    });

    $("#greenChip").click(function(){
        $("#blueChip").hide();
        $("#redChip").hide();
        $("#blackChip").hide();
        $("#orangeChip").hide();
        $('#greenChip').clone().appendTo('.chipStack').addClass("chip").animate({
            'z-index' : zIndex++,
            'margin-top' : height-=5
        });
        $counter += 0.20;
        $bank -= 0.20;
        $('#quantity').val($counter.toFixed(2));
        $('#bank').val($bank.toFixed(2));
    });

    $("#blueChip").click(function(){
        $("#redChip").hide();
        $("#greenChip").hide();
        $("#blackChip").hide();
        $("#orangeChip").hide();
        $('#blueChip').clone().appendTo('.chipStack').addClass("chip").animate({
            'z-index' : zIndex++,
            'margin-top' : height-=5
        });
        $counter += 0.50;
        $bank -= 0.50;
        $('#quantity').val($counter.toFixed(2));
        $('#bank').val($bank.toFixed(2));
    });

    $("#blackChip").click(function(){
        $("#blueChip").hide();
        $("#greenChip").hide();
        $("#redChip").hide();
        $("#orangeChip").hide();
        $('#blackChip').clone().appendTo('.chipStack').addClass("chip").animate({
            'z-index' : zIndex++,
            'margin-top' : height-=5
        });
        $counter += 1;
        $bank -= 1;
        $('#quantity').val($counter.toFixed(2));
        $('#bank').val($bank.toFixed(2));
    });
  
});
