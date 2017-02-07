$(document).ready(function (){
    let tPos = 100;
    let zIndex = 0;
    let height = 0;
    let randLeft = 0;
    let randBot = 0;
    let randomPos = 0;
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
        randomPos = Math.floor(Math.random()*30);
        randLeft = 45 - $(this).position().left + randomPos;
        randBot = -30 + parseInt($(this).css('marginTop')) + randomPos;
        $(this)
            .clone()
            .appendTo('.chipStack')
            .css('z-index', ++tPos).animate({
                left : randLeft,
                bottom : randBot
            }, 500);
    });

    $("#ten").click(function(){
        randomPos = Math.floor(Math.random()*45);
        randLeft = 92 - $(this).position().left + randomPos;
        randBot = -120 + parseInt($(this).css('marginTop')) + randomPos;
        $(this)
            .clone()
            .appendTo('.chipStack')
            .css('z-index', ++tPos).animate({
                left : randLeft,
                bottom : randBot
            }, 500);
    });

    $("#twenty").click(function(){
        randomPos = Math.floor(Math.random()*45);
        randLeft = 40 - $(this).position().left + randomPos;
        randBot = -200 + parseInt($(this).css('marginTop')) + randomPos
        $(this)
            .clone()
            .appendTo('.chipStack')
            .css('z-index', ++tPos).animate({
                left : randLeft,
                bottom : randBot
            }, 500);
    });

    $("#fifty").click(function(){
        randomPos = Math.floor(Math.random()*35);
        randLeft = 25 - $(this).position().left + randomPos;
        randBot = -250 + parseInt($(this).css('marginTop')) + randomPos
        $(this)
            .clone()
            .appendTo('.chipStack')
            .css('z-index', ++tPos).animate({
                left : randLeft,
                bottom : randBot
            }, 500);
    });

    $("#hundred").click(function(){
        randomPos = Math.floor(Math.random()*45);
        randLeft = 100 - $(this).position().left + randomPos;
        randBot = -350 + parseInt($(this).css('marginTop')) + randomPos
        $(this)
            .clone()
            .appendTo('.chipStack')
            .css('z-index', ++tPos).animate({
                left : randLeft,
                bottom : randBot
            }, 500);
    });
});
