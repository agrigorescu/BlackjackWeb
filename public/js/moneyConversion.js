$(document).ready(function (){
    let zIndex = 0;
    let height = 0;
    let chipArray = [];
    $counter = 0;

    $("#resetChip").click(function(){
        //Empty all of the chips in the chipStack div
        $('.chipStack').empty();
        height = 0;
        $counter = 0;
        $('#quantity').val($counter.toFixed(2));
    });

    $("#redChip").click(function(){
        $('#redChip').clone().appendTo('.chipStack').addClass("chip").css({
            'z-index' : zIndex++,
            marginTop : height-=5,
        });
        $counter += 0.05;
        $('.chipStackBoard').css({
            position: "absolute",
        });
        $('#quantity').val($counter.toFixed(2));
    });

    $("#blueChip").click(function(){
        $('#blueChip').clone().appendTo('.chipStack').addClass("chip").css({
            'z-index' : zIndex++,
            'bottom' : height+=5
        });
        $counter += 0.50;
        $('#quantity').val($counter.toFixed(2));
    });

    $("#orangeChip").click(function(){
        $('#orangeChip').clone().appendTo('.chipStack').addClass("chip").css({
            'z-index' : zIndex++,
            'bottom' : height+=5
        });
        $counter += 0.10;
        $('#quantity').val($counter.toFixed(2));
    });

    $("#blackChip").click(function(){
        $('#blackChip').clone().appendTo('.chipStack').addClass("chip").css({
            'z-index' : zIndex++,
            'bottom' : height+=5
        });
        $counter += 1;
        $('#quantity').val($counter.toFixed(2));
    });

    $("#greenChip").click(function(){
        $('#greenChip').clone().appendTo('.chipStack').addClass("chip").css({
            'z-index' : zIndex++,
            'bottom' : height+=5
        });
        $counter += 0.20;
        $('#quantity').val($counter.toFixed(2));
    });
  
});
