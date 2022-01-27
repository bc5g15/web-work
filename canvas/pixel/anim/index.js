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

const tempData = ctx.getImageData(100, 100, 50, 50)

const baseTile = new ImageData(64, 64)
ctx.putImageData(baseTile, 20, 20)

// Manipulate this on the pixel level
const data = tempData.data
for (let i = 0; i < data.length; i+=4) {
    // Want to add some blue data
    data[i]     = data[i] // Red stays the same
    data[i+1]   = data[i+1] // Green stays the same
    data[i+2]   = 255       // Blue is maxed out
    data[i+3]   = data[i+3] // Transparency is the same
}
ctx.putImageData(tempData, 100, 100)

// Have a randomly fizzing tile
const randomiseTile = () => {
    const data = baseTile.data
    // const randomValue = getRandomInt(255)

    for (let i = 0; i < data.length; i+=4) {
        const randomValue = getRandomInt(255)
        data[i] = randomValue
        data[i+1] = randomValue
        data[i+2] = randomValue
        data[i+3] = 255
    }
    return baseTile
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
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                ctx.putImageData(newTile, 64*i, 64*j)
            }
        }

        window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step)
}