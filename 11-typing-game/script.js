// The shown word
const word = document.getElementById('word')
// The typed text
const text = document.getElementById('text')
const scoreEl = document.getElementById('score')
const timeEl = document.getElementById('time')
const endgameEl = document.getElementById('end-game-container')
const settingsBtn = document.getElementById('settings-btn')
const settings = document.getElementById('settings')
const settingsForm = document.getElementById('settings-form')
const difficultySelect = document.getElementById('difficulty')
// Initialize the score
let score = 0
// Initialize time
let time = 10

// Initialize the difficulty using the value stored in the local storage
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium'

// Show the difficulty in the UI
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium'

// Focus on the text when the game begins
text.focus()

// Start the timer to count down
const timerInterval = setInterval(updateTime, 1000)

// An API call to get a random word and play the game
function getRandomWords() {
  fetch('https://random-word-api.herokuapp.com/word')
    .then((res) => res.json())
    .then((data) => {
      randomWord = data[0]
      // Adding the word to the DOM
      word.innerHTML = randomWord
      gameLogic()
    })
}

getRandomWords()

// Function Update score
function updateScore() {
  score++
  scoreEl.innerHTML = score
}

// The game logic
function gameLogic() {
  text.addEventListener('input', (e) => {
    const insertedText = e.target.value

    // If the input and randomword match then we get a new random word and update the score
    if (insertedText === randomWord) {
      getRandomWords()
      updateScore()

      //Clear the input box
      e.target.value = ''
      // Add some time if the user typed a correct word based on the difficulty

      if (difficulty === 'hard') {
        time += 2
      } else if (difficulty === 'medium') {
        time += 3
      } else {
        time += 5
      }

      updateTime()
    }
  })
}

// Update timer
function updateTime() {
  time--
  timeEl.innerHTML = time + `s`

  if (time === 0) {
    clearInterval(timerInterval)
    // Game over
    gameOver()
  }
}

// Game over notification
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}.</p>
    <button onclick="location.reload()">New Game</button>
    `
  endgameEl.style.display = 'flex'
}

// Settings button click hide and unhide. By tapping the difficulty selector is shown.
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'))

// Settings select and store in local storage
settingsForm.addEventListener('click', (e) => {
  difficulty = e.target.value
  localStorage.setItem('difficulty', difficulty)
})


// For the case of changing the difficulty, start the game from scratch.
function difficultyChange () {
    window.location.reload()
}