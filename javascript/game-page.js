const button = document.querySelector(".question__button");
const answer = document.querySelector(".main__answer-box");

const answerA = document.querySelector(".main__answer-1");
const answerB = document.querySelector(".main__answer-2");
const answerC = document.querySelector(".main__answer-3");
const answerD = document.querySelector(".main__answer-4");

const arrAnswer = [answerA, answerB, answerC, answerD];


button.addEventListener("click", function(e) {
    // e.preventDefault();
    const displayQuestion = async () => {
        try {
            const response = await axios.get("http://jservice.io/api/clues");
            let randomIndex = Math.floor(Math.random()*100);
            let answerIndex = Math.floor(Math.random()*4);
            document.querySelector(".main__question").textContent = response.data[randomIndex].question;
            // answer section
            arrAnswer[answerIndex].textContent = response.data[randomIndex].answer;
            // console.log(arrAnswer[answerIndex].textContent);
            for (let i = 0; i < 4; i++) {
                if (i !== answerIndex) {
                    arrAnswer[i].textContent = response.data[Math.floor(Math.random()*100)].answer;
                    console.log(arrAnswer[i]);
                }
                else {
                    // do nothing
                }
            }
            // answer section
            answer.addEventListener("click", function(event) {
            // event.preventDefault();
                if (event.target.textContent === arrAnswer[answerIndex].textContent) {
                    event.target.textContent = "Correct!";
                }
                else {
                    event.target.textContent = "Wrong! Try again!";
                }
            });
        } catch(e) {
            console.log(e);
        }
    }
    displayQuestion();
});