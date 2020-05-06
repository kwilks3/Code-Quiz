//create timer that starts on click of start button
var timeEl = document.querySelector("#time");
var start = document.querySelector("#generate");
var secondsLeft = 75;
//array of test questions
var testBank = [
  {
    question: "What is the HTML tag under which one can write JavaScript code?",
    answers: {
      a: "<javascript>",
      b: "<scripted>",
      c: "<script>",
      d: "<js>",
    },
    correctAnswer: "c",
  },
  {
    question:
      "Which of the following is the correct syntax to display “I am the GOAT” in an alert box using JavaScript?",
    answers: {
      a: "alertbox(“I am the GOAT”);",
      b: "msg(“I am the GOAT”);",
      c: "msgbox(“I am the GOAT”);",
      d: "alert(“I am the GOAT”)",
    },
    correctAnswer: "d",
  },
  {
    question:
      "What is the correct syntax for referring to an external script called “geek.js”",
    answers: {
      a: "<script src=”geek.js”>;",
      b: "<script href=”geek.js”>",
      c: "<script ref=”geek.js”>",
      d: "<script name=”geek.js”>",
    },
    correctAnswer: "a",
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
}
//output first question on start button click
//create loop for answering questions and outputting new questions
// display whether answer is correct or incorrect for two seconds
// if answer is incorrect subtract 5 seconds from timer
//when all questions are answered or timer is 0 end quiz
// ask for initials
// display scoreboard with initials and scores

start.addEventListener("click", timer);
