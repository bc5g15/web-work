const gamearea = document.getElementById('gamearea')
const randomRange = (max) => (Math.floor(Math.random() * max))
const stringify = (x, y) => `${x},${y}`

// display backdrop
const backdrop = document.getElementById('backdrop')
for (let i = 0; i < 16; i++) {
    const bit = document.createElement('div')
    bit.className = 'backblock'
    backdrop.append(bit)
}

const grid = {}

// let x = 0;
// let y = 0;

const ratio = 3
const gridsize = 4
const gridstart = 0

const makeBlock = (x, y) => {
    const block = document.createElement(div)
    block.className = 'block'
    block.style.left = x * ratio + 'em'
    block.style.top = y * ratio + 'em'
    block.innerText = 2
    return {
        elem: block,
        value: 2
    }
}

// const block = document.createElement('div')
// block.className = 'block'
// block.style.left = '0'
// block.style.top = '0'
// block.style.transition
// block.innerText = '2'
// gamearea.appendChild(block)

{
    const x = randomRange(gridsize)
    const y = randomRange(gridsize)
    const introBlock = makeBlock(x, y)
    grid[stringify(x,y)] = introBlock
}

document.addEventListener('keydown', (event) => {
    const gend = gridsize -1
    let direction = []
    let xdir = 1
    let xstart = gridstart
    let xend = gend
    let ydir = 1
    let ystart = gridstart
    let yend = gend
    let priorityx = true;
    switch (event.key) {
        case 'ArrowRight':
            // direction = [1,0]
            // xdir = 1
            // xstart = gridstart
            // xend = gridsize
            break
        case 'ArrowLeft':
            // direction = [-1,0]
            xdir = -1
            xstart = gend
            xend = gridstart
            break
        case 'ArrowUp':
            // direction =[0,-1]
            ydir = -1
            ystart = gend
            yend = gridstart
            priorityx = false
            break
        case 'ArrowDown':
            // direction = [0,1]
            priorityx = false
            break
    }

    // for (let x = xstart; x !== xend; x = x + xdir) {
    //     for (let y = ystart; y !== yend; y = y + ydir) {

    //     }
    // }

    if (event.key === 'ArrowRight') {
        for (let x = gend; x >= gridstart; x--) {
            for (let y = gridstart; y < gridsize; y++) {
                
            }
        }
    }

    
    // elem.style.gridColumn = x;
    // elem.style.gridRow = y;
    // elem.style.transform = `translateX(${x}em) translateY(${y}em)`
    // block.style.left = x* ratio + 'em'
    // block.style.top = y*ratio + 'em'
    // elem.style.transform = `rotate(${(x+y)*90}deg)`
    // cons
    // console.log(elem.style.gridColumn, elem.style.gridRow)
})