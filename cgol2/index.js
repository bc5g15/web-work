const paint = document.getElementById('paint')
const stringify = (x,y) => `${x},${y}`
const destringify = (s) => s.split(',').map((i) => parseFloat(i))
// const test = document.createElement('div')
// test.onmousedown;
const btnPlay = document.getElementById('play')

let drawing = false
let painting = true

let playing = false

const paintMode = document.getElementById('switchMode')
paintMode.innerText = 'Paint'
paintMode.onclick = () => {
    painting = !painting
    paintMode.innerText = painting ? 'Paint' : 'Delete'
}

const highlight = document.createElement('div')
highlight.style.outline = '1px blue solid'
paint.appendChild(highlight)

const live = {}

const removeBlock = (coords) => {
    if (coords in live) {
        paint.removeChild(live[coords])
        delete live[coords]
    }
}

const btnClear = document.getElementById('clear')
btnClear.onclick = () => {
    for (let key in live) {
        paint.removeChild(live[key])
        delete live[key]
    }
}

const createBlock = (x, y) => {
    if (stringify(x, y) in live) return
    const block = document.createElement('div')
    block.style.gridColumn = x
    block.style.gridRow = y
    block.style.backgroundColor = 'white'
    paint.appendChild(block)
    live[stringify(x,y)] = block
}

paint.onclick = (e) => {
    const posx = Math.floor(e.clientX/16)
    const posy = Math.floor(e.clientY/16)
    if (painting) {
        createBlock(posx, posy)
    } else {
        removeBlock(stringify(posx, posy))
    }
}

// game.onclick = (e) => {
//     console.log(e)
//     console.log(e.clientX, e.clientY)
//     const posx = Math.floor(e.clientX/16)
//     const posy = Math.floor(e.clientY/16)
//     createBlock(posx, posy)
    
// }

paint.onmousedown = () => {
    drawing = true
}

paint.onmouseup = () => {
    drawing = false
}

paint.onmousemove = (e) => {
    const posx = Math.ceil(e.clientX/16)
    const posy = Math.ceil(e.clientY/16)
    highlight.style.gridColumn = posx
    highlight.style.gridRow = posy

    if (!drawing) return
    
    const coords = stringify(posx, posy)
    if (painting){
        if (!(coords in live)) {
            createBlock(posx, posy)
        }
    } else {
        if (coords in live) {
            paint.removeChild(live[coords])
            delete live[coords]
        }
    }
}


/*
    Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    Any live cell with two or three live neighbours lives on to the next generation.
    Any live cell with more than three live neighbours dies, as if by overpopulation.
    Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

These rules, which compare the behavior of the automaton to real life, can be condensed into the following:

    Any live cell with two or three live neighbours survives.
    Any dead cell with three live neighbours becomes a live cell.
    All other live cells die in the next generation. Similarly, all other dead cells stay dead.
*/

const step = () => {
    console.log('working')
    const adjacent = (x, y) => [
        [x-1, y-1],
        [x, y-1],
        [x+1, y-1],
        [x-1, y],
        [x+1, y],
        [x-1, y+1],
        [x, y+1],
        [x+1, y+1]
    ]

    const liveNeighbours = (coords) => {
        // console.log(coords)
        const [x, y] = destringify(coords)
        // console.log(x, y)
        const adjs = adjacent(x, y)
        // console.log(adjs)
        return adjs.filter(([a,b]) => stringify(a,b) in live)
            .length
    }
    // Compile a list of populated spaces plus all adjacent
    const toCheck = new Set()
    for (let key in live) {
        // console.log(key)
        const [x, y] = destringify(key)
        // console.log(x, y)
        const adjs = adjacent(x, y)
        toCheck.add(stringify(x, y))
        adjs.forEach(([a, b]) => toCheck.add(stringify(a, b)))
    }
    const checklist = [...toCheck]
    // Evaluate their next state with those rules
    /*
    Any live cell with two or three live neighbours survives.
    Any dead cell with three live neighbours becomes a live cell.
    All other live cells die in the next generation. Similarly, all other dead cells stay dead.
    */
    // console.log(checklist)
    const changes = []
    for (let coords of checklist) {
        const alive = (coords in live)
        const ln = liveNeighbours(coords)
        // console.log(coords, alive, ln)
        if (alive && (ln < 2 || ln > 3)) {
            changes.push(coords)
        }
        if ((!alive) && ln === 3) {
            changes.push(coords)
        }
    }
    // console.log(changes)
    // Update the live object with the changes
    for (let coords of changes) {
        if (coords in live) {
            removeBlock(coords)
        } else {
            const [x, y] = destringify(coords)
            createBlock(x, y)
        }
    }
}

let interval = null


const stopPlay  = () => {
    btnPlay.innerText = 'Start'
    btnPlay.onclick = startPlay
    interval && clearInterval(interval)
    interval = null
}

const startPlay = () => {
    btnPlay.innerText = 'Pause'
    btnPlay.onclick = stopPlay
    interval = setInterval(step, 100)
}

btnPlay.onclick = startPlay

// paint.ondrag = (e) => {
//     console.log(e)
// }