//on clicking start/reset button
    //if already playing, i.e. reset
        //reload page
    //if not playing
        //start game
        //set score to 0
        //give a question and 4 options
        //show the time remaining box and start reducing the time be 1 sec
            //check time left after every second
                //time left - continue
                //time not left - game over displayed
            //on clicking on options
                //if we are playing
                    //check for correct answer
                        //correct
                            //increase score
                            //give new QnA
                            //reset timer
                        //wrong
                            //reduce 1 life
                            //life == 0
                                //game over
                            //else
                                //show try again

var play = false;
var score = 0, lives = 3;
var tr;
var mytimer;
var qna, corpos, wqna, ansset;

document.getElementById("start").onclick = function(){
    if(play == true){
        location.reload();
        //command to reload a webpage
    }
    else
    {
        getqna();
        score = 0;
        lives = 3
       play = true;
        hidebox("end");
        hidebox("head");
        hidebox("rules");
        showbox("gamescreen", "flex");
        showbox("score", "block");
        showbox("options", "flex");
        showbox("lives", "block");
        for(i = 1; i <= 3; i++){
            showbox("i"+i, "inline");
        }
//        hidebox("intro");
        document.getElementById("intro").innerHTML = "Choose the Correct Option."
        document.getElementById("scoreline").innerHTML = score;
        document.getElementById("timer").style.display = "block";
        
        document.getElementById("start").innerHTML = "Reset Game";
        
        tr = 15;
        starttimer();
    }
}

function starttimer(){
    mytimer = setInterval(function(){
            tr--;
            if(tr == 0)
            {
                document.getElementById("end").innerHTML = "Time is Up.<br>Game Over!<br>Your Score is " + score + ".";
                document.getElementById("timerem").innerHTML = tr + " sec";
                gameover();
            }
            document.getElementById("timerem").innerHTML = tr + " sec";
        }, 1000);
}

function gameover(){
    
    showbox("end", "block");
    hidebox("wrong");
    hidebox("correct");
    play = false;
    document.getElementById("start").innerHTML = "Start Game";
    clearInterval(mytimer);
    
}

function getqna(){
    
    qna = getans();
    corpos = 1 + Math.round(3 * Math.random());
    document.getElementById("gamescreen").innerHTML = qna[0];
    document.getElementById("opt"+corpos).innerHTML = qna[1];
    ansset = [qna[1]];
    
    //filling the other options
    for(i = 1; i <= 4; i++){
        if(i != corpos){
            do{
                wqna = getans();
            }while(ansset.indexOf(wqna[1]) > -1);
            ansset.push(wqna[1]);
            document.getElementById("opt"+i).innerHTML = wqna[1];
        }
    }
}

function getans(){
    var x = 1 + Math.round(98 * Math.random());
    var y = 1 + Math.round(98 * Math.random());
    var oprt = Math.round(4 * Math.random())
    var expr;
    var ans;
    switch(oprt){
        case 0: expr = x + '+' + y;
                ans = x + y;
                break;
            
        case 1: expr = x + '-' + y;
                ans = x - y;
                break;
            
        case 2: expr = x + 'x' + y;
                ans = x * y;
                break;
            
        case 3: expr = x + '/' + y;
                ans = Math.floor(x / y);
                break;
            
        case 4: expr = x + '%' + y;
                ans = x % y;
                break;
    }
    var arr = [expr, ans];
    return arr;
}


for(i = 1; i <= 4; i++){
    document.getElementById("opt"+i).onclick = 
        function(){
        if(play == true){
            if(this.innerHTML == qna[1]){
                //correct answer
                score++;
                document.getElementById("scoreline").innerHTML = score;
                hidebox("wrong");
                showbox("correct", "block");
                setTimeout(function(){
                hidebox("correct");
                }, 500);
                
                
                //generating new questions
                getqna();
                if(score < 5)
                    tr = 15;
                else if(score < 10)
                    tr = 10;
                else if(score < 25)
                    tr = 7;
                else
                    tr = 4;
            }
            else{
                //wrong answer
                hidebox("correct");
                showbox("wrong", "block");
                setTimeout(function(){
                    hidebox("wrong");
                }, 650);
                hidebox("i"+lives);
                lives--;
                if(lives == 0){
                    document.getElementById("end").innerHTML = "No More Tries left.<br>Game Over!<br>Your Score is " + score + ".";
                    gameover();
                }
            }
        }
        else{
            
        }
    }
}

function showbox(id1, displaytype){
    document.getElementById(id1).style.display = displaytype;
}

function hidebox(id1){
    document.getElementById(id1).style.display = "none";
}
