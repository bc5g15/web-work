const game = document.getElementById('game')

const playerElem = document.createElement('div')
playerElem.className = 'player'
game.appendChild(playerElem)

const player = {
    x: 10,
    y: 30,
    dx: 0,
    dy: 0,
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
    return x;
}

let floored = true
// const checkJump = () => keys.has('ArrowUp') && floored
const jump = (player, jumpForce) => {
    floored = false
    player.dy = -jumpForce
}

const jumpHeld = (player, jumpForce) => {
    // Initial jump
    if (floored) {
        floored = false
        player.dy = -jumpForce
    }
}

const jumpReleased = (player) => {
    const hoverValue = -25
    if (player.dy < hoverValue) {
        player.dy = hoverValue
    }
}

// Game Loop
{
    const debugOut = document.getElementById('debug')

    const speed = 30
    const gravity = 100
    const jumpForce = 50
    let last
    /** @param {DOMHighResTimeStamp} timestamp */
    const step = (timestamp) => {
        if (last === undefined) last = timestamp
        
        const delta = (timestamp - last)/1000
        last = timestamp

        // Check player movement
        const x = checkMove()
        if (keys.has('ArrowUp')) {
            jumpHeld(player, jumpForce)
        } else {
            jumpReleased(player)
        }
        // if (checkJump()) {
        //     jump(player, jumpForce)
        // }
        player.x = player.x + (speed * x * delta)
        if (player.y >= 30 && player.dy > 0) {
            floored = true
            player.dy = 0
        }
        player.y = player.y + (player.dy * delta)
        player.dy = player.dy + (gravity * delta)
        drawPlayer(player)

        debugOut.innerText = `${Math.round(player.dy)}`

        window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step)
}