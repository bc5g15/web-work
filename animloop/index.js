const game = document.getElementById('game')

const playerElem = document.createElement('div')
playerElem.className = 'player'
game.appendChild(playerElem)

const player = {
    x: 10,
    y: 10,
    elem: playerElem
}

/**
 * @param {{
 *  x: number
 *  y: number
 *  elem: HTMLDivElement
 * }} obj
 */
function drawPlayer({x, y, elem}) {
    elem.style.left = x + 'em'
    elem.style.top = y + 'em'
}

const keys = new Set()
document.addEventListener('keydown', (e) => {
    keys.add(e.key)
})
document.addEventListener('keyup', (e) => {
    keys.delete(e.key)
})

const root2 = Math.sqrt(2)
const checkMove = () => {
    let x = 0
    if (keys.has('ArrowLeft')) {
        x = -1
    } else if (keys.has('ArrowRight')) {
        x = +1
    }

    let y = 0
    if (keys.has('ArrowUp')) {
        y = -1
    } else if (keys.has('ArrowDown')) {
        y = +1
    }

    if (x !== 0 && y !== 0) {
        x = x / root2
        y = y / root2
    }

    return [x, y]
}

// Game Loop
{
    const speed = 10
    let last
    /** @param {DOMHighResTimeStamp} timestamp */
    const step = (timestamp) => {
        if (last === undefined) last = timestamp
        
        const delta = (timestamp - last)/1000
        last = timestamp

        // Check player movement
        const [x, y] = checkMove()
        player.x = player.x + (speed * x * delta)
        player.y = player.y + (speed * y * delta)
        drawPlayer(player)

        window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step)
}