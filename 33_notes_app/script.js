const addBtn = document.getElementById('add')

addBtn.addEventListener('click', () => addNewNote())

function addNewNote(text = '') {
    const note = document.createElement('div')
    note.classList.add('note')

    note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `

    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const mainEl = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    editBtn.addEventListener('click', () => {
        mainEl.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    })

    deleteBtn.addEventListener('click', () => {
        note.remove()
    })

    mainEl.innerHTML = marked(text)

    textArea.value = text

    textArea.addEventListener('input', (e) => {
        const { value } = e.target
        mainEl.innerHTML = marked(value)
    })

    document.body.appendChild(note)
}

