const game = document.createElement('div')
document.body.appendChild(game);

const box = document.createElement('div')
box.style.position = 'absolute'
box.style.width = '10em'
box.style.height = '10em'
box.style.top = '50vh'
box.style.background = 'red'
game.appendChild(box)

let playerX = 10

let inputFlag = null
document.addEventListener('keydown', (event) => {
    inputFlag = event.key
})

document.addEventListener('keyup', () => {
    inputFlag = null
})

const playerMove = () => {
    if (inputFlag) {
        switch (inputFlag) {
            case 'ArrowRight':
                playerX += 5
                break
            case 'ArrowLeft':
                playerX -= 5
                break
        }
    }
    box.style.left = playerX + 'px'
}

{
    let counter = 0;
    const mainLoop = setInterval(() => {
        // Move the player
        playerMove()

    }, 1000/60);
}

