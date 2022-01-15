const stringify = (x, y) => `${x},${y}`
const destringify = s => s.split(',').map(i => parseInt(i, 10))

const canvas = document.getElementById('canvas')
const palette = document.getElementById('palette')

let tileValue = 1
const colours = [
    'null',
    'white',
    'red',
    'blue'
]


// Populate palette, using default colours for now
{
    const boxes = []
    for (const colour of colours) {
        const colourBox = document.createElement('div')
        colourBox.style.width = '5em'
        colourBox.style.height = '5em'
        colourBox.style.outline = colour === 'white' ? '1em solid white' : ''
        if (colour === 'null') {
            colourBox.innerText = 'X'
            colourBox.style.lineHeight = '5em'
            colourBox.style.textAlign = 'center'
        } else {
            colourBox.style.backgroundColor = colour
        }

        boxes.push(colourBox)

        palette.append(colourBox)
    }

    for (const box in boxes) {
        boxes[box].onclick = () => {
            boxes.forEach(b => b.style.outline = '')
            boxes[box].style.outline = '1em solid white'
            tileValue = box
            console.log(tileValue)
        }
    }
}

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d')

let mouseClick = false
let mouseX = 0
let mouseY = 0

canvas.addEventListener('mousedown', (evt) => {
    mouseClick = true
})

canvas.addEventListener('mouseup', (evt) => {
    mouseClick = false
})

canvas.addEventListener('mousemove', (evt) => {
    mouseX = evt.clientX
    mouseY = evt.clientY
})


const screenWidth = 640
const screenHeight = 480

const tileWidth = 10
const tileHeight = 10

const xOffset = 0
const yOffset = 0

// Building a map constructor will help this a lot. 
const map = [
    [0,0,0,0,0,0,0],
    [1,1,1,0,1,1,1],
    [1,2,0,0,0,2,1],
    [1,1,1,0,1,1,1],
    [0,0,0,0,0,0,0]
]

const drawMap = (map) => {
    map.forEach((arr, y) => arr.forEach((i, x) => {
        ctx.fillStyle = colours[i]
        ctx.fillRect(tileWidth * x, tileHeight * y, tileWidth, tileHeight)
    }))
}

drawMap(map)

ctx.fillStyle = 'white'
const paintedTiles = {}
// Game Loop
{
    const speed = 10
    let last = 0
    let x = 0;
    /** @param {DOMHighResTimeStamp} timestamp */
    const step = (timestamp) => {
        const delta = (timestamp - last)/1000
        last = timestamp

        if (mouseClick) {
            const tileX = Math.floor(mouseX / tileWidth) * tileWidth
            const tileY = Math.floor(mouseY / tileHeight) * tileHeight

            ctx.fillStyle = tileValue === '0' ? 'black' : colours[tileValue]
            const positionString = stringify(tileX, tileY)
            if (tileValue === '0' && positionString in paintedTiles) {
                delete paintedTiles[positionString]
            } else {
                paintedTiles[positionString] = tileValue
            }
            ctx.fillRect(tileX, tileY, tileWidth, tileHeight)

        }
        window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step)
}