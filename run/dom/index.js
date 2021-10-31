const game = document.getElementById('gamespace')

// Stage
const platform = document.createElement('div')
platform.style.position = 'absolute'
platform.style.left = 0
platform.style.top = '30%'
platform.style.width = '100%'
platform.style.height = '10em'
platform.style.backgroundColor = 'gray'
game.appendChild(platform)


// Player character
const playerBlock = document.createElement('div')
playerBlock.style.position = 'absolute'
playerBlock.style.width = '5%'
playerBlock.style.height = '5%'
playerBlock.style.left = '50%'
playerBlock.style.bottom = '70%'
playerBlock.style.backgroundColor = 'red'
game.appendChild(playerBlock)
// playerBlock.offsetHeight


const player = {
    elem: playerBlock,
    x: 50,
    y: 70,
    dx: 0,
    dy: 0
}

const draw = ({x, y, elem}) => {
    elem.style.left = `${x}%`
    elem.style.bottom = `${y}%`
}

const checkCollision = ({elem: e1}, {elem: e2}) => {
    const {offsetHeight: of1, offsetWidth: ow1, offsetTop: ot1, offsetLeft: ol1} = e1
    const {offsetHeight: of2, offsetWidth: ow2, offsetTop: ot2, offsetLeft: ol2} = e2

    console.log(ot1, ol1)
}

// game loop

const rate = Math.floor(1000/60)

const floorPosition = 30
const gravity = 10

const gameLoop = async () => {
    const delay = (time) => new Promise(resolve => {
        setTimeout(() => resolve(), time)
    })

    let oldTime = Date.now()
    while (true) {
        let newTime = Date.now()
        const delta = (newTime - oldTime)/1000
        oldTime = newTime

        // Logic
        player.y -= delta * 10

        // gravity
        
        
        // Position
        // checkCollision(player, {elem: platform})

        // Draw
        draw(player)
        if (delta < rate) {
            await delay(rate-delta)
        } else {
            await delay(10)
        }
    }
}
gameLoop()