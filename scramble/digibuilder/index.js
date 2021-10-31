const display = document.getElementById('display')
const randomRange = (max) => Math.floor(Math.random() * max)
const stringify = (x, y) => `${x},${y}`

// const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
// const newbet = {' ': 0}
// for (let c of alphabet) {
//     newbet[c] = randomRange((2**15)-2) + 1
// }

let charSeed = 0

const charWidth = 3
const charHeight = 5

const seedDisplay = document.getElementById('seed')

const cellToggle = (toggle, {cell, value}) => {
    charSeed += (toggle ? value : -value)
    cell.style.backgroundColor = toggle ? 'white' : 'black'
    cell.onclick = () => cellToggle(!toggle, {cell, value})
    seedDisplay.innerText = charSeed
    console.log(charSeed)
}

const initChar = () => {
    const c = document.createElement('div')
    c.className = 'char'
    let value = 1
    const cells = {}
    for (let x = 1; x<=charWidth; x++) {
        for (let y = 1; y<=charHeight; y++) {
            const cell = document.createElement('div')
            cell.className = 'charCell'
            cell.style.gridColumn = x
            cell.style.gridRow = y
            const cellValue = {
                cell,
                value
            }
            cell.onclick = () => cellToggle(true, cellValue)
            c.appendChild(cell)
            cells[stringify(x,y)] = cell
            console.log(value)
            value = value * 2
        }
        // value = value * 2
    }
    return {
        container: c,
        cells
    }
}

// const initGroup = (size) => {
//     const elem = document.createElement('div')
//     elem.className = 'textgroup'
//     const chars = Array(size).fill(0).map(() => {
//         const {container, cells} = initChar()
//         elem.appendChild(container)
//         return {container, cells}
//     })
//     return {element: elem, chars}
// }

// const initArea = (lines, width) => {
//     const elem = document.createElement('div')
//     elem.className = 'logarea'
//     const groups = Array(lines).fill(0).map(() => {
//         const {element, chars} = initGroup(width)
//         elem.appendChild(element)
//         return {element, chars}
//     })
//     return {element: elem, groups, top: 0, text: []}
// }

const drawSeed = (seed, {cells}, i=0) => {
    let val = seed
    let value = 1
    for (let x = 1; x <= charWidth; x++) {
        for (let y = 1; y <= charHeight; y++) {
            const check = val % 2
            val = Math.floor(val/2)
            const colour = check===1 ? 'white' : 'black'
            // const toggle = !(check===1)
            const cell = cells[stringify(x, y)]
            cell.style.backgroundColor = colour
            cell.style.transitionDelay = (i * 50) + 'ms'
            // cell.onclick = 
            value = value * 2
        }
    }
}

// const drawChar = (character, cells, i=0) => drawSeed(newbet[character] ?? 0, {cells}, i)

const myChar = initChar()
display.appendChild(myChar.container)

// const blankGroup = ({ chars }) => {
//     for (let char of chars) {
//         drawChar(' ', char.cells, 0)
//     }
// }

// const writeText = (txt, { chars }, delay=0) => {
//     for (let i = 0; i<chars.length; i++) {
//         drawChar(txt[i] ?? ' ', chars[i].cells, i*delay)
//     }
// }

// const delay = (time) => new Promise(resolve => {
//     setTimeout(() => resolve(), time)
// })

// const addLog = async (txt, area) => {
//     if (area.top === area.groups.length) {
//         // shunt
//         const mxx = area.top-1
//         for (let i = 1; i < area.groups.length; i++) {
//             writeText(area.text[i], area.groups[i-1], 0)
//             area.text[i-1] = area.text[i]
//         }
//         blankGroup(area.groups[mxx])
//         await delay(100)
//         writeText(txt, area.groups[mxx],1)
//         area.text[mxx] = txt
//     } else {
//         const top = area.top
//         // console.log(area.groups[top])
//         blankGroup(area.groups[top])
//         await delay(100)
//         writeText(txt, area.groups[top], 1)
//         area.text.push(txt)
//         area.top = area.top + 1
//     }
// }

// const myGroup = initGroup(30);
// display.appendChild(myGroup.element)
// const myArea = initArea(4, 30);
// display.appendChild(myArea.element)
// writeText('HELLO WORLD', myGroup)
// addLog('HELLO WORLD', myArea)

// const button = document.getElementById('trigger')
// const textInput = document.getElementById('mytext')

// button.onclick = async () => {

//     // blankGroup(myGroup)
//     // console.log(textInput)
//     // textInput.style.transitionDelay
//     // 'abc'.toLocaleUpperCase
//     // writeText(textInput.value.toLocaleUpperCase(), myGroup)
//     addLog(textInput.value.toLocaleUpperCase(), myArea)
// }