const canvas = document.getElementById('canvas')

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

const tiles = [
    'black',
    'red',
    'blue'
]

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
        ctx.fillStyle = tiles[i]
        ctx.fillRect(tileWidth * x, tileHeight * y, tileWidth, tileHeight)
    }))
}

drawMap(map)

ctx.fillStyle = 'white'
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
            ctx.fillRect(tileX, tileY, tileWidth, tileHeight)
        }
        window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step)
}