//create timer that starts on click of start button

//create variables and new elements
var timeEl = document.querySelector("#time");
var start = document.querySelector("#generate");
var quesEl = document.querySelector("#questionOutput");
var ansEl = document.querySelector("#ansClick");
var headEl = document.querySelector("#cardHead");
var boardEl = document.querySelector("#leaderboard");
var secondsLeft = 15;
var score = 0;
var userInitials = document.createElement("input");
var isCorrect = document.createElement("div");
var submitInitials = document.createElement("button");

var combo = [];
var board;
var openQuestion = 0;
var test;
isCorrect.setAttribute(
  "style",
  "display:flex; justify-content: center; font-weight: bold;"
);

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

start.addEventListener("click", timer);
boardEl.addEventListener("click", scoreboard);

function timer() {
  var timerInterval = setInterval(function () {
    secondsLeft = secondsLeft - 1;
    timeEl.textContent = `Time Remaining: ${secondsLeft}`;
    if (secondsLeft <= 0 || openQuestion === testBank.length) {
      clearInterval(timerInterval);
      timeEl.textContent = "";
      endQuiz();
    }
  }, 1000);
  askQuestions();
}
function askQuestions() {
  start.setAttribute("class", "hide");
  ansEl.innerHTML = "";
  boardEl.setAttribute("class", "hide");
  if (openQuestion === testBank) {
    endQuiz();
  } else {
    for (var i = 0; i < 4; i++) {
      quesEl.textContent = testBank[openQuestion].question;
      var options = document.createElement("button");
      var lineItem = document.createElement("div");
      options.value = testBank[openQuestion].answers[i];
      options.textContent = testBank[openQuestion].answers[i];
      lineItem.setAttribute("class", "m-3 ");
      lineItem.appendChild(options);
      ansEl.appendChild(lineItem);

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
  ansEl.setAttribute("class", "hide");
  quesEl.textContent = `Thank you for participating. Your score is ${score}. Input your initials: `;
  submitInitials.textContent = "Submit";
  quesEl.appendChild(userInitials);
  quesEl.appendChild(submitInitials);

  submitInitials.addEventListener("click", function (event) {
    userInitials.setAttribute("class", "hide");
    submitInitials.setAttribute("class", "hide");

    var scoresObject = { initials: userInitials.value.trim(), score: score };
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.push(scoresObject);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    scoreboard();
  });
}

function scoreboard() {
  start.setAttribute("class", "hide");
  headEl.textContent = "Scoreboard";
  quesEl.textContent = "Top Scores:";
  board = document.createElement("ol");
  board.innerHTML = "";
  ansEl.setAttribute("class", "");
  ansEl.appendChild(board);
  var highscores = JSON.parse(localStorage.getItem("highscores"));
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });
  boardEl.setAttribute("style", "display:none");
  for (var i = 0; i < highscores.length; i++) {
    var li = document.createElement("li");
    li.innerHTML = `${highscores[i].initials}: ${highscores[i].score}`;
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
