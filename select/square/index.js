const selector = document.getElementById('selector')
const stringify = (x, y) => `${x},${y}`

// selector.onclick = (e) => {
//     console.log(e);
// }

const size = 10

let selecting = false
let area = {}

const blocks = {}

const handle = ({x, y, block}) => {
    if (!selecting) return;
    console.log(x,y)

    if (!area) {
        area = {
            top: y,
            left: x,
            right: x,
            bottom: y
        }
        return;
    }

    if (x <= area.right && x >= area.left &&
        y <= area.bottom && y >= area.top) return;
    
    area.top = Math.min(area.top, y)
    area.bottom = Math.max(area.bottom, y)
    area.left = Math.min(area.left, x)
    area.right = Math.max(area.right, x)
    console.log(area)

    for (let i = area.left; i <= area.right; i++) {
        for (let j = area.top; j<=area.bottom; j++) {
            blocks[stringify(i,j)].style.background = 'blue'
        }
    }
    // console.log(x, y);
    // block.style.background = 'blue'
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
    area =false
}

selector.onmouseup = () => {
    console.log(area)
    selecting = false
    
}