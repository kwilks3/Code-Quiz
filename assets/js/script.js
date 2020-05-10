//create timer that starts on click of start button

//create variables and new elements
var timeEl = document.querySelector("#time");
var start = document.querySelector("#generate");
var quesEl = document.querySelector("#questionOutput");
var ansEl = document.querySelector("#ansClick");
var headEl = document.querySelector("#cardHead");
var secondsLeft = 15;
var score = 0;
var userInitials = document.createElement("input");
var isCorrect = document.createElement("div");
var submitInitials = document.createElement("button");
var savedScores = [];
var savedInitials = [];
var board;
isCorrect.setAttribute(
  "style",
  "display:flex; justify-content: center; font-weight: bold;"
);

var openQuestion = 0;

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
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
  askQuestions();
}
function askQuestions() {
  start.setAttribute("class", "hide");
  ansEl.innerHTML = "";
  if (openQuestion === testBank.length) {
    endQuiz();
  } else {
    for (var i = 0; i < testBank[openQuestion].answers.length; i++) {
      quesEl.textContent = testBank[openQuestion].question;
      var options = document.createElement("button");
      options.value = testBank[openQuestion].answers[i];
      options.textContent = testBank[openQuestion].answers[i];
      options.setAttribute("class", "btn btn-primary");
      ansEl.appendChild(options);

      options.addEventListener("click", correct);
    }
  }
}

function correct(event) {
  if (testBank[openQuestion].correctAnswer === event.target.value) {
    score++;
    isCorrect.textContent = "Correct!";
  } else {
    isCorrect.textContent = "Wrong! (-5 seconds)";
    secondsLeft = secondsLeft - 5;
  }

  setTimeout(function () {
    isCorrect.textContent = "";
  }, 1000);
  document.body.appendChild(isCorrect);
  openQuestion++;
  askQuestions();
}

function endQuiz() {
  timeEl.textContent = "";
  ansEl.setAttribute("class", "hide");
  quesEl.textContent = `Thank you for participating. Your score is ${score}. Input your initials: `;
  submitInitials.textContent = "Submit";
  quesEl.appendChild(userInitials);
  quesEl.appendChild(submitInitials);

  submitInitials.addEventListener("click", function () {
    if (userInitials.value) {
      scoreboard();
    } else {
      alert("Please input initials.");
    }
  });
}

function scoreboard() {
  headEl.textContent = "Scoreboard";
  savedScores.push(score);
  savedInitials.push(userInitials.value);
  quesEl.textContent = "Top Scores:";
  userInitials.setAttribute("class", "hide");
  submitInitials.setAttribute("class", "hide");
  localStorage.setItem("savedScores", savedScores);
  localStorage.setItem("savedInitials", savedInitials);
  board = document.createElement("ol");
  ansEl.appendChild(board);
  for (var i = 0; i < savedInitials.length; i++) {
    event.preventDefault();

    ansEl.setAttribute("class", "");
    var scorelist = [`${savedInitials[i]}: ${savedScores[i]}`];
    var li = document.createElement("li");
    li.textContent = scorelist;
    board.appendChild(li);
  }
}

//output first question on start button click
//create loop for answering questions and outputting new questions
// display whether answer is correct or incorrect for two seconds
// if answer is incorrect subtract 5 seconds from timer
//when all questions are answered or timer is 0 end quiz
// ask for initials
// display scoreboard with initials and scores

start.addEventListener("click", timer);
