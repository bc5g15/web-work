const game = document.querySelector('.gamespace')

const height = 40
const width = 80


const spawnPlayerObject = () => {
    const player = document.createElement('div')
    player.style.width = '10em'
    player.style.height = '1em'
    player.style.position = 'absolute'
    player.style.bottom = '1em'
    player.style.left = '1em'
    player.style.background = 'white'
    game.appendChild(player)
    return player
}

const spawnBall = () => {
    const ball = document.createElement('div')
    ball.style.width = '1em'
    ball.style.height = '1em'
    ball.style.position = 'absolute'
    ball.style.borderRadius = '100%'
    ball.style.background = 'white'
    ball.style.bottom = '10em'
    ball.style.left = '10em'
    game.appendChild(ball)
    return {
        obj: ball,
        x: 10,
        y: 10,
        vx: 30,
        vy: 35
    }
}

const paddle = {
    obj: spawnPlayerObject(),
    x: 1,
    y: 1,
    width: 10
}

const updateBall = (ball, delta) => {
    ball.x = ball.x + ball.vx * delta
    ball.y = ball.y + ball.vy * delta

    const vbounce = () => {
        const shift = 10
        const rand = (Math.random() * shift) - (shift/2)
        ball.vy = -ball.vy + rand
        ball.vx = ball.vx + rand
        ball.y = ball.y + ball.vy * delta
    }

    // Check collision
    if (ball.y > height) {
        // Tweak direction (somehow) and send back
        vbounce()
    }
    if (ball.y <= 1 && 
        ball.y >= 0 &&
        ball.x >= paddle.x-1 &&
        ball.x <= paddle.x + paddle.width) {
            // console.log('hit paddle?')
            // console.log(ball.x, paddle.x)
        vbounce()
    }

    // if (ball.y > height ||
    //     ball.y < 0) {
    //     ball.vy = -ball.vy
    //     ball.y = ball.y + ball.vy * delta
    // }

    if (ball.x > width ||
        ball.x < 0) {
            ball.vx = -ball.vx
            ball.x = ball.x + ball.vx * delta
        }
}

const drawBall = (ball) => {
    ball.obj.style.left = ball.x + 'em'
    ball.obj.style.bottom = ball.y + 'em'
}

const updatePosition = () => {
    paddle.obj.style.left = paddle.x + 'em'
}

let keys = new Set()
document.addEventListener('keydown', (e) => {
    keys.add(e.key)
})
document.addEventListener('keyup', (e) => {
    keys.delete(e.key)
})

// Interval Style
// {
//     const playerSpeed = 30
//     let oldTime = Date.now()
//     setInterval(() => {
//         let newTime = Date.now()
//         const delta = (newTime - oldTime)/1000
//         // console.log(delta)
//         oldTime = newTime

//         let dir = 0
//         if (keys.has('ArrowLeft')) {
//             dir = -1
//         } else if (keys.has('ArrowRight')) {
//             dir = 1
//         }

//         // Move player
//         paddle.x = paddle.x + (playerSpeed * dir * delta)
//         updatePosition()

//     }, 1000/60)
// }

const balls = []
balls.push(spawnBall())

// Game Loop Style

const rate = Math.floor(1000/60)

const gameLoop = async () => {

    const delay = (time) => new Promise(resolve => {
        setTimeout(() => resolve(), time)
    })

    const playerSpeed = 50
    let oldTime = Date.now()
    while (true) {

        let newTime = Date.now()
        const delta = (newTime - oldTime)/1000
        // console.log(delta)
        oldTime = newTime

        let dir = 0
        if (keys.has('ArrowLeft')) {
            dir = -1
        } else if (keys.has('ArrowRight')) {
            dir = 1
        }

        // Move player
        paddle.x = paddle.x + (playerSpeed * dir * delta)
        updatePosition()

        for (let ball of balls) {
            // console.log(ball)
            updateBall(ball, delta)
            drawBall(ball)
        }

        // Render during the delay
        if (delta < rate) {
            await delay(rate-delta)
        } else {
            await delay(10)
        }
        // await delay(rate)
    }
    
}
gameLoop()