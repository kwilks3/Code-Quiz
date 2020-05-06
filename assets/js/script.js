//create timer that starts on click of start button
var timeEl = document.querySelector("#time");
var secondsLeft = 75;

function timer() {
  var timerInterval = setInterval(function () {
    secondsLeft = secondsLeft - 1;
    timeEl.textContent = `Time Remaining: ${secondsLeft}`;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
    }
  , 1000});
}
//output first question on start button click
//create loop for answering questions and outputting new questions
// display whether answer is correct or incorrect for two seconds
// if answer is incorrect subtract 5 seconds from timer
//when all questions are answered or timer is 0 end quiz
// ask for initials
// display scoreboard with initials and scores
