const imgs = document.getElementById('imgs')
const leftBtn = document.getElementById('left')
const rightBtn = document.getElementById('right')

const imgList = document.querySelectorAll('#imgs img')

let idx = 0

let interval = setInterval(run, 2000)

function run() {
  idx++
  changeImg()
}

function changeImg() {
  if(idx > imgList.length - 1) {
    idx = 0
  } else if(idx < 0) {
    idx = imgList.length - 1
  }

  imgs.style.transform = `translateX(${-idx * 500}px)`
}

function resetInterval() {
  clearInterval(interval)
  interval = setInterval(run, 2000)
}

rightBtn.addEventListener('click', () => {
  idx++
  changeImg()
  resetInterval()
})

leftBtn.addEventListener('click', () => {
  idx--
  changeImg()
  resetInterval()
})