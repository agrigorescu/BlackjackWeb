$(document).ready(function (){
<<<<<<< HEAD
    let zIndex = 0;
    let height = 0;
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
            'bottom' : height-=5
        });
=======
    let betAmount = 0;
    $counter = 0;

    $("#redChip").click(function(){
        $('#redChip').clone().appendTo('.chipStack');
>>>>>>> Clicking the chips add to a total bet
        $counter += 0.05;
        $('.chipStackBoard').css({
            position: "absolute",
        });
        $('#quantity').val($counter.toFixed(2));
    });

    $("#blueChip").click(function(){
<<<<<<< HEAD
        $('#blueChip').clone().appendTo('.chipStack').addClass("chip").css({
            'z-index' : zIndex++,
            'bottom' : height+=5
        });
=======
        $('#blueChip').clone().appendTo('.chipStack');
>>>>>>> Clicking the chips add to a total bet
        $counter += 0.50;
        $('#quantity').val($counter.toFixed(2));
    });

    $("#orangeChip").click(function(){
<<<<<<< HEAD
        $('#orangeChip').clone().appendTo('.chipStack').addClass("chip").css({
            'z-index' : zIndex++,
            'bottom' : height+=5
        });
=======
        $('#orangeChip').clone().appendTo('.chipStack');
>>>>>>> Clicking the chips add to a total bet
        $counter += 0.10;
        $('#quantity').val($counter.toFixed(2));
    });

    $("#blackChip").click(function(){
<<<<<<< HEAD
        $('#blackChip').clone().appendTo('.chipStack').addClass("chip").css({
            'z-index' : zIndex++,
            'bottom' : height+=5
        });
=======
        $('#blackChip').clone().appendTo('.chipStack');
>>>>>>> Clicking the chips add to a total bet
        $counter += 1;
        $('#quantity').val($counter.toFixed(2));
    });

    $("#greenChip").click(function(){
<<<<<<< HEAD
        $('#greenChip').clone().appendTo('.chipStack').addClass("chip").css({
            'z-index' : zIndex++,
            'bottom' : height+=5
        });
=======
        $('#greenChip').clone().appendTo('.chipStack');
>>>>>>> Clicking the chips add to a total bet
        $counter += 0.20;
        $('#quantity').val($counter.toFixed(2));
    });
  
});
