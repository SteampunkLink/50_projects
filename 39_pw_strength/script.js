const password = document.getElementById('password')
const background = document.getElementById('background')

password.addEventListener('input', (e) => {
  const input = e.target.value
  const inputLength = input.length
  const blurValue = 20 - inputLength * 2
  background.style.filter = `blur(${blurValue}px)`
})