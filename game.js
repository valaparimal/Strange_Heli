let helicopterDath = new Audio("throw-bomb.m4a");
let helicopterSound = new Audio("HelicopterSound.m4a");
let zombyDath =new Audio("zomby-dath.m4a");

let helicopter=document.createElement("div");
let bomb=document.createElement("div");
let zomby,bombthrowTime=0;
let previous="ArrowRight";
let gamebox=document.querySelector(".gamebox");
let temptime=0,moveTime=0,a=0,score=0,t1=2000,t2=500;
let f1=1,f2=1,f3=1,f4=1;
let b=0;
let helidath;
let helicopterRotate;
let direction = "right";


helicopter.setAttribute("class","helicopter");
helicopter.style.gridRowStart=1;
helicopter.style.gridColumnStart=1;
gamebox.append(helicopter);

let hiScore=window.localStorage.getItem("hiScore");

if(hiScore == null)
{
    window.localStorage.setItem("hiScore","0");
}

document.querySelector(".hi-score").innerText=`Hi Score : ${hiScore}`;


function createZomby(){
        zomby=document.createElement("div");
        zomby.setAttribute("class","zomby");
        zomby.style.gridRowStart = Math.floor(Math.random()*5)+10;
        zomby.style.gridColumnStart = Math.floor(Math.random()*5)+1;
        zomby.style.alignContent ="center";
        gamebox.append(zomby);
}


function zombyMove(){

    document.querySelectorAll(".zomby").forEach(async(e)=>{
        // remove out side box
        if(--e.style.gridRowStart == 0)
        {
           await gameOver(e);
           return;
        }
    });
}

function createbomb(){

    bomb=document.createElement("div");
    bomb.setAttribute("class","bomb");

    bomb.style.gridRowStart=helicopter.style.gridRowStart;
    bomb.style.gridColumnStart=helicopter.style.gridColumnStart;
    if(previous === "ArrowUp")
    {
        bomb.setAttribute("id","bombUp");
    }
    else if(previous === "ArrowDown")
    {
        bomb.setAttribute("id","bombDown");
    }
    else if(previous === "ArrowLeft")
    {
        bomb.setAttribute("id","bombLeft");
    }
    else if(previous === "ArrowRight")
    {
        bomb.setAttribute("id","bombRight");
    }

    gamebox.appendChild(bomb);

}

function bombMove(){


    // get point 

    document.querySelectorAll(".bomb").forEach((bomb)=>{
        document.querySelectorAll(".zomby").forEach((e)=>{
            if(e.style.gridRowStart == bomb.style.gridRowStart && e.style.gridColumnStart == bomb.style.gridColumnStart)
            {

                score++;
                document.querySelector(".score").innerText=`Score : ${score}`;

                // set audio 

                let tempDathAudio = zombyDath;
                tempDathAudio.muted=false;
                tempDathAudio.currentTime=1;
                tempDathAudio.play();
                tempDathAudio.volume=0.1;

                setTimeout(()=>{
                    tempDathAudio.muted=true;
                    tempDathAudio.pause();
                },2000);

                bomb.remove();
                e.setAttribute("class","temp");
                
                for(let i=19;i>=0;i--)
                {  b+=50;
                    setTimeout(()=>{
                        if(i%2==0)
                        {
                            e.style.backgroundColor="gold";
                        }
                        else{
                            e.style.backgroundColor="black";
                        }
                        e.style.width=`${i/4}rem`;
                        e.style.height=`${i/4}rem`;
                    },b);
                    
                }
    
                // e.style.backgroundImage='linear-gradient(to right,blue,lightgreen,lightblue,pink,red)';
                setTimeout(()=>{
                    e.remove();
                    b=0;
                },2000);
            }
        });
    });

}

function bombUpMove(){
    document.querySelectorAll("#bombUp").forEach((bomb)=>{
        bomb.style.width=bomb.offsetWidth-10+"px"; 
        if(--bomb.style.gridRowStart == 0)
        {
            bomb.remove();
        }
    });
}

function bombDownMove(){
    
    document.querySelectorAll("#bombDown").forEach((bomb)=>{
        bomb.style.width=bomb.offsetWidth-10+"px"; 
        if(++bomb.style.gridRowStart == 16)
        {
            bomb.remove();
        }
    });
}

