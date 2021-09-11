// The container
const musicContainer = document.getElementById('music-container')
// The buttons
const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
// Player elements
const audio = document.getElementById('audio')
const progress = document.getElementById('progress')
const progressContainer = document.getElementById('progress-container')
const tilte = document.getElementById('title')
const cover = document.getElementById('cover')
// Song titles
const songs = ['hey', 'summer', 'ukulele']

// Keep track of songs, set to the third song
let songIndex = 2

// Initially load song details into DOM
loadSong(songs[songIndex])

// Update song details on the player
function loadSong(song) {
  tilte.innerText = song
  audio.src = `assets/musics/${song}.mp3`
  cover.src = `assets/imgs/${song}.jpg`
}

// Play the song function
function playSong() {
  musicContainer.classList.add('play')
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')
  audio.play()
}

// Pause the song function
function pauseSong() {
  musicContainer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')
  playBtn.querySelector('i.fas').classList.add('fa-play')
  audio.pause()
}

// Previous song
function prevSong() {
  songIndex--
  // When it reached the first song, it goes to the last song
  if (songIndex < 0) {
    songIndex = songs.length - 1
  }

  loadSong(songs[songIndex])

  playSong()
}

// Next song
function nextSong() {
  songIndex++
  // When it reached to the last song, it goes to the first song
  if (songIndex > songs.length - 1) {
    songIndex = 0
  }

  loadSong(songs[songIndex])

  playSong()
}

// Progress Bar update or Time/ Song update
function updateProgress(e) {
  // This brings us the total amount of time and the amount passed in the music played. This is done using the "target" method.
  const { duration, currentTime } = e.target
  const progressPercent = (currentTime / duration) * 100
  progress.style.width = `${progressPercent}%`
}

// Set progress bar
function setProgress(e) {
  // "this" in here brings the maximum width of the element that is has fired a click event. Which in here it is the progress bar.
  const width = this.clientWidth
  // "offsetX" method is used to find where the user has clicked and where we should resume playing the song.
  const clickX = e.offsetX
  // This brings the the total duration of the song.
  const duration = audio.duration

  // In here, we have calculated where the song should be played in seconds. The first part calculated the percentage and the second part
  // converts it to seconds.
  audio.currentTime = (clickX / duration) * duration
}

// Event listeners are listed here.
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play')
  // An attempt to use ternary conditionals.
  //   (Boolean(isPlaying) === false) ? pauseSong() : playSong()
  // })

  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})

// Change song
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

// Time/ Song
audio.addEventListener('timeupdate', updateProgress)

// Click on progress bar
progressContainer.addEventListener('click', setProgress)

// Event to catch when the song ends
audio.addEventListener('ended', nextSong)
