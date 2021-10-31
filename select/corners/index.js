const selector = document.getElementById('selector')
const stringify = (x, y) => `${x},${y}`

// selector.onclick = (e) => {
//     console.log(e);
// }

const size = 10

let selecting = false
const blocks = {}

let start = []
let current = []

const draw = (c1, c2) => {
    // clear existing
    for (let key in blocks) {
        blocks[key].style.background = 'white'
    }

    const [x1, y1] = c1
    const [x2, y2] = c2

    const xdir = Math.sign(x2-x1) || 1
    const ydir = Math.sign(y2-y1) || 1
    for (let x = x1; x!==(x2 + xdir); x = x + xdir) {
        for (let y = y1; y!==(y2 + ydir); y = y + ydir) {
            blocks[stringify(x,y)].style.background = 'blue'
        }
    }
}

const handle = ({x, y, block}) => {
    if (!selecting) return;
    // console.log(x,y)

    if (!start) {
        start = [x, y]
        current = [x, y]
        return;
    }

    // if (!current) {
    //     current = [x, y]
    // }
    
    const [ox, oy] = current
    if (ox !== x || oy !== y) {
        current = [x,y]
        draw(start, current)
    }
}

for (let x = 1; x <= size; x++) {
    for (let y = 1; y<=size; y++) {
        const block = document.createElement('div')
        block.className = 'selectionBlock'
        const state = {
            x,
            y,
            block
        }
        block.onmousemove = () => handle(state)
        selector.appendChild(block)
        blocks[stringify(x,y)] = block
    }
}

selector.onmousedown = () => {
    for (let key in blocks) {
        blocks[key].style.background = 'white'
    }
    selecting = true
    start = false
    current = false
}

selector.onmouseup = () => {
    selecting = false
    
}