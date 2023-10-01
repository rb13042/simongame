// prompt("checked");
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var audio;
var level = 0;
var count = 0;

//function to play the sound
function playsound(name)
{
    audio = new Audio("./sounds/"+name+".mp3");
    console.log("./sounds/"+name+".mp3");
    audio.play();

}

//function to check the answer USER CLICKED PATTERN
function checkAnswer(){

    var flag = 0;
    var i;
    
    for(i = 0 ; i < userClickedPattern.length ; i++)
    {
        console.log(userClickedPattern.length)
        console.log(gamePattern.length)
        console.log(userClickedPattern[i])
        console.log(gamePattern[i])
        if(userClickedPattern[i] != gamePattern[i])
        {
            flag = -1;// failure
            break;
        }
    }
    if(flag == 0)//success
    {   //flushing the userclicked pattern
        console.log("userclicked pattern flushed");
        userClickedPattern=[];
        console.log(userClickedPattern.length);
        console.log(userClickedPattern);
        
        //playing the next level again after 1 sec
        setTimeout(function(){
           //  clearInterval(tid); // to  clear the previous set interval
             nextSequence();
        },2000)
    }
    else if (flag == -1) // failure
     { 
        gamePattern = []; //flushing game pattern ;
        userClickedPattern=[]; // flushing the user clicked pattern
        level=0;//reset the level

        //sound and background prompt
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },500);

        //to change the h1 
        $("h1").text("Game Over , Press Any Key To Start")

        count = 0 ; // coount is reset

     }
    

}





    //to check which button is clicked(adding event listener only once)
    $(".btn").click(function(e){

        //to store the id of the button u hv clicked
        var userChosenColour = $(this).attr("id");

        //to play the sound of the button you have clicked
        playsound(userChosenColour);
        
        //to add animation once clicked 
        $(this).addClass("pressed")
        setTimeout(function(){
            // console.log("i am in set timeout");
            // console.log(this); // this is windows object in scope of this settimeoout body
            $("#"+userChosenColour).removeClass("pressed");
        },100);

        //to store the user clicked pattern 
        console.log("in call back");
        console.log("before clicking");
        console.log(userClickedPattern);
        userClickedPattern.push(userChosenColour);
        console.log("after clicking")
        console.log(userClickedPattern);


        // to check only after the whole user pattern is clicked 
        if(userClickedPattern.length == gamePattern.length)
        {
            // to check if the user clicked pattern is right or wrong 
            checkAnswer();
        }
        
    })


function nextSequence()
{
    console.log("in next sequence")
    console.log(userClickedPattern.length);
    level = level+1;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*(4-0)+0);
    var randomChosenColor = buttonColours[randomNumber];
    // console.log(randomChosenColor);
    gamePattern.push(randomChosenColor);
    // console.log(gamePattern);
    // console.log($("#"+randomChosenColor))
    // console.log($("#"+randomChosenColor).height());


    //this will play the sound along with the flash and stop it after 1sec
     var tid = setInterval(function(){
         $("#"+randomChosenColor).animate({opacity:0.2});
         playsound(randomChosenColor);
        $("#"+randomChosenColor).animate({opacity:1});
     },800);

     setTimeout(function(){
        clearTimeout(tid);
     },1000);

}

//to start the game
var start = ()=>{
    count++;
    // to call the nextsequence only when the key is pressed first time
    if(count == 1)
    {
        nextSequence();
    }
}

$(document).keypress(start);