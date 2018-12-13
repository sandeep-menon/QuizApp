/*document.onreadystatechange = function (){
    var state = document.readyState;
    if(state != "complete"){
        $("#loader").show();
    }
    else if(state == "complete"){
        setTimeout(function(){
            $("#loader").hide();
        },1000);
    }
}*/



function Init(){
    /*
        Adjusting "#main" div depending on screen real-estate
    */
    h = screen.availHeight;
    w = screen.availWidth;
    $("#main").attr("style", "height:"+h/1.5+"px; width:"+w/1.5+"px;");

    $(document).ajaxSend(function(event, jqXHR, settings){
        $("#loader").show();
    });
    
    $(document).ajaxComplete(function(event, jqXHR, settings){
        $("#loader").hide();
    });
    $("#loader").hide();
    $("#options").hide();
    $("#dialog").dialog({
        autoOpen: false,
        modal: true,
        dialogClass: "no-close"
    });
}

function start(){
    if($(".button").html() != "Play Again"){
        callOpenTDB();  
    }
    else{
        resetData();
        callOpenTDB();  
    }
}

function callOpenTDB(){
    $.get("https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple").done(function(){
        console.log(arguments);
        resp = arguments;
        cat = resp[0].results[0].category;
        ques = resp[0].results[0].question;
        $("#category").html("<strong>Category:</strong> "+ cat);
        $("#question").html("<strong>"+ques+"</strong");
        corr = randomizeCorrectOption();
        ans = resp[0].results[0].correct_answer;
        $("#opt_"+corr).html(ans);
        options = $(".options");
        for(var i=0, j=0; i<options.length; i++){
            if(options[i].innerHTML == ""){
                options[i].innerHTML = resp[0].results[0].incorrect_answers[j];
                j += 1;
            }
            else{
                //do nothing
            }
        }
        $("#options").show();
        checkAnswer(ans);
        $(".button").html('Play Again');
    });
}

function randomizeCorrectOption(){
    return Math.floor(Math.random() * 4) + 1;
}

function checkAnswer(ans){
    $(".options").on('click', function(){
        if(ans == $(this).html()){
            jQDialog('Congratulations', 'Correct answer!');
        }
        else{
            jQDialog('Oops', 'Incorrect answer, the correct answer is ' + ans);
        }
    });
}

function jQDialog(greet, text){
    $("#dialog").dialog({
        title: greet,
        buttons: [
            {
                text: "OK",
                click: function(){
                    $(this).dialog("close");
                }
            }
        ]
    });
    $("#dialog").text(text);
    $("#dialog").dialog("open");
}

function resetData(){
    $("#category").html('');
    $("#question").html('');
    $("#opt_1").html('');
    $("#opt_2").html('');
    $("#opt_3").html('');
    $("#opt_4").html('');
    $("#options").hide();
}