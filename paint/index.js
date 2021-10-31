const paint = document.getElementById('paint')
const stringify = (x,y) => `${x},${y}`
// const test = document.createElement('div')
// test.onmousedown;

let drawing = false
let painting = true

const button = document.getElementById('switchMode')
button.innerText = 'Paint'
button.onclick = () => {
    painting = !painting
    button.innerText = painting ? 'Paint' : 'Delete'
}

const live = {}

const btnClear = document.getElementById('clear')
btnClear.onclick = () => {
    for (let key in live) {
        paint.removeChild(live[key])
        delete live[key]
    }
}


const createBlock = (x, y) => {
    const block = document.createElement('div')
    block.style.gridColumn = x
    block.style.gridRow = y
    block.style.backgroundColor = 'white'
    paint.appendChild(block)
    live[stringify(x,y)] = block
}

// game.onclick = (e) => {
//     console.log(e)
//     console.log(e.clientX, e.clientY)
//     const posx = Math.floor(e.clientX/16)
//     const posy = Math.floor(e.clientY/16)
//     createBlock(posx, posy)
    
// }


paint.onmousedown = () => {
    // console.log(e)
    // const posx = Math.floor(e.clientX/16)
    // const posy = Math.floor(e.clientY/16)
    // createBlock(posx, posy)
    drawing = true
}

paint.onmouseup = () => {
    drawing = false
}

paint.onmousemove = (e) => {
    if (!drawing) return
    
    const posx = Math.floor(e.clientX/16)
    const posy = Math.floor(e.clientY/16)
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

// paint.ondrag = (e) => {
//     console.log(e)
// }