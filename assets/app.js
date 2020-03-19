console.log("correct file")

//pseudocode
//===========================================================
//player clicks to start
//questions queue up
//first question shows 
//timer starts
//If user clicks answer 3 if statements:
//if correct, notification saying it's correct; shows image
//If incorrect, notification saying it's incorrect; shows correct answer & image
//If timer runs out, notification saying times up; shows correct answer and image
//After a few seconds, shows next question
//End of quiz (reset):

//==========================================================


//code starts

//event listeners
$(document).ready(function () {
    $("#remaining-time").hide();
    $("#start").on('click', startGame);
})

//score
var correct = 0;
var incorrect = 0;
var unanswered = 0;

//timer
//amount of time for each question
var timeLeft = 10;
//timer is off until player clicks start
var timerOn = false;
var timerID = '';

//questions object
var trivia = {
    currentQuestion: 0,

    questions: {
        q1: "Which of Vito Corleone's children is the oldest?",
        q2: "Where does the family send Michael to hide?",
        q3: "what was the last name of Vito Corleone before he moved to America",
        q4: "Who say's I'm going to make him an offer he cant refuse?",
        q5: "what corlor represents death in the movie?"
    },

    choices: {
        q1: ['Michael', 'Sonny', 'Fred', 'Connie'],
        q2: ['Paria', 'Las Vegas', 'Rome', 'Sicily'],
        q3: ['Tattaglis', 'Clemenza', 'Andolini', 'Puzo'],
        q4: ['Michael Corleone', 'Sonny Corleone', 'Vito Corleone', 'Fredo Corleone'],
        q5: ['Orange', 'Black', 'White', 'Red' ]
    },

    answers: {
        q1: 2,
        q2: 3,
        q3: 2,
        q4: 2,
        q5: 0
    },

    //method for checking player's guess
    guessChecker: function (guess) {

        //timer ID for questionReset
        var resultID;
        //console.log(Object.values(trivia.answers), trivia.currentQuestion);
        //console.log(Object.values(trivia.answers)[trivia.currentQuestion]);

        //(pulls correct answer for current question

        var correctAnswer = Object.values(trivia.answers)[trivia.currentQuestion];

        //console.log("current answer:", correctAnswer, guess);

        //check the results of the player guess against the current answer;
        //add to correct score
        if (guess === correctAnswer) {
            correct++;
            clearInterval(timerID);
            resultID = setTimeout(resetQuestion, 1000);
            $('#results').html('<h3>You did it!</h3>');
        }

        //add to incorrect score
        else {
            incorrect++;
            clearInterval(timerID);
            resultID = setTimeout(resetQuestion, 1000);
            var answerString = Object.values(trivia.choices)[trivia.currentQuestion][correctAnswer];
            $('#results').html('<h3>Incorrect. The answer is: ' + answerString + '</h3>');
        }
    },
}

function startGame() {
    //reset game
    trivia.currentQuestion = 0;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    clearInterval(timerID);

    //show game section
    $('#game').show();

    //reset results
    $('#results').html('');

    //hide start button
    $('#start').hide();

    //show timer
    $('#remaining-time').show();
    $('#timer').text(timeLeft);

    //display first question
    //function
    showQuestion();
}



//timer countdown function
function countdown() {
    var correctAnswer = Object.values(trivia.answers)[trivia.currentQuestion];

    // if timer still has time left and there are still questions left to ask
    if (timeLeft > -1 && trivia.currentQuestion < Object.keys(trivia.questions).length) {
        $('#timer').text(timeLeft);
        timeLeft--;
    }
    //if statement for timer running completely out
    else if (timeLeft === -1) {
        unanswered++;

        //console.log("unanswered:" + unanswered);

        clearInterval(timerID);
        resultID = setTimeout(resetQuestion, 1000);
        var answerString = Object.values(trivia.choices)[trivia.currentQuestion][correctAnswer];
        $('#results').html('<h3>Out of time! The answer was: ' + answerString + '</h3>');
    } else if (trivia.currentQuestion === Object.keys(trivia.questions).length) {

        //shows end stats
        $('#results')
            .html('<h3>Here are your results:</h3>' +
                '<p>Correct: ' + correct + '</p>' +
                '<p>Incorrect: ' + incorrect + '</p>' +
                '<p>Unaswered: ' + unanswered + '</p>' +
                '<p>Click start to play again.</p>');

        //hide game section
        $('#game').hide();

        $('#start').show();

    }
}

//loop through questions
function showQuestion() {
    //display timer
    timeLeft = 10;
    $('#timer').text(timeLeft);

    //prevent timer from speeding up
    if (!timerOn) {
        timerID = setInterval(countdown, 1000);
    };
    //gather questions and show current question
    var question = Object.values(trivia.questions)[trivia.currentQuestion];
    $('#question').text(question);

    //append choice buttons for the current question
    var questionChoices = Object.values(trivia.choices)[trivia.currentQuestion];
    $.each(questionChoices, function (index, value) {

        $('#choices').append($("<button>" + value + "</button>").on('click', this, function () {
            return trivia.guessChecker(index);
        }))

        //log current choices--these are showing up
        //console.log("current choices: " + questionChoices);
    })
}


function resetQuestion() {
    trivia.currentQuestion++;
    console.log("current question " + trivia.currentQuestion);
    $('#choices').empty();
    $('#results h3').empty();


    //start next question
    showQuestion();
}
