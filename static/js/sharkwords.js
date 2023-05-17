const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;
let correctGuesses = 0;

// Loop over the letters in `word` and create divs.
// The divs should be appended to the section with id="word-container".
//
// Use the following template string to create each div:
// `<div class="letter-box ${letter}"></div>`
//
const createDivsForChars = (word) => {
  const wordContainer = document.querySelector('#word-container');
  for (const letter of word){
    wordContainer.insertAdjacentHTML('beforeend', `<div class="letter-box ${letter}"></div>`);
  }
};

// Loop over each letter in the alphabet and generate a button for each letter
// The buttons should be appended to the section with id="letter-buttons".
const generateLetterButtons = () => {
  let container = document.querySelector('#letter-buttons');
  for (const letter of ALPHABET){
    container.insertAdjacentHTML('beforeend', `<button>${letter}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  buttonEl.disabled = true;
};

// This is a helper function we will use in the future
// It should return `true` if `letter` is in the word
// For now, you should test it out to make sure it works

const isLetterInWord = (letter, word) => {
  if (word.includes(letter)){
    return true
  }
  else{
    return false
  }
};

const handleCorrectGuess = (letter) => {
  const letterDivs = document.querySelectorAll(`.${letter}`);
  console.log(letterDivs);
  for (const div of letterDivs){
    div.innerHTML = letter; 
  }
  correctGuesses += 1;

  if (correctGuesses === 5) {
    buttons = document.querySelectorAll('button');
    for (const butt of buttons){
      butt.disabled = true; 
    }
  document.querySelector('#win').style.display = 'block';
  }
}

const handleWrongGuess = () => {
  numWrong += 1;

  const sharkImage = document.querySelector('#shark-img img');
  sharkImage.setAttribute('src', `/static/images/guess${numWrong}.png`);

  if (numWrong === 5){
    buttons = document.querySelectorAll('button');
    for (const button of buttons){
      button.disabled = true; 
    }
    document.querySelector('#play-again').style.display = 'block';
    }
  }

  
// This is like if __name__ == '__main__' in Python
// It will be called when the file is run (because
// we call the function on line 66)
const resetGame = () => {
  window.location = '/sharkwords';
};

(function startGame() {
  // For now, we'll hardcode the word that the user has to guess
  // You can change this to choose a random word from WORDS once you
  // finish this lab but we hard code it so we know what the word is
  // and can tell if things look correct for this word
  const word = 'hello';
  createDivsForChars(word);
  generateLetterButtons();

  const buttons = document.querySelectorAll('button');

  for(const button of buttons){
    button.addEventListener('click',() => {
      disableLetterButton(button);

      const letter = button.innerHTML;

      if(isLetterInWord(letter, word) === true){
        handleCorrectGuess(letter);
      }
      else{
        handleWrongGuess();
      }
    });
  }
  document.querySelector('#play-again').addEventListener('click', resetGame);
  document.querySelector('#win').addEventListener('click', resetGame);
})();
