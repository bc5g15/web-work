const char = document.getElementById('char')
const randomRange = (max) => Math.floor(Math.random() * max)

const initialiseChar = (c) => {
    const width = 3
    const height = 5
    // const block = document.createElement('div')
    for (let x = 1; x <= width; x++) {
        for (let y = 1; y <= height; y++) {
            const r = Math.random()
            if (r < 0.5) continue
            const block = document.createElement('div')
            block.style.backgroundColor = 'white'
            block.style.gridColumn = x
            block.style.gridRow = y
            c.appendChild(block)
        }
    }
}

const initWithSeed = (seed, c) => {
    const width = 3
    const height = 5
    let val = seed
    for (let x = 1; x <= width; x++) {
        for (let y = 1; y <= height; y++) {
            const temp = val % 2
            val = Math.floor(val / 2)
            if (temp === 0) continue

            const block = document.createElement('div')
            block.style.backgroundColor = 'white'
            block.style.gridColumn = x
            block.style.gridRow = y
            c.appendChild(block)
        }
    }
}

// initialiseChar(char)
const val = randomRange(2**15)
console.log(val)
initWithSeed(val, char)