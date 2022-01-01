const canvas = document.getElementById('canvas')

// Input handling
const pressedButtons = new Set()
document.addEventListener('keydown', (event) => {
    pressedButtons.add(event.key)
})
document.addEventListener('keyup', (event) => {
    pressedButtons.delete(event.key)
})

const root2 = Math.sqrt(2)

const playerMovement = () => {
    let x = 0
    let y = 0
    if (pressedButtons.has('ArrowLeft')) x--
    if (pressedButtons.has('ArrowRight')) x++
    if (pressedButtons.has('ArrowUp')) y--
    if (pressedButtons.has('ArrowDown')) y++

    if (Math.abs(x) === Math.abs(y)) {
        x *= 1/root2
        y *= 1/root2
    }
    return [x, y]
}

// Canvas initialisation
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d')

// Game Loop
{
    const player = {
        x: 10,
        y: 10,
        w: 50,
        h: 50,
        c: 'blue'
    }

    const speed = 200
    let last = 0
    let x = 0;
    /** @param {DOMHighResTimeStamp} timestamp */
    const step = (timestamp) => {
        const delta = (timestamp - last)/1000
        last = timestamp

        // Clear screen
        ctx.clearRect(0,0,640,480)

        // Update logic
        const [px, py] = playerMovement()
        player.x += px * speed * delta
        player.y += py * speed * delta

        // Draw logic
        ctx.fillStyle = player.c
        ctx.fillRect(player.x, player.y, player.w, player.h)

        window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step)
}