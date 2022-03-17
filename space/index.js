const field = document.getElementById('field')
const playerElement = document.getElementById('player')


const keyDown = new Set()
document.addEventListener('keydown', (key) => {
    keyDown.add(key.code)
})

document.addEventListener('keyup', (key) => {
    keyDown.delete(key.code)
})

const player = { x: 0 }

/** @param {{ x: number }} player */
const drawPlayer = (player) => {
    playerElement.style.left = `${player.x}%`
}

const checkMove = () => {
    if (keyDown.has('ArrowLeft')) {
        return -1
    }
    if (keyDown.has('ArrowRight')) {
        return 1
    }
    return 0
}

let bulletFired = false
/** @type {HTMLDivElement}*/
let bulletElement
const initialBulletHeight = 7
let bulletHeight = 7
const bulletSpeed = 100
// const bullet = 0
const checkShoot = () => {
    if (keyDown.has('Space') && !bulletFired) {
        return true
    }
    return false
}

const createBullet = (startX) => {
    bulletElement = document.createElement('div')
    bulletElement.style.position ='absolute'
    bulletElement.style.width = '1%'
    bulletElement.style.height = '1%'
    bulletElement.style.backgroundColor = 'white'
    bulletElement.style.left = `${startX+5}%`
    
    field.append(bulletElement)
    bulletHeight = initialBulletHeight
    bulletFired = true
}

const moveBullet = (delta) => {
    bulletHeight += delta * bulletSpeed
    bulletElement.style.bottom = `${bulletHeight}%`
    // Check for collision

    // Check for hitting the top of the screen
    if (bulletHeight >= 100) {
        bulletFired = false
        bulletElement.remove()
    }
}

const enemies = new Set()
const enemySpeed = 20

const createEnemy = () => {
    if (enemies.size > 10) return
    const enemyElement = document.createElement('div')
    const xPosition = enemies.size * 7
    enemyElement.className = 'enemy'
    enemyElement.style.left = `${xPosition}%`
    enemyElement.style.top = `5%`
    enemies.add({position: {x: xPosition, y: 5, moveRight: true}, element: enemyElement})
    field.append(enemyElement)
}

const drawEnemy = ({position, element}) => {
    element.style.left = `${position.x}%`
    element.style.top = `${position.y}%`
}

// Move enemy, somehow
const moveEnemies = (delta) => {
    enemies.forEach((enemyObject => {
        const direction = enemyObject.position.moveRight ? 1 : -1
        enemyObject.position.x += (delta * enemySpeed * direction)
        if (enemyObject.position.x > 100-7) {
            enemyObject.position.x = 100-7
            enemyObject.position.moveRight = false
            enemyObject.position.y += 7
        }
        if (enemyObject.position.x < 0) {
            enemyObject.position.x = 0
            enemyObject.position.moveRight = true
            enemyObject.position.y += 7
        }

        drawEnemy(enemyObject)
    }))
}

const handleCollisions = () => {
    const toDelete = []
    // Can we do this just with the elements?
    /** @type {DOMRect} bulletBox */
    const bulletBox = bulletElement.getBoundingClientRect()
    enemies.forEach((store) => {
        /** @type {HTMLDivElement} */
        const enemyElement = store.element
        const enemyBox = enemyElement.getBoundingClientRect()
        // If bullet within enemy space
        if (bulletBox.x >= enemyBox.left && bulletBox.y >= enemyBox.top &&
            bulletBox.x <= enemyBox.right && bulletBox.y <= enemyBox.bottom) {
            toDelete.push(store)
        }
    })

    if (toDelete.length) {
        toDelete.forEach(enemy => {
            enemy.element.remove()
            enemies.delete(enemy)
        })
        bulletElement.remove()
        bulletFired = false
    }
}

// Game Loop
{
    const maxEnemyTime = 5
    let enemyTimer = maxEnemyTime
    const speed = 60
    let last
    /** @param {DOMHighResTimeStamp} timestamp */
    const step = (timestamp) => {
        if (last === undefined) last = timestamp
        
        const delta = (timestamp - last)/1000
        last = timestamp

        // Check player movement
        const x = checkMove()
        player.x = player.x + (speed * x * delta)

        // Check for bullet firing
        if (checkShoot()) {
            createBullet(player.x)
        }

        // player.y = player.y + (speed * y * delta)
        drawPlayer(player)
        if (bulletFired) moveBullet(delta)

        enemyTimer -= delta
        if (enemyTimer < 0) {
            createEnemy()
            enemyTimer = maxEnemyTime
        }

        if (enemies.size) {
            moveEnemies(delta)
        }

        if (bulletFired) handleCollisions()

        window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step)
}