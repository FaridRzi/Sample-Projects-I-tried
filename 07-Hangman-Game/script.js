const wordEl = document.getElementById('word')
const wrongLettersEl = document.getElementById('wrong-letters')
const playAgainBtn = document.getElementById('play-button')
const popup = document.getElementById('popup-container')
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message')

const figureParts = document.querySelectorAll('.figure-part')

const word = ['Asthma', 'Teddy', 'Jade', 'Emerlad', 'Platinium']






let selectedWord = word[Math.floor(Math.random() * word.length)].toLocaleLowerCase()
console.log(selectedWord)

const correctLetters = []
const wrongLetters = []

// Show the hidden word
function toDisplayWord() {
  wordEl.innerHTML = `
  ${selectedWord
    .split('')
    .map(
      (letter) => `
      <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
      </span>`
    )
    .join('')}`

  // Convert the wordEl to be vertical instead of horizontal. Practice of RegEx.
  const innerWord = wordEl.innerText.replace(/\n/g, '')
  // console.log(wordEl.innerText, innerWord)

  // Showing the winning message. It is added here because we want to check the game result
  // before anything else happens.
  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congrats! You won B|'
    popup.style.display = 'flex'
  }
}

// Update the wrong letters. Here, wrong letters are combined for the user so that they can undestand
// which words they have tried so far.
function updateWrongLettersEl() {

  // Here every wrong word is added to the list.
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>Worng</p>' : ''}
  ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `

  // The man is going to be hanged soon :( I hope the user saved that poor guy.
  figureParts.forEach((part, idx) => {
    const errors = wrongLetters.length

    if(idx < errors) {
      part.style.display = 'block'
    } else {
      part.style.display = 'none'
    }
  });

  // Now the man has passed away. We need to tell the user "enough is enough"
  if (wrongLetters.length === figureParts.length) [
    finalMessage.innerText = 'Unfortunately you lost :(',
    popup.style.display = 'flex'
  ]
}


// Show notificatoin. Where we give an alert to the user that whether they have used a letter or not.
function showNotification() {
  notification.classList.add('show')

  setTimeout(() => {
    notification.classList.remove('show')
  }, 2000)
}


// Key down letter press. Whenever a key is pressed, we are going to check it.
window.addEventListener('keypress', (keyPressed) => {
  // The RegEx is to make sure that only words are allowed and no numbers are added.
  const keyValue = keyPressed.key.toLocaleLowerCase().replace(/\d/g, '')

  const letter = keyValue

  if (selectedWord.includes(letter)) {
    if (!correctLetters.includes(letter)) {
      correctLetters.push(letter)
      toDisplayWord()
    } else {
      showNotification()
    }
  } else {
    if (!wrongLetters.includes(letter)) {
      wrongLetters.push(letter)

      updateWrongLettersEl()
    } else {
      showNotification()
    }
  }
})

// Restart the game

playAgainBtn.addEventListener('click', () => {
  // Empty the arrays both correct and wrong
  correctLetters.splice(0)
  wrongLetters.splice(0)

  toDisplayWord()
  updateWrongLettersEl()
  popup.style.display = 'none'
})

toDisplayWord()
