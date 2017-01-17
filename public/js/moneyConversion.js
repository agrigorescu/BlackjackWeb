$(document).ready(function (){
    let betAmount = 0;
    $counter = 0;

    $("#redChip").click(function(){
        $('#redChip').clone().appendTo('.chipStack');
        $counter += 0.05;
        $('#quantity').val($counter.toFixed(2));
    });

    $("#blueChip").click(function(){
        $('#blueChip').clone().appendTo('.chipStack');
        $counter += 0.50;
        $('#quantity').val($counter.toFixed(2));
    });

    $("#orangeChip").click(function(){
        $('#orangeChip').clone().appendTo('.chipStack');
        $counter += 0.10;
        $('#quantity').val($counter.toFixed(2));
    });

    $("#blackChip").click(function(){
        $('#blackChip').clone().appendTo('.chipStack');
        $counter += 1;
        $('#quantity').val($counter.toFixed(2));
    });

    $("#greenChip").click(function(){
        $('#greenChip').clone().appendTo('.chipStack');
        $counter += 0.20;
        $('#quantity').val($counter.toFixed(2));
    });
  
});
