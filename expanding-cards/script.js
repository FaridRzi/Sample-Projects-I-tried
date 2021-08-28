const panels = document.querySelectorAll(".panel")
//Using js arrows to define a function to expand cards on click
//Also, collapse the rest of the cards
panels.forEach((panel) => {
  panel.addEventListener("click", () => {
    removeActiveClasses()
    panel.classList.add("active")
  })
})

//Card remover function
function removeActiveClasses() {
  panels.forEach(panel => {
    panel.classList.remove("active")
  })
}
