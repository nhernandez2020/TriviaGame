//defining onclick functions that run in the window
window.onload = function () {
    $("#start-button").on("click", stopwatch.start);
    $(".choice").on("click", stopwatch.correctCount);
    $("#done-button").on("click", stopwatch.stop);
    $("#restart-button").on("click", stopwatch.reset);
};

//declaring global variables
var intervalId;
var clockRunning = false;
var correctAnswers = 0;

// stopwatch object which contains the clock functions
var stopwatch = {

    // setting the inital time to 60 seconds
    time: 60,

    // function that checks for correct answers and updates the score
    correctCount: function () {

        //checks the selection that is clicked on for the value "correct"
        if (clockRunning) {
            var selection = $(this).val().trim();
            if (selection === "correct" && correctAnswers < 7) {
                correctAnswers++
            }

            //if player gets all 7 questions correct, the game ends
            else if (correctAnswers > 7) {
                stopwatch.stop();
            }
        }

        //prevent a selection from being made if the game hasn't started
        else if (!clockRunning) {
            event.preventDefault();
        }
    },

    //function that runs if the "reset" button is clicked
    reset: function () {

        //the time and score reset, clock stops, and choices are deselected
        stopwatch.stop();
        stopwatch.time = 60;
        correctAnswers = 0;
        $("#time-remaining").text("1:00");
        $("input[type='radio']").prop('checked', false);
    },

    //function that starts the countdown clock
    start: function () {
        if (!clockRunning) {
            intervalId = setInterval(stopwatch.count, 1000);
            clockRunning = true;
        }
    },

    //function that stops the countdown clock and ends the game
    stop: function () {
        clearInterval(intervalId);
        clockRunning = false;

        //instead of the remaining time, the score is displayed in the header
        $("#time-remaining").html("Score:" + correctAnswers + "/7");
    },

    //function initialized in the start function, counts down in intervals of 1000 ms
    count: function () {

        //as long as there is still time left on the clock, keep counting down
        if (stopwatch.time > 0) {
            stopwatch.time--;
            var converted = stopwatch.timeConverter(stopwatch.time);

            //time remaining displays in the header
            $("#time-remaining").text(converted);
        }

        //when the clock reaches 0, stop counting down
        else {
            stopwatch.stop();
        }
    },

    //function that converts the time to display it in minutes and seconds
    timeConverter: function (t) {
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return minutes + ":" + seconds;
