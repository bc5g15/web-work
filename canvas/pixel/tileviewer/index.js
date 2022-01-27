const canvas = document.getElementById('canvas')
const controls = document.getElementById('controls')

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const tile = {
    target: [255, 255, 255, 255],
    imageData: new ImageData(8, 8)
}

const redInput = document.createElement('input')
redInput.type = 'number'
const greenInput = document.createElement('input')
greenInput.type = 'number'
const blueInput = document.createElement('input')
blueInput.type = 'number'
const submitButton = document.createElement('button')
submitButton.innerText = 'Change Tile Target'
controls.append(redInput, greenInput, blueInput, submitButton)

submitButton.onclick = () => {
    const red = parseInt(redInput.value, 10)
    const blue = parseInt(blueInput.value, 10)
    const green = parseInt(greenInput.value, 10)
    tile.target = [red, green, blue, 255]
    console.log(tile.target)
}

const getNewValue = (value, target) => {
    if (target === value) {
        const delta = getRandomInt(3) - 1
        return value + delta
    }

    const delta = getRandomInt(5) - 2 // -2,-1,0,1,2
    const shift = Math.sign(target-value)
    return value + delta + shift
}

const updateTile = ({target, imageData}) => {
    const data = imageData.data
    const [red, blue, green, alpha] = target

    for (let i = 0; i < data.length; i+=4) {
        data[i] = getNewValue(data[i], red)
        data[i+1] = getNewValue(data[i+1], green)
        data[i+2] = getNewValue(data[i+2], blue)
        data[i+3] = getNewValue(data[i+3], alpha)
    }
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

// const getNewValue = (value) => {
//     if (value === 0) {
//         return 1
//     }
//     if (value === 255) {
//         return 254
//     }
//     const delta = getRandomInt(3) -1 // -1, 0 or 1
//     return value + delta
// }

// // Have a randomly fizzing tile
// const randomiseTile = () => {
//     const data = tileData.data
//     // const randomValue = getRandomInt(255)

//     for (let i = 0; i < data.length; i+=4) {
//         const value = getNewValue(data[i])
//         data[i] = value
//         data[i+1] = value
//         data[i+2] = value
//         data[i+3] = 255
//     }
//     return tileData
// }

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
        updateTile(tile)

        ctx.putImageData(tile.imageData, 0, 0)

        window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step)
}