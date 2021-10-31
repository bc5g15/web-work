const randomRange = (min, max) => (Math.floor(Math.random() * max + min))

const wrapper = document.querySelector('.wrapper')

const makeSnake = (length, startx, starty) => {
    if (length > 0) {
        const head = {}
        const node = document.createElement('code')
        node.style.backgroundColor = 'black'
        node.style.gridColumn = startx
        node.style.gridRow = starty
        wrapper.appendChild(node);
        head.node = node
        head.child = makeSnake(length-1, startx-1, starty)
        return head;
    }
    return null;
}

let x = 5;
let y = 6;
let length = 4;

const width = 20;
const height = 20;

let snake = makeSnake(length, x, y)

let currentDir = 'right';

const inputHandler = document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            currentDir = 'right'
            break
        case 'ArrowLeft':
            currentDir = 'left';
            break
        case 'ArrowUp':
            currentDir = 'up'
            break
        case 'ArrowDown':
            currentDir = 'down'
            break
    }
});

const powerups = {};

const createPowerup = (x, y) => {
    const powerup = document.createElement('div')
    powerup.style.backgroundColor = 'orange'
    powerup.style.gridColumn = x
    powerup.style.gridRow = y
    wrapper.appendChild(powerup)
    powerups[x+','+y] = powerup
}

const growSnake = () => {
    // get to child
    let cur = snake
    while (cur.child) {
        cur = cur.child;
    }
    
}

const checkPowerup = (x, y) => {
    const spos = x + ',' + y
    if (powerups[spos]) {
        wrapper.removeChild(powerups[spos])
        delete powerups[spos]
        return true;
    }
    return false;
}

const snakeMove = () => {
    const iterateChild = (segment, newx, newy) => {
        const oldx = segment.node.style.gridColumn
        const oldy = segment.node.style.gridRow
        segment.node.style.gridColumn = newx
        segment.node.style.gridRow = newy
        if (segment.child) {
            iterateChild(segment.child, oldx, oldy)
        }
    }
    switch (currentDir) {
        case 'right':
            x += 1
            break
        case 'left':
            x -= 1
            break
        case 'up':
            y -= 1
            break
        case 'down':
            y += 1
            break
    }
    if (checkPowerup(x, y)) {
        // grow snake
        const newHead = {}
        const node = document.createElement('code')
        node.style.backgroundColor = 'black'
        node.style.gridColumn = x
        node.style.gridRow = y
        wrapper.appendChild(node);
        newHead.node = node
        newHead.child = snake;
        snake = newHead;
        length++
    } else {
        iterateChild(snake, x, y)
    }
}


const checkCollision = () => {
    let collide = false;
    // Wall collision
    collide = collide || 
        x < 1 ||
        y < 1 ||
        x >= 21 ||
        y >= 21
    // Snake self-collision?
    const poss = new Set()
    let cur = snake;
    while (cur) {
        const pos = 
            cur.node.style.gridColumn + ',' +
            cur.node.style.gridRow
        poss.add(pos)
        cur = cur.child
    }
    collide = collide || (poss.size !== length)
    return collide
}

createPowerup(10, 12)

{
    let counter = 0;
    let time = 200;

    const gameLoop = () => {
        snakeMove()
        counter++;
        if (checkCollision()) {
            console.log('GameOver')
            clearInterval(myLoop)
        }
        if (counter % 10 === 0) {
            createPowerup(
                randomRange(1, width-1),
                randomRange(1, height-1)
            )
        }
        if (counter % 50 === 0 && time > 50) {
            console.log('SpeedUp')
            time -= 10;
            clearInterval(myLoop)
            myLoop = declareLoop()
        }
    }

    const declareLoop = () => setInterval(gameLoop, time)
    let myLoop = declareLoop()
    
}

