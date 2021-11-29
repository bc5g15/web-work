const canvas = document.getElementById('canvas')

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d')

ctx.fillStyle = 'rgb(200, 0, 0)'
ctx.fillRect(10, 10, 50, 50)
ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
ctx.fillRect(30, 30, 50, 50)

ctx.fillStyle = 'rgb(200, 0, 0)'

// Game Loop
{
    const speed = 10
    let last = 0
    let x = 0;
    /** @param {DOMHighResTimeStamp} timestamp */
    const step = (timestamp) => {
        const delta = (timestamp - last)/1000
        console.log(delta)
        last = timestamp

        ctx.clearRect(0,0,640,480)

        ctx.fillRect(x, 50, 50, 50)
        x += delta * speed
        window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step)
}