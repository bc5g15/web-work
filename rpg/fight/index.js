const randomRange = (max) => Math.floor(Math.random() * max)
const stringify = (x, y) => `${x},${y}`

const charWidth = 3
const charHeight = 5

const initChar = () => {
    const width = 3
    const height = 5
    const c = document.createElement('span')
    c.className = 'char'
    const cells = {}
    for (let x = 1; x<=width; x++) {
        for (let y = 1; y<=height; y++) {
            const cell = document.createElement('div')
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

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const newbet = {' ': 0}
for (let c of alphabet) {
    newbet[c] = randomRange((2**15)-2) + 1
}

// Log Setup
const log = document.getElementById('log')
const logChars = []
// init log
for (let i = 0; i < 20; i++) {
    const { container, cells } = initChar()
    log.appendChild(container)
    logChars.push(cells)
}

const logLine = (txt) => {
    for (let i = 0; i < txt.length && i < logChars.length; i++) {
        const char = txt[i]
        const cells = logChars[i]
        drawSeed(newbet[char], {cells})
    }
}
logLine('A BEAST APPEARS')


// Menu Setup
const menu = document.getElementById('menu')
const createButton = (txt) => {

}