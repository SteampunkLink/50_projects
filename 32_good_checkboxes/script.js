const toggles = document.querySelectorAll('.toggle')
const good = document.getElementById('good')
const cheap = document.getElementById('cheap')
const fast = document.getElementById('fast')

toggles.forEach(toggle => toggle.addEventListener('change', (e) => doTheThing(e.target)))

function doTheThing(clickedEl) {
    if (good.checked && cheap.checked && fast.checked) {
        if (good === clickedEl) {
            fast.checked = false
        }
        if (cheap === clickedEl) {
            good.checked = false
        }
        if (fast === clickedEl) {
            cheap.checked = false
        }
    }
}