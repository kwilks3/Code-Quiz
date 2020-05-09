//create timer that starts on click of start button

//create variables and new elements
var timeEl = document.querySelector("#time");
var start = document.querySelector("#generate");
var quesEl = document.querySelector("#questionOutput");
var ansEl = document.querySelector("#ansClick");
var optionA = document.createElement("button");
var optionB = document.createElement("button");
var optionC = document.createElement("button");
var optionD = document.createElement("button");
var secondsLeft = 75;
var score = 0;
var userAnswer;
var isCorrect = document.createElement("div");
optionA.setAttribute("class", "btn btn-primary");
optionB.setAttribute("class", "btn btn-primary");
optionC.setAttribute("class", "btn btn-primary");
optionD.setAttribute("class", "btn btn-primary");
var openQuestion = 0;
var i;
//array of test questions
var testBank = [
  {
    question: "What is the HTML tag under which one can write JavaScript code?",
    answers: ["<javascript>", "<scripted>", "<script>", "<js>"],
    correctAnswer: "<script>",
  },
  {
    question:
      "Which of the following is the correct syntax to display “I am the GOAT” in an alert box using JavaScript?",
    answers: [
      "alertbox(“I am the GOAT”);",
      "msg(“I am the GOAT”);",
      "msgbox(“I am the GOAT”);",
      "alert(“I am the GOAT”)",
    ],
    correctAnswer: "alert(“I am the GOAT”)",
  },
  {
    question:
      "What is the correct syntax for referring to an external script called “geek.js”",
    answers: [
      "<script src=”geek.js”>;",
      "<script href=”geek.js”>",
      "<script ref=”geek.js”>",
      "<script name=”geek.js”>",
    ],
    correctAnswer: "<script src=”geek.js”>;",
  },
];
function timer() {
  var timerInterval = setInterval(function () {
    secondsLeft = secondsLeft - 1;
    timeEl.textContent = `Time Remaining: ${secondsLeft}`;
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
  askQuestions();
}
function askQuestions() {
  for (i = 0; i < testBank.length; i = i + 1) {
    quesEl.textContent = testBank[i].question;
    optionA.value = testBank[i].answers.a;
    optionB.textContent = testBank[i].answers.b;
    optionC.textContent = testBank[i].answers.c;
    optionD.textContent = testBank[i].answers.d;
    document.body.children[1].children[0].children[1].children[1].replaceWith(
      optionA
    );
    document.body.children[1].children[0].children[1].appendChild(optionB);
    document.body.children[1].children[0].children[1].appendChild(optionC);
    document.body.children[1].children[0].children[1].appendChild(optionD);

    ansEl.addEventListener("click", correct);
  }
}

function correct(event) {
  console.log(event);

  // if (testBank[openQuestion].correctAnswer === event.target.value) {
  //   score++;
  //   isCorrect.textContent = "Correct!";
  //   document.body.appendChild(isCorrect);
  // } else {
  //   isCorrect.textContent = "Wrong!";
  //   document.body.appendChild(isCorrect);
  // }
}
//output first question on start button click
//create loop for answering questions and outputting new questions
// display whether answer is correct or incorrect for two seconds
// if answer is incorrect subtract 5 seconds from timer
//when all questions are answered or timer is 0 end quiz
// ask for initials
// display scoreboard with initials and scores

start.addEventListener("click", timer);
