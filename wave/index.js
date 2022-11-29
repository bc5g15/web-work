const canvas = document.getElementById('draw')

// Canvas initialisation
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d')

const half_height = 150;

ctx.clearRect(0,0,300,300);

// Draw the basic sine wave

ctx.fillStyle = "white"

const drawPoint = (x, y) => {
    ctx.fillRect(x, y, 1, 1)
}

for (let t = 0; t < 300; t++) {
    let y = (Math.sin((Math.PI*2)*(t/300))*150) + 150;
    drawPoint(t, y)
}