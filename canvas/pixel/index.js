const canvas = document.getElementById('canvas')

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

