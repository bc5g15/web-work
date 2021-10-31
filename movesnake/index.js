

const line = [];
const children = [];

const buildSnake = () => {
    const head = document.createElement('code');
    head.className = 'snake';
    head.innerText = 'S';
    document.body.appendChild(head);
    // Make children
    const letters = 'NEK';
    for (let i = 0; i < letters.length; i++) {
        const child = document.createElement('code');
        child.className = 'snake';
        child.innerText = letters[i];
        document.body.appendChild(child);
        children.push(child);
    }
    return head;
}

const snake = buildSnake();

const positionRecord = [];
const addPosition = (x, y) => {
    const max = 200;
    positionRecord.unshift({x, y});
    if (positionRecord.length > max) {
        positionRecord.pop()
    }
}
const getPosition = (index) => positionRecord[index] ?? '0px';


let itemcount = 1;
let x = 0;
let y = 0;
const ix = 100;
const iy = 100;

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

const snakeMove = () => {
    const speed = 2;
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
    snake.style.left = ix + (x * speed) + 'px'
    snake.style.top = iy + (y * speed) + 'px'
}

const updateChildren = () => {
    children.forEach((c, i) => {
        const pos = getPosition((i+1) * 20);
        console.log(pos);
        c.style.left = pos.x;
        c.style.top = pos.y;
    })
}

const getHeadPos = () => {
    return {
        x: snake.style.left,
        y: snake.style.top
    }
}

{
    let counter = 0;
    const mainLoop = setInterval(() => {
        snakeMove()
        counter++;
        updateChildren();
            // console.log(positionRecord);
        const {x, y} = getHeadPos();
        addPosition(x, y)
    }, 1000/60);
}

