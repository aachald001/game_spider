//let rollingSound = new Audio('rolling-dice-2-102706.mp3')

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progresstext= document.querySelector('#progresstext');
const scoretext = document.querySelector('#score');

let currentques ={};
let acceptingAns =true;
let score;
let questioncounter=parseInt(localStorage.getItem('counter'));
let availableques= [];

// 
let questions=JSON.parse(localStorage.getItem('QuestionSet'));
const scorepoints=20;
const maxquestions=5;
startgame = () => {

   // var questioncounter = 0;
   //parseInt(localStorage.mostRecentScore);
    score = parseInt(localStorage.getItem('mostRecentScore'))
    localStorage.removeItem('mostRecentScore');
    availableques = [...questions];/*spread operator basically getting all of these question values here*/ 
    getnewquestion();
}

getnewquestion = () => {
   // if(availableques.length == 0 || questioncounter > maxquestions ) {
   //  localStorage.setItem('mostRecentScore',score)
   //  return window.location.assign('end.html')
   // }
 
    
//    window.location.assign('puzzle.html')


   questioncounter++
   localStorage.setItem('counter',questioncounter);
   progresstext.innerText=`Question ${questioncounter} of ${maxquestions}`
   const questionsIndex =Math.floor(Math.random()*availableques.length)
   currentques=availableques[questionsIndex]
   question.innerText = currentques.question

   choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentques['choice' + number]
   })

   questions.splice(questionsIndex,1)
   localStorage.setItem('QuestionSet',JSON.stringify(questions))
   acceptingAns = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAns) 
        return 

        acceptingAns = false;
        const selectedchoice =e.target
        const selectedanswer = selectedchoice.dataset['number']

        let classtoapply= selectedanswer == currentques.answer ? 'correct' : 'incorrect'
        
        if(classtoapply === 'correct') {
         incrementScore(scorepoints)
         localStorage.setItem('mostRecentScore',score);
        }
      //   else {
      //    console.log(classtoapply)
      //    localStorage.setItem('mostRecentScore',score)
      //   // window.location.assign('gameover.html')
      //   }
      

        selectedchoice.parentElement.classList.add(classtoapply)

        setTimeout(() =>{
            selectedchoice.parentElement.classList.remove(classtoapply)
            localStorage.setItem('mostRecentScore',score);
            if(availableques.length == 0 || questioncounter >= maxquestions ) {
                localStorage.setItem('mostRecentScore',score)
                 return window.location.assign('end.html')
                }

            if(classtoapply=== 'correct')
            window.location.assign('index.html');
            else
            window.location.assign('gameover.html');
            
            //  getnewquestion();
        },1000)
    })
})

incrementScore = num =>{
    score+=num;
    console.log(score)
    scoretext.innerText = score;
}
// if(questioncounter<6)
startgame()