function bombLeftMove(){
    document.querySelectorAll("#bombLeft").forEach((bomb)=>{
        bomb.style.height=bomb.offsetHeight-8+"px"; 
        if(--bomb.style.gridColumnStart == 0)
        {
            bomb.remove();
        }
    });
}

function bombRightMove(){
    document.querySelectorAll("#bombRight").forEach((bomb)=>{
        bomb.style.height=bomb.offsetHeight-8+"px"; 
        if(++bomb.style.gridColumnStart == 9)
        {
            bomb.remove();
        }
    });
}


function chackGameOver(){

    // game over 

    document.querySelectorAll(".zomby").forEach((e)=>{
        if(e.style.gridRowStart == helicopter.style.gridRowStart && e.style.gridColumnStart == helicopter.style.gridColumnStart)
        {
            gameOver(e);  
            return; 
        }
    });

}

function gameOver(e){
    helicopterDath.muted=false;
    helicopterDath.play();
    helicopterSound.pause();
    helidath=true;
    console.log("game Over");
    clearInterval(helicopterRotate);
    
    if(+hiScore < score)
    {
        window.localStorage.setItem("hiScore",`${score}`);
    }
    
    e.setAttribute("class","temp");

    b=0;
    for(let i=19;i>=0;i--)
    {  b+=50;
        setTimeout(()=>{

            if(i%2==0)
            {
                helicopter.style.backgroundColor="gold";
            }
            else{
                helicopter.style.backgroundColor="black";
            }
            e.style.width=`${i/4}rem`;
            e.style.height=`${i/4}rem`;
        },b);
        
    }

    // e.style.backgroundImage='linear-gradient(to right,blue,lightgreen,lightblue,pink,red)';
    setTimeout(()=>{
        document.querySelector(".helicopter").remove();
        document.querySelector(".before-gameOver-container").setAttribute("class","after-gameOver-container");
        removeEventListener("keydown",keydown);
        window.addEventListener("click",()=>{
            window.location.reload();
        });
        window.addEventListener("keypress",()=>{
            window.location.reload();
        });  
    },1200);
}




async function main(ctime){

    
    if(!helidath)
    {
        window.requestAnimationFrame(main);
    }


    if(ctime-bombthrowTime > 100)
    {
        bombUpMove();
        bombDownMove();
        bombLeftMove();
        bombRightMove();
        
        // document.querySelectorAll(".bomb").forEach((bomb)=>{
                
        // });

        bombthrowTime=ctime;
    }
    bombMove();

    // creat zomby 

   if(ctime-temptime>t1)
   {
        createZomby();

        temptime=ctime;
   }

   if(ctime-moveTime>t2)
   {
        await zombyMove();
        moveTime=ctime;
   }

   chackGameOver(); 
}


// add key event
let positionx =0;
let positiony =0;
let gameboxBGSize = getComputedStyle(gamebox).backgroundSize.split(" ");
let bgWidth = parseFloat(gameboxBGSize[0]);
let bgHeight = parseFloat(gameboxBGSize[1]);
let gameboxWidth=gamebox.clientWidth;
let gameboxHeight = gamebox.clientHeight;

let isCreatebomb = true;

function addKeyEvent()
{
    window.addEventListener("keydown",keydown);
}

