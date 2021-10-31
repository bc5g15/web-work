const display = document.getElementById('display')
const randomRange = (max) => Math.floor(Math.random() * max)
const stringify = (x, y) => `${x},${y}`

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const newbet = {' ': 0}
for (let c of alphabet) {
    newbet[c] = randomRange((2**15)-2) + 1
}

const charWidth = 3
const charHeight = 5

const initChar = () => {
    const c = document.createElement('div')
    c.className = 'char'
    const cells = {}
    for (let x = 1; x<=charWidth; x++) {
        for (let y = 1; y<=charHeight; y++) {
            const cell = document.createElement('div')
            cell.className = 'charCell'
            cell.style.gridColumn = x
            cell.style.gridRow = y
            c.appendChild(cell)
            cells[stringify(x,y)] = cell
        }
    }
    return {
        container: c,
        cells
    }
}

const initGroup = (size) => {
    const elem = document.createElement('div')
    elem.className = 'textgroup'
    const chars = Array(size).fill(0).map(() => {
        const {container, cells} = initChar()
        elem.appendChild(container)
        return {container, cells}
    })
    return {textgroup: elem, chars}
}

const drawSeed = (seed, {cells}) => {
    let val = seed
    for (let x = 1; x <= charWidth; x++) {
        for (let y = 1; y <= charHeight; y++) {
            const check = val % 2
            val = Math.floor(val/2)
            const colour = check===1 ? 'white' : 'black'
            cells[stringify(x,y)].style.backgroundColor = colour
        }
    }
}

const drawChar = (character, cells) => drawSeed(newbet[character] ?? 0, {cells})

const blankGroup = ({ chars }) => {
    for (let char of chars) {
        drawChar(' ', char.cells)
    }
}

const writeText = (txt, { chars }) => {
    for (let i = 0; i<txt.length && i<chars.length; i++) {
        drawChar(txt[i], chars[i].cells)
    }
}

const myGroup = initGroup(20);
display.appendChild(myGroup.textgroup)
writeText('HELLO WORLD', myGroup)

const button = document.getElementById('trigger')
const textInput = document.getElementById('mytext')

button.onclick = () => {
    blankGroup(myGroup)
    // console.log(textInput)
    writeText(textInput.value, myGroup)
}