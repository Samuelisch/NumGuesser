const originalText = "We have selected a random number between 1 and 100. See if you can guess it in 10 turns or fewer. We'll tell you if your guess was too high or low."
let limit = 100; //keeps track to display in description.
let randomNum = setRandomNum(); //generate random num from 1 to 100

//initialise constant variables for elements in html
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHigh = document.querySelector('.lowOrHigh');

const guessSubmit = document.querySelector('.guessSubmit');
guessSubmit.disabled = true; //set button to disabled first
const guessField = document.querySelector('.guessField');
//set guessCount to 1, to keep track to limit of guesses.
let guessCount = 1;
//initialise reset and harder button.
let resetButton;
let harderButton;

//random number with parameter, to * 10 if harderButton clicked
function setRandomNum() {
    return (Math.floor(Math.random() * limit) + 1)
}

//check user value
function checkGuess() {
    let userGuess = Number(guessField.value);
    if (guessCount == 1) {
        guesses.textContent = 'Previous guesses: ';
    }
    guesses.textContent += userGuess + ' ';

    if (userGuess == randomNum) {
        //stop game to avoid overflow above 10 billion(?)
        if (limit > 1000000000) {
            lastResult.textContent = 'Congratulations! You beat the game!';
        } else {
            lastResult.textContent = 'Congratulations! You got the number!';
        }
        //change backgroundcolor to green or red based on input
        lastResult.style.backgroundColor = 'green';
        lowOrHigh.textContent = '';
        setGameOver(); //function to declare game over.
    } else if (guessCount === 10) {
        lastResult.textContent = 'Oops! Game Over!';
        setGameOver();
    } else {
        lastResult.textContent = 'Try again!';
        lastResult.style.backgroundColor = 'red';
        lowOrHigh.textContent = userGuess < randomNum ? 'Your guess was too low!' : 'Your guess was too high!'
        guessSubmit.disabled = true;
    }
    
    guessCount++;
    guessField.value = '';
    //start input again, so user doesn't have to click on the input box.
    guessField.focus();
}
//gameover, give options to reset or harder game
function setGameOver() {
    //disable input and submit buttons
    guessField.disabled = true;
    guessSubmit.disabled = true;
    //create buttons to reset and set harder game
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    document.body.append(resetButton);
    resetButton.addEventListener('click', resetGame);

    harderButton = document.createElement('button');
    harderButton.textContent = 'Start harder game';
    document.body.append(harderButton);
    harderButton.addEventListener('click', harderGame);
    //disable next stage button if too many guesses
    if (limit > 1000000000 || guessCount == 10) {
        harderButton.disabled = true;
    }
}
//to reset all elements in when resetgame or hardergame.
function resetForm() {
    //reset form elements
    const resetParas = document.querySelectorAll('.resultParas p');
    resetParas.forEach(element => element.textContent = '');

    resetButton.parentNode.removeChild(resetButton);
    harderButton.parentNode.removeChild(harderButton);
    //enable the input and submit fields, focus on input again
    guessField.disabled = false;
    guessSubmit.disabled = true;
    guessField.value = '';
    guessField.focus();

    lastResult.style.backgroundColor = 'white';
    //get new random number
    randomNum = setRandomNum();
}

function resetGame() {
    //reinitialize guesscount and limit to normal.
    guessCount = 1;
    limit = 100;
    //remove all text and extra buttons.
    document.querySelector('.description').textContent = originalText;

    resetForm();
}

function harderGame() {
    guessCount = 1;
    limit *= 10;
    //change upper number by * 10, the rest will reset like resetGame().
    document.querySelector('.description').textContent = `The random number is now between 1 and ${limit}! See if you can guess it in 10 turns or fewer. We'll let you know if your guess is too high or low.`

    resetForm();
}

//user can press enter in input field and 'click' on submit button
guessField.addEventListener("keyup", function(event) {
    if (this.value.length > 0) {
        guessSubmit.disabled = false;
    } else {
        guessSubmit.disabled = true;
    }

    if (event.keyCode == 13) {
        event.preventDefault();
        guessSubmit.click();
    }
})
//check the input value after user clicks on submit button.
//it checks for guessField, not guessSubmit, which is just a button.
guessSubmit.addEventListener('click', checkGuess);