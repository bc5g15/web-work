const game = document.getElementById('game')

const playerElem = document.createElement('div')
playerElem.className = 'player'
playerElem.style.zIndex = 1
game.appendChild(playerElem)

const player = {
    x: 10,
    y: 10,
    width: 5,
    height: 5,
    elem: playerElem
}

const roomSize = 50

const rooms = {}
const map = document.createElement('div')
const mapGroup = {
    elem: map,
    x: 0,
    y: 0
}
{
    map.className = 'map'
    map.style.zIndex = 0
    // Make the rooms
    const room1 = document.createElement('div')
    room1.className = 'room'
    room1.innerText = 'ROOM 1'
    room1.style.backgroundColor = 'blue'
    room1.style.gridRow = 1
    room1.style.gridColumn = 1
    map.appendChild(room1)
    
    const room2 = document.createElement('div')
    room2.className = 'room'
    room2.innerText = '2 MOOR'
    room2.style.backgroundColor = 'green'
    room2.style.gridRow = 1
    room2.style.gridColumn = 2
    map.appendChild(room2)
    
    game.appendChild(map)
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

const moveMap = ({x, y, elem}) => {
    elem.style.transform = `translate(${x}em, ${y}em)`
}

// Game Loop
{
    const debug = document.getElementById('debug')
    moveMap(mapGroup)
    const speed = 30
    let last
    let block = false
    /** @param {DOMHighResTimeStamp} timestamp */
    const step = async (timestamp) => {
        if (last === undefined) last = timestamp
        
        const delta = (timestamp - last)/1000
        last = timestamp

        // Check player movement
        if (!block) {
            const [x, y] = checkMove()
            player.x = player.x + (speed * x * delta)
            player.y = player.y + (speed * y * delta)
            drawPlayer(player)
        } else {
            block = false
        }

        if (player.x + player.width > 50) {
            // Move stage to the left
            mapGroup.x -= 50
            moveMap(mapGroup)
            // Move player along with it
            block = true
            const a = player.elem.animate([
                {transform: 'translateX(0)'},
                {transform: `translateX(${player.width-50}em)`}
            ], {duration: 500, easing: 'ease'});
            await a.finished
            player.elem.style.transform = ''
            player.x = 0
            drawPlayer(player)
        } else if (player.x < 0) {
            // Move stage to the right
            mapGroup.x += 50
            moveMap(mapGroup)
            // Move player
            block = true
            const a = player.elem.animate([
                {transform: 'translate(0)'},
                {transform: `translateX(${50-player.width}em)`}
            ], {duration: 500, easing: 'ease'})
            await a.finished
            player.elem.style.transform = ''
            player.x = 50 - player.width
            drawPlayer(player)
        }

        debug.innerText = `X: ${player.x}\ndelta: ${delta}`

        window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step)
}