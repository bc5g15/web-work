const canvas = document.getElementById('canvas')

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Canvas initialisation
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d')

const getColourIndicies = (x, y, width) => {
    const red = y (width * 4) + x * 4
    return [red, red+1, red+2, red+3]
}

ctx.fillStyle = 'red'
ctx.fillRect(0,0,640,480)

const tileData = ctx.getImageData(0, 0, 16, 16)

// const tileData = new ImageData(64, 64)
// ctx.putImageData(tileData, 0, 20)

// Manipulate this on the pixel level
// const data = tileData.data
// for (let i = 0; i < data.length; i+=4) {
//     // Want to add some blue data
//     data[i]     = data[i] // Red stays the same
//     data[i+1]   = data[i+1] // Green stays the same
//     data[i+2]   = 255       // Blue is maxed out
//     data[i+3]   = data[i+3] // Transparency is the same
// }
// ctx.putImageData(tileData, 100, 100)

const getNewValue = (value) => {
    if (value === 0) {
        return 1
    }
    if (value === 255) {
        return 254
    }
    const delta = getRandomInt(3) -1 // -1, 0 or 1
    return value + delta
}

// Have a randomly fizzing tile
const randomiseTile = () => {
    const data = tileData.data
    // const randomValue = getRandomInt(255)

    for (let i = 0; i < data.length; i+=4) {
        const value = getNewValue(data[i])
        data[i] = value
        data[i+1] = value
        data[i+2] = value
        data[i+3] = 255
    }
    return tileData
}

// Game Loop
{
    let last = 0
    /** @param {DOMHighResTimeStamp} timestamp */
    const step = (timestamp) => {
        const delta = (timestamp - last)/1000
        last = timestamp

        // Clear screen
        // ctx.clearRect(0,0,640,480)

        // Tile drawing logic
        const newTile = randomiseTile()

        ctx.putImageData(newTile, 0, 0)

        window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step)
}