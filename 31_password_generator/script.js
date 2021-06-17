const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generate');
const clipboardBtn = document.getElementById('clipboard');
const alertMsg = document.getElementById('alert')

alertMsg.style.display = "none"

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardBtn.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const password = resultEl.innerText
    if (!password) { return }

    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    textarea.remove()
    
    alertMsg.style.display = "block"
    setTimeout(() => {
        alertMsg.style.display = "none"
    }, 3000)
})

generateBtn.addEventListener('click', () => {
    const length = +lengthEl.value
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked
    resultEl.innerText = generatePassword(hasLower, hasNumber, hasUpper, hasSymbol, length)
})

function generatePassword(lower, number, upper, symbol, length) {
    let generatedPassword = ''
    const typesCount = lower + number + upper + symbol
    const typesArr = [{lower}, {number}, {upper}, {symbol}].filter(item => Object.values(item)[0])
    if (typesCount === 0) {
        return ''
    }

    for (let i = 0; i < length; i++) {
        const rando = Math.floor(Math.random() * typesCount)
        const funcName = Object.keys(typesArr[rando])[0]
        generatedPassword += randomFunc[funcName]()
    }
    
    const finalPassword = generatedPassword.slice(0, length)
    return finalPassword
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = "!@#$%^&*<>/?,."
    return symbols[Math.floor(Math.random() * symbols.length)]
}

