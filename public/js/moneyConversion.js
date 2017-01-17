$(document).ready(function (){
<<<<<<< HEAD
    let zIndex = 0;
    let height = 0;
    $counter = 0;

    $("#redChip").click(function(){
        $('#redChip').clone().appendTo('.chipStack').addClass("chip").css({
            'z-index' : zIndex++,
            'bottom' : height-=5
        });
=======
    let betAmount = 0;
    $counter = 0;

    $("#redChip").click(function(){
<<<<<<< HEAD
        $('#redChip').clone().appendTo('.chipStack');
>>>>>>> Clicking the chips add to a total bet
=======
        $('#redChip').clone().appendTo('.chipStack').addClass("chip");
>>>>>>> Clicking a chip stacks the chips together
        $counter += 0.05;
        $('#quantity').val($counter.toFixed(2));
    });

    $("#blueChip").click(function(){
<<<<<<< HEAD
<<<<<<< HEAD
        $('#blueChip').clone().appendTo('.chipStack').addClass("chip").css({
            'z-index' : zIndex++,
            'bottom' : height+=5
        });
=======
        $('#blueChip').clone().appendTo('.chipStack');
>>>>>>> Clicking the chips add to a total bet
=======
        $('#blueChip').clone().appendTo('.chipStack').addClass("chip");
>>>>>>> Clicking a chip stacks the chips together
        $counter += 0.50;
        $('#quantity').val($counter.toFixed(2));
    });

    $("#orangeChip").click(function(){
<<<<<<< HEAD
<<<<<<< HEAD
        $('#orangeChip').clone().appendTo('.chipStack').addClass("chip").css({
            'z-index' : zIndex++,
            'bottom' : height+=5
        });
=======
        $('#orangeChip').clone().appendTo('.chipStack');
>>>>>>> Clicking the chips add to a total bet
=======
        $('#orangeChip').clone().appendTo('.chipStack').addClass("chip");
>>>>>>> Clicking a chip stacks the chips together
        $counter += 0.10;
        $('#quantity').val($counter.toFixed(2));
    });

    $("#blackChip").click(function(){
<<<<<<< HEAD
<<<<<<< HEAD
        $('#blackChip').clone().appendTo('.chipStack').addClass("chip").css({
            'z-index' : zIndex++,
            'bottom' : height+=5
        });
=======
        $('#blackChip').clone().appendTo('.chipStack');
>>>>>>> Clicking the chips add to a total bet
=======
        $('#blackChip').clone().appendTo('.chipStack').addClass("chip");
>>>>>>> Clicking a chip stacks the chips together
        $counter += 1;
        $('#quantity').val($counter.toFixed(2));
    });

    $("#greenChip").click(function(){
<<<<<<< HEAD
<<<<<<< HEAD
        $('#greenChip').clone().appendTo('.chipStack').addClass("chip").css({
            'z-index' : zIndex++,
            'bottom' : height+=5
        });
=======
        $('#greenChip').clone().appendTo('.chipStack');
>>>>>>> Clicking the chips add to a total bet
=======
        $('#greenChip').clone().appendTo('.chipStack').addClass("chip");
>>>>>>> Clicking a chip stacks the chips together
        $counter += 0.20;
        $('#quantity').val($counter.toFixed(2));
    });
  
});
