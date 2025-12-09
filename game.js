let backImageCount = 1;


let gamebox=document.querySelector(".gamebox");


let hiScore=window.localStorage.getItem("hiScore");

if(hiScore == null)
{
    window.localStorage.setItem("hiScore","0");
}

document.querySelector(".hi-score").innerText=`Hi Score : ${hiScore}`;


//game start

let playButton = document.querySelector("#playBtn");
playButton.focus();
playButton.addEventListener("click",()=>{
    window.location = "./play.html?count="+backImageCount;
    
    

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


function setBackground_2(count){
    console.log(count);
    backImageCount = count;
    if(count == 1){
        gamebox.style.backgroundImage="url('opacity-changed-backroadTopVeiw.jpg')";
    }
    else if(count == 2){
        gamebox.style.backgroundImage="url('background_2.jpg')";
    }else if(count == 3){
        gamebox.style.backgroundImage="url('background_3.jpg')";
    }else{
        gamebox.style.backgroundImage="none";
    }
}


//menu or more
let details = document.getElementById("more-details");
let overlay = document.querySelector(".overlay");
document.getElementById("more-symbole").addEventListener("click",()=>{
    details.classList.add("show");
    overlay.classList.add("show");
});

overlay.addEventListener("click",()=>{
    details.classList.remove("show");
    overlay.classList.remove("show");
})
