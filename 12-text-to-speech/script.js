const main = document.querySelector('main')
const voicesSelect = document.getElementById('voices')
const textArea = document.getElementById('text')
const readBtn = document.getElementById('read')
const toggleBtn = document.getElementById('toggle')
const closeBtn = document.getElementById('close')

// The data for predefined texts.
const data = [
  {
    image: './assets/drink.jpg',
    text: "I'm thirsty",
  },

  {
    image: './assets/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: './assets/tired.jpg',
    text: "I'm Tired",
  },
  {
    image: './assets/hurt.jpg',
    text: "I'm Hurt",
  },
  {
    image: './assets/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: './assets/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: './assets/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: './assets/scared.jpg',
    text: "I'm Scared",
  },
  {
    image: './assets/outside.jpg',
    text: 'I Want To Go Outside',
  },
  {
    image: './assets/home.jpg',
    text: 'I Want To Go Home',
  },
  {
    image: './assets/school.jpg',
    text: 'I Want To Go To School',
  },
  {
    image: './assets/grandma.jpg',
    text: 'I Want To Go To Grandmas',
  },
]

data.forEach(createBox)

// The boxes using the pictures and
function createBox(item) {
  // Adding a "div" for images
  const box = document.createElement('div')
  // Deconstructing the data to create item
  const { image, text } = item
  // Adding two classes here box and info.
  box.classList.add('box')
  // Update the element we created with image and text for each box
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `

  // @todo - speak event
  main.appendChild(box)
}

// Store the voices from Voice Speech API
let voices = []

function getVoices() {
  // Getting all the available voices from API
  voices = speechSynthesis.getVoices()
  // Loop through the voices to create an option in the list for them
  voices.forEach((voice) => {
    // Creating the list
    const option = document.createElement('option')
    // Getting the voices name
    option.value = voice.name
    // Showing the voice and its name
    option.innerText = `${voice.name} ${voice.lang}`
    // Adding the result to the list
     voicesSelect.appendChild(option)
    
  })
}

// If voice changes get the new voice
speechSynthesis.addEventListener('voiceschanged', getVoices)

// Toggle text box to show and hide it
toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
)
// Close by using the close button
closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
)

// Calling the voices
getVoices()