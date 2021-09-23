// https://api.lyrics.ovh/v1

const form = document.querySelector('form')
const search = document.querySelector('input')
const results = document.getElementById('results')
const pagination = document.getElementById('more')

// Search for songs by term
async function searchSongs(searchTerm) {
  const res = await fetch(`https://api.lyrics.ovh/suggest/${searchTerm}/`)
  const data = await res.json()
  showData(data)
}


// Show songs and artist in DOM
function showData(data) {

  // Alternative way of showing the search result
  //   let output = ''

  //   data.data.forEach((song) => {
  //     output += `
  //         <li>
  //         <span>
  //         <strong>
  //         ${song.artist.name}
  //         </strong> - ${song.title}
  //         </span>
  //         <button class="btn">${song.title}Get Lyrics!</a>
  //         </button>
  //         </li>
  //         `
  //   })

  //   results.innerHTML = `
  //   <ul class="songs">
  //   ${output}
  //   </ul>
  //   `

  results.innerHTML = `
  <ul class="songs">
  ${data.data
    .map(
      (song) =>
        `
      <li>
      <span>
      <strong>
      ${song.artist.name}
      </strong> - ${song.title}
      </span>
      <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics!</a>
      </button>
      </li>
      `
    )
    .join('')}
  </ul>
  `

  if (data.prev || data.next) {
    pagination.innerHTML = `
    ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ''} 
    ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''} 
    `
  } else {
      pagination.innerHTML =''
  }
}

// Pagination functionality
async function getMoreSongs (link) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${link}`)
    const data = await res.json()

    showData(data)
}

// Get lyrics
async function getLyrics(artist,songTitle) {
    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`)
    const data = await res.json()
  // Making the text readable by removing the spaces and next lines
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    results.innerHTML = `
    <h2><strong>${artist}</strong>- ${songTitle}</h2>
    <span>${lyrics}</span>
    `
    pagination.innerHTML = ''
}



// Search button
form.addEventListener('submit', (e) => {
  e.preventDefault()

  const searchTerm = search.value
  if (!searchTerm) {
    alert("Please type an artist's name or a song's name")
  } else {
    searchSongs(searchTerm)
  }
})

// get lyrics
results.addEventListener('click', e=>{
    const clickedEl =e.target

    if (clickedEl.tagName === `BUTTON`){
        const artist = clickedEl.getAttribute('data-artist')
        const songTitle = clickedEl.getAttribute('data-songtitle')
        getLyrics(artist,songTitle)
    }
})