const canvas = document.getElementById('draw')

// Canvas initialisation
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d')

const half_height = 150;

ctx.clearRect(0,0,300,300);

// Draw the basic sine wave

ctx.fillStyle = "white"

const drawPoint = (x, y) => {
    ctx.fillRect(x, y, 1, 6)
}

for (let t = 0; t < 300; t++) {
    let y = (Math.sin((Math.PI*2)*(t/300))*50) + 150;
    drawPoint(t, y)
}

// Create the controls and allow the wave to be configured

const drawWave = (frequency, amplitude, offset) => {
    for (let t = 0; t < 300; t++) {
        let y = (Math.sin((Math.PI*2)*(t/300)*frequency + offset)*50*amplitude) + 150
        drawPoint(t,y);
    }
}

const controls = document.getElementById('controls')

// Add the input controls
{
    const ampInput = document.createElement('input')
    ampInput.type = 'number'
    controls.append(ampInput);

    const freqInput = document.createElement('input')
    freqInput.type = 'number'
    controls.append(freqInput)

    const offsetInput = document.createElement('input')
    offsetInput.type = 'number'
    controls.append(offsetInput)

    const submitButton = document.createElement('button')
    submitButton.innerText = 'Draw Wave'
    submitButton.onclick = () => {
        const amp = ampInput.valueAsNumber
        const freq = freqInput.valueAsNumber
        const offset = offsetInput.valueAsNumber
        drawWave(freq, amp, offset)
    }
    controls.append(submitButton)
}