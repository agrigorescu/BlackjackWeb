$(document).ready(function (){
    let zIndex = 0;
    let redHeight = 0;
    let orangeHeight = 0;
    let blueHeight = 0;
    let greenHeight = 0;
    let blackHeight = 0;
    let chipArray = [];
    let $counter = 0;

    $("#double").click(function(){
        if($counter == 0){
            return;
        }
        else {
            $counter *= 2;
        }
        $('#quantity').val($counter.toFixed(2));
    });

    $("#resetChip").click(function(){
        //Empty all of the chips in the chipStack div
        redHeight = 0;
        orangeHeight = 0;
        blueHeight = 0;
        blackHeight = 0;
        greenHeight = 0;
        $counter = 0;
        $('.redChips').empty();
        $('.orangeChips').empty();
        $('.greenChips').empty();
        $('.blueChips').empty();
        $('.blackChips').empty();
        $("#redChip").show();
        $("#blueChip").show();
        $("#greenChip").show();
        $("#blackChip").show();
        $("#orangeChip").show();
        $('#quantity').val($counter.toFixed(2));
    });

    $("#redChip").click(function(){
        $("#blueChip").hide();
        $("#greenChip").hide();
        $("#blackChip").hide();
        $("#orangeChip").hide();
        $('#redChip').clone().prependTo('.chipStack .redChips').addClass("chip").animate({
            'z-index' : zIndex++,
            'marginTop' : redHeight-=5
        });
        $counter += 0.05;
        $('.chipStackBoard').css({
            position: "absolute",
        });
        $('#quantity').val($counter.toFixed(2));
    });

    $("#blueChip").click(function(){
        $("#redChip").hide();
        $("#greenChip").hide();
        $("#blackChip").hide();
        $("#orangeChip").hide();
        $('#blueChip').clone().appendTo('.chipStack .blueChips').addClass("chip").animate({
            'z-index' : zIndex++,
            'margin-top' : blueHeight-=5
        });
        $counter += 0.50;
        $('#quantity').val($counter.toFixed(2));
    });

    $("#orangeChip").click(function(){
        $("#blueChip").hide();
        $("#greenChip").hide();
        $("#blackChip").hide();
        $("#redChip").hide();
        $('#orangeChip').clone().appendTo('.chipStack .orangeChips').addClass("chip").animate({
            'z-index' : zIndex++,
            'margin-top' : orangeHeight-=5
        });
        $counter += 0.10;
        $('#quantity').val($counter.toFixed(2));
    });

    $("#blackChip").click(function(){
        $("#blueChip").hide();
        $("#greenChip").hide();
        $("#redChip").hide();
        $("#orangeChip").hide();
        $('#blackChip').clone().appendTo('.chipStack .blackChips').addClass("chip").animate({
            'z-index' : zIndex++,
            'margin-top' : blackHeight-=5
        });
        $counter += 1;
        $('#quantity').val($counter.toFixed(2));
    });

    $("#greenChip").click(function(){
        $("#blueChip").hide();
        $("#redChip").hide();
        $("#blackChip").hide();
        $("#orangeChip").hide();
        $('#greenChip').clone().appendTo('.chipStack .greenChips').addClass("chip").animate({
            'z-index' : zIndex++,
            'margin-top' : greenHeight-=5
        });
        $counter += 0.20;
        $('#quantity').val($counter.toFixed(2));
    });
  
});
