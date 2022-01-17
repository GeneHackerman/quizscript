var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var quizTitleElement = document.getElementById('quiz-title')
var startingMinutes = 5;
let time = startingMinutes * 60;
let shuffledQuestions, currentQuestionIndex


// timer works, but need to connect to startGame function
// timer appears next to question box as opposed to being located at top
var countdownEl = document.getElementById('count-down');

setInterval(updateCountdown, 1000);

function updateCountdown() {
    var minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds; 

    countdownEl.innerHTML = `${minutes}: ${seconds}`;
    time--;
}

// will listen for clicks on startGame and nextQuestion buttons
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

// begins game prompting to first question
function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    // line 23 will hide the quiz title upon start
    quizTitleElement.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

// shuffles the order of questions and displays next question
function setNextQuestion()  {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}


function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })

}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

// after answer is selected will restart game on final question
function selectAnswer(event) {
    var selectedButton = event.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')        
    } else {
        startButton.innerText = 'Submit' // need to add actual submit function to local storage
        startButton.classList.remove('hide')
    }
}

// will determine if answer is correct or incorrect
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
        element.style.backgroundColor = 'green'
    } else {
        element.classList.add('wrong')
        element.style.backgroundColor = 'red'
    }
    
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}



// quiz questions with true/false values
var questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            {text: 'head', correct: true },
            {text: '<div>', correct: false },
            {text: '<style>', correct: false }
        ]

    },
    {
        question: "What is the correct syntax for referring to an externa script called xxx.js?",
        answers: [
            {text: '<script name="xxx.js"', correct: false },
            {text: '<script src="xxx.js"', correct: true },
            {text: '<script href="xxx.js"', correct: false }
            
        ]
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: [
            {text: 'function = myFunction()', correct: true},
            {text: 'function:myFunction()', correct: false },
            {text: 'function myFunction()', correct: false }
            
        ]
    },
    {
        question: "How do you call a function named 'myFunction'?",
        answers: [
            {text: 'call myFunction()', correct: false },
            {text: 'call function myFunction()', correct: false },
            {text: 'myFunction()', correct: true },
        ]
    },
    {
        question: "The external JavaScript file must contain the <script> tag.",
        answers: [
            {text: 'False', correct: true},
            {text: 'True', correct: false}
        ]
    },
    {
        question: "How can you add a comment in JavaScript?",
        answers: [
            {text: '<!--This is a comment-->', correct: false},
            {text: 'This is a comment', correct: false},
            {text: '//This is a comment', correct: true}
        ]
    },
    {
        question: "What is the correct way to write a JavaScrip array?",
        answers: [
            {text: 'var colors = "red", "green", "blue"', correct: false},
            {text: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")', correct: false},
            {text: 'var colors = ["red", "green", "blue"]', correct: true}
        ]
    }
]

