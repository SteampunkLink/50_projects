const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

// song titles
const songs = ['Linden_Dollars', 'Toy_Dog', 'HighScores', 'Stage0', 'Stage1', 'Stage2']
const images = ['farsidevirtual', 'buynow', 'tetriscdi', 'tetriscdi', 'tetriscdi', 'tetriscdi']

// Keep track of songs
let songIndex = 2

// Initially load song into DOM
loadSong(songIndex)

// Update song details
function loadSong(sid) {
  title.innerText = songs[sid]
  audio.src = `music/${songs[sid]}.mp3`
  cover.src = `img/${images[sid]}.jpg`
}

function playSong() {
  musicContainer.classList.add('play')
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')

  audio.play()
}

function pauseSong() {
  musicContainer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.add('fa-play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')

  audio.pause()
}

function prevSong() {
  songIndex--
  if (songIndex < 0) {
    songIndex = songs.length - 1
  }
  loadSong(songIndex)
  playSong()
}

function nextSong() {
  songIndex++
  if (songIndex >= songs.length) {
    songIndex = 0
  }
  loadSong(songIndex)
  playSong()
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement
  const progressPercent = currentTime / duration * 100
  progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration

  audio.currentTime = (clickX / width) * duration
}

// Event Listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play')

  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})

// Change Tracks
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)