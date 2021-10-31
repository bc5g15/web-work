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
    return {element: elem, chars}
}

// const initArea = (lines, width) => {
//     const elem = document.createElement('div')
//     elem.className = 'logArea'
//     const groups = Array(lines).fill(0).map(() => {
//         const {element, chars} = initGroup(width)
//         elem.appendChild(element)
//         return {element, chars}
//     })
//     return {element: elem, groups, top: 0}
// }

const drawSeed = (seed, {cells}, i=0) => {
    let val = seed
    for (let x = 1; x <= charWidth; x++) {
        for (let y = 1; y <= charHeight; y++) {
            const check = val % 2
            val = Math.floor(val/2)
            const colour = check===1 ? 'white' : 'black'
            const cell = cells[stringify(x, y)]
            cell.style.backgroundColor = colour
            cell.style.transitionDelay = (i * 100) + 'ms'
            
        }
    }
}

const drawChar = (character, cells, i=0) => drawSeed(newbet[character] ?? 0, {cells}, i)

const blankGroup = ({ chars }) => {
    for (let char of chars) {
        drawChar(' ', char.cells, 0)
    }
}

const writeText = (txt, { chars }, delay=0) => {
    for (let i = 0; i<txt.length && i<chars.length; i++) {
        drawChar(txt[i], chars[i].cells, i*delay)
    }
}

// const addLog = (txt, { groups, top }) => {
//     if (top === groups.length) {
//         // shunt
//     } else {
//         writeText(ext, groups[top])
//         top = top + 1
//     }
// }

const myGroup = initGroup(30);
display.appendChild(myGroup.element)
writeText('HELLO WORLD', myGroup)

const button = document.getElementById('trigger')
const textInput = document.getElementById('mytext')

button.onclick = async () => {
    const delay = (time) => new Promise(resolve => {
        setTimeout(() => resolve(), time)
    })
    blankGroup(myGroup)
    await delay(100)
    // console.log(textInput)
    // textInput.style.transitionDelay
    // 'abc'.toLocaleUpperCase
    writeText(textInput.value.toLocaleUpperCase(), myGroup)
}