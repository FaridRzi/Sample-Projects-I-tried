const progress = document.getElementById('progress')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const circle = document.querySelectorAll('.circle')

let currentActive = 1
// Understands that the user has clicked on the next and makes a progess in the bar
next.addEventListener('click', () => {
  currentActive++

  if (currentActive > circle.length) {
    currentActive = circle.length
  }
  update()
  //   console.log(currentActive)
})
// Understands that the user has clicked on the back and makes a progess in the bar
prev.addEventListener('click', () => {
  currentActive--

  if (currentActive < 1) {
    currentActive = 1
  }

  update()
    console.log(currentActive)
})


function update() {
    //changes the active class for the button. this changes the color of the bar.
  circle.forEach((circle, idx) => {
    if (idx < currentActive) {
      circle.classList.add('active')
    } else {
      circle.classList.remove('active')
    }
  })

  const actives = document.querySelectorAll('.active')
// how much progress must be made here
  progress.style.width =
    ((actives.length - 1) / (circle.length - 1)) * 100 + '%'

  console.log(actives.length)
//   console.log(circle.length)
  console.log(progress.style.width)
//makes next and prev button active and de-active when necessary.
  if (currentActive === 1) {
    prev.disabled = true
  } else if (currentActive === circle.length) {
    next.disabled = true
  } else {
    prev.disabled = false
    next.disabled = false
  }
}
