const button = document.querySelector(".question__button");
const answer = document.querySelector(".main__answer-box");
const answerA = document.querySelector(".main__answer-1");
const answerB = document.querySelector(".main__answer-2");
const answerC = document.querySelector(".main__answer-3");
const answerD = document.querySelector(".main__answer-4");
const arrAnswer = [answerA, answerB, answerC, answerD];
let response = null;


const displayQuestion = async () => {
    try {
        response = await axios.get("http://jservice.io/api/clues");
        let randomIndex = Math.floor(Math.random()*100);
        let answerIndex = Math.floor(Math.random()*4);
        resetQuestion();
        function resetQuestion () {
            randomIndex = Math.floor(Math.random()*100);
            answerIndex = Math.floor(Math.random()*4);
            document.querySelector(".main__question").textContent = response.data[randomIndex].question;
            arrAnswer[answerIndex].textContent = response.data[randomIndex].answer;
            for (let i = 0; i < 4; i++) {
                if (i !== answerIndex) {   
                    arrAnswer[i].textContent = response.data[Math.floor(Math.random()*100)].answer;               
                }
            }
        }

        button.addEventListener("click", event => {resetQuestion()});
        arrAnswer.forEach ((e) => {
            e.addEventListener("click", event => {
                event.preventDefault();
                if (event.target.textContent === arrAnswer[answerIndex].textContent) {
                    event.target.textContent = "Correct!";
                    button.addEventListener("click", event => {resetQuestion()});
                } else {
                    event.target.textContent = "Wrong! Try again!";
                }
            });
        });
        
    } catch(e) {
        console.log(e);
    }
};

displayQuestion();