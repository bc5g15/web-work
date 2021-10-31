const display = document.getElementById('display')
const randomRange = (max) => Math.floor(Math.random() * max)
const stringify = (x, y) => `${x},${y}`


const charWidth = 3
const charHeight = 5

const initChar = () => {
    const width = 3
    const height = 5
    const c = document.createElement('div')
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

const drawABunch = async () => {
    const delay = (time) => new Promise(resolve => {
        setTimeout(() => resolve(), time)
    })
    for (let i = 0; i < 2**15; i++) {
        const newChar = initChar()
        display.appendChild(newChar.container)
        drawSeed(i, newChar)
        await delay(2)
    }
}


// const initWithSeed = (seed) => {
//     const width = 3
//     const height = 5
//     const c = document.createElement('div')
//     c.className = 'char'
//     display.appendChild(c)
//     let val = seed
//     for (let x = 1; x <= width; x++) {
//         for (let y = 1; y <= height; y++) {
//             const temp = val % 2
//             val = Math.floor(val / 2)
//             if (temp === 0) continue

//             const block = document.createElement('div')
//             block.style.backgroundColor = 'white'
//             block.style.gridColumn = x
//             block.style.gridRow = y
//             c.appendChild(block)
//         }
//     }
//     return c;
// }

drawABunch()