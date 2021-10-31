const selector = document.getElementById('selector')
const stringify = (x, y) => `${x},${y}`

// selector.onclick = (e) => {
//     console.log(e);
// }
const size = 10
const width = 10
const height = 10
const ratio = 2

// Draw backdrop
{
    const backdrop = document.getElementById('backdrop')
    for (let x = 0; x<width; x++) {
        for (let y = 0; y<height; y++) {
            const bb = document.createElement('div')
            bb.className = 'backblock'
            backdrop.appendChild(bb)
        }
    }
}

let selecting = false
const blocks = {}
const units = {}

let start = []
let current = []

const draw = (c1, c2) => {
    // clear existing
    for (let key in blocks) {
        blocks[key].style.opacity = '0%'
    }

    const [x1, y1] = c1
    const [x2, y2] = c2

    const xdir = Math.sign(x2-x1) || 1
    const ydir = Math.sign(y2-y1) || 1
    for (let x = x1; x!==(x2 + xdir); x = x + xdir) {
        for (let y = y1; y!==(y2 + ydir); y = y + ydir) {
            blocks[stringify(x,y)].style.opacity = '50%'
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

    const [ox, oy] = current
    if (ox !== x || oy !== y) {
        current = [x,y]
        draw(start, current)
    }
}

// Draw blocks
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

// Draw unit
const unitLayer = document.getElementById('unitLayer')
const makeUnit = (x, y) => {
    const unit = document.createElement('div')
    unit.className = 'unit'
    unit.style.left = ((x*ratio)-2) + 'em'
    unit.style.top = ((y*ratio)-2) + 'em'
    unitLayer.appendChild(unit)
    units[stringify(x,y)] = unit
}

makeUnit(1,1)

selector.onmousedown = () => {
    for (let key in blocks) {
        blocks[key].style.opacity = '0%'
    }
    selecting = true
    start = false
    current = false
}

const pickUnits = ([x1, y1], [x2, y2]) => {
    console.log(x1, y1, x2, y2)
    const foundUnits = []

    const xdir = Math.sign(x2-x1) || 1
    const ydir = Math.sign(y2-y1) || 1
    for (let x = x1; x!==(x2 + xdir); x = x + xdir) {
        for (let y = y1; y!==(y2 + ydir); y = y + ydir) {
            // blocks[stringify(x,y)].style.opacity = '50%'
            const addr = stringify(x, y)
            if (addr in units) {
                console.log(addr)
                foundUnits.push(units[addr])
            }
        }
    }
    return foundUnits
}

selector.onmouseup = () => {
    selecting = false
    if (current && start) {
        const foundUnits = pickUnits(current, start)
        console.log(foundUnits)
        for (let unit of foundUnits) {
            unit.style.backgroundColor = 'orange'
        }

    }
}