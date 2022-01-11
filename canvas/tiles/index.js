const canvas = document.getElementById('canvas')

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d')

const tiles = [
    'black',
    'red',
    'blue'
]

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