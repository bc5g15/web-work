/*
BOTCH 3
Alternative match-3 that only clears if an element is in the middle of two different elements
*/

const randomRange = (max) => (Math.floor(Math.random() * max))
const game = document.getElementById('game')

const gridWidth = 8
const gridHeight = 8

const size = 64

const sampleRed = document.getElementById('redSource')
const sampleBlue = document.getElementById('blueSource')
const sampleGreen = document.getElementById('greenSource')
const gems = [sampleRed, sampleBlue, sampleGreen]

let grabbed = false

const onGrab = ({elem}) => {
    elem.style.backgroundColor = 'white'
}

const makeGem = (i, x, y) => {
    const elem = document.createElement('div')
    elem.style.position = 'absolute'
    elem.style.display = 'flex'
    
    const image = gems[i].cloneNode()
    image.style.width = size + 'px'
    image.style.height = size + 'px'
    elem.appendChild(image)
    const self = {
        x, y, elem, i
    }
    elem.onmousedown = () => onGrab(self)
    return self
}

const place = ({elem, x, y}) => {
    elem.style.left = `${x * size}px`
    elem.style.top = `${y * size}px`
}

for (let x = 0; x < gridWidth; x++) {
    for (let y = 0; y < gridHeight; y++) {
        const n = makeGem(randomRange(3), x, y)
        place(n)
        game.appendChild(n.elem)
    }
}
