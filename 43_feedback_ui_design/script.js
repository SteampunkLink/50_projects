const ratings = document.querySelectorAll('.rating')
const ratingsCtn = document.querySelector('.ratings-container')
const sendBtn = document.querySelector('#send')
const panel = document.querySelector('#panel')

let selectedRating = 'Satisfied'

ratingsCtn.addEventListener('click', (e) => {
  if (e.target.parentNode.classList.contains('rating') ) {
    removeActive()
    e.target.parentNode.classList.add('active')
    if (e.target.nextElementSibling) {
      selectedRating = e.target.nextElementSibling.innerHTML
    } else {
      selectedRating = e.target.innerHTML
    }
  }
  if (e.target.classList.contains('rating') ) {
    removeActive()
    e.target.classList.add('active')
    selectedRating = e.target.lastElementChild.innerHTML
  }
  console.log(selectedRating)
})

sendBtn.addEventListener('click', (e) => {
  panel.innerHTML = `
    <i class="fas fa-heart"></i>
    <strong>Thank You!</strong>
    <br>
    <strong>Feedback: ${selectedRating}</strong>
    <p>Your feedback helps us improve our customer support.</p>
  `
})

function removeActive() {
  for(let i = 0; i < ratings.length; i++) {
    ratings[i].classList.remove('active')
  }
}