function keydown(e){{

        if(e.key == "ArrowDown")
        {
            // helicopter.style.backgroundImage="url('helicopter-down.png')";
            direction = "down";
           if( helicopter.style.gridRowStart <10  && previous == "ArrowDown")
           {
                helicopter.style.gridRowStart++;
           }else if(positiony>(-gameboxHeight)){
                positiony-=10;
                gamebox.style.backgroundPosition=positionx+"px "+positiony+"px";
           }
           previous="ArrowDown";
        }
        else if(e.key == "ArrowUp")
        {
            // helicopter.style.backgroundImage="url('helicopter-up.png')";
            direction = "up";
            if(helicopter.style.gridRowStart>1  && previous == "ArrowUp")
            {
                helicopter.style.gridRowStart--;
            }else if(positiony<0){
                positiony+=10;
                gamebox.style.backgroundPosition=positionx+"px "+positiony+"px";
            }
            previous="ArrowUp";
        }
        else if(e.key == "ArrowLeft")
        {
            // helicopter.style.backgroundImage="url('helicopter-left.png')";
            direction = "left";
            if( helicopter.style.gridColumnStart >1 && previous == "ArrowLeft")
            {
                helicopter.style.gridColumnStart--;
            }else if(positionx<0){
                positionx+=10;
                gamebox.style.backgroundPosition=positionx+"px "+positiony+"px";
            }
            previous="ArrowLeft";
            
        }
        else if(e.key == "ArrowRight")
        {
            // helicopter.style.backgroundImage="url('helicopter-right.png')";
            direction = "right";
            if(helicopter.style.gridColumnStart <9  && previous == "ArrowRight")
            {
                helicopter.style.gridColumnStart++;
            }else if(positionx>(-gameboxWidth)){
                positionx-=10;
                gamebox.style.backgroundPosition=positionx+"px "+positiony+"px";
            }
            previous="ArrowRight";
        }
        else if(e.key=="p" || e.key=="P"){
            helicopterSound.muted= true;
            alert("game paused.....      Entere/Space key to paly");
            helicopterSound.muted=false;
        }
        if(e.key === " ")
        {
            if(isCreatebomb){
                setTimeout(()=>{
                    isCreatebomb = true;
                },500);
    
                isCreatebomb = false;
                helicopterDath.muted=false;
                    helicopterDath.play();
                    helicopterDath.volume=0.03;
                    setTimeout(()=>{
                        helicopterDath.muted=true;
                    },500);
                    createbomb();
            }
        }
    
        if(score==10 && f1)
        {
            t1-=100;
            f1=0;
        }
        else if(score==20 && f2)
        {
            t1-=50;
            t2-=100;
            f2=0;
        }
        else if(score==50 && f3)
        {
            t1-=50;
            f3=0;
        }
        else if(score==100 && f4){
            t1-=100;
            f4=0;
        }
    
    }
}



//game start

let playButton = document.querySelector("#playBtn");
playButton.focus();
playButton.addEventListener("click",()=>{
        hideElement();
        document.querySelector(".playBtn-container").remove();
        helicopterSound.play();
        helicopterSound.volume=0.05;
        helicopterSound.loop=true;





        helicopterRotate = setInterval(()=>{
            helicopter.style.backgroundImage = "url('helicopter-"+direction+".png')";
            setTimeout(()=>{
                helicopter.style.backgroundImage="url('helicopter-"+direction+"-new.png')";
            },100);
        },200);




        window.requestAnimationFrame(main);
        addKeyEvent();
});




// help

document.querySelector("#help").addEventListener("click",()=>{
    alert(
        "Controls:\n" +
        "🚁 Move Up: Up Arrow (↑)\n" +
        "🚁 Move Down: Down Arrow (↓)\n" +
        "🚁 Move Left: Left Arrow (←)\n" +
        "🚁 Move Right: Right Arrow (→)\n" +
        "⏸️ Pause Game: P or p"
      );
});

document.querySelector("#reset-hiscore").addEventListener("click",()=>{
    if(prompt("If you want to reset hi score then write something hear and click on OK   (*  else click on Cencel )"))
    {
        window.localStorage.setItem("hiScore","0");
        window.location.reload();
    }
});




function hideElement(){
    document.querySelector("#gameTitle").style.display="none";
    document.querySelector("#help").style.display="none";
    document.querySelector("#score").style.opacity=0.7;
    document.querySelector("#hiScore").style.display="none";
    document.querySelector("#reset-hiscore").style.display="none";
    document.querySelector("#discreaptionContainer").style.display="none";
    document.querySelector("#background-img").style.display="none";
    document.querySelector("#zomby-img").style.display="none";
    document.querySelector("#bomb-img").style.display="none";
    document.querySelector("#play-more").style.display="none";
    document.querySelector(".gamebox-container").style.margin=0+"px";

    gamebox.style.width=100+"vw";
    gamebox.style.height=100+"vh";
    gamebox.style.borderRadius=0+"%";
}



function setBackground_1(){
    gamebox.style.backgroundImage="url('opacity-changed-backroadTopVeiw.jpg')";
}

function setBackground_2(count){
    console.log(count);
    if(count == 2){
        gamebox.style.backgroundImage="url('background_2.jpg')";
    }else if(count == 3){
        gamebox.style.backgroundImage="url('background_3.jpg')";
    }else{
        gamebox.style.backgroundImage="none";
    }
}