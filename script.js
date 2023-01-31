
let rollingSound = new Audio('rolling-dice-2-102706.mp3')
document.getElementById("dice").addEventListener("click",function(){
    rollingSound.play();
    randomno= Math.floor(Math.random()*2);
    console.log(randomno);
    document.getElementById("value").innerText=randomno;
    if(randomno==1)
    //var s=document.querySelector('#score').innerText;
    // console.log(`hi ${s}`)
   // localStorage.setItem('mostRecentScore',s)
      window.location.assign('puzzle.html')
    

})
document.querySelector('#score').innerText=localStorage.getItem('mostRecentScore');
