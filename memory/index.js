const game = document.getElementById('playarea')
const randomRange = (max) => (Math.floor(Math.random() * max))
const stringify = (x, y) => `${x},${y}`

const shuffle = (arr) => {
    const na = Array(...arr)
    for (let i = 0; i < na.length-1; i++) {
        const j = randomRange(na.length - i) + i
        const temp = na[i]
        na[i] = na[j]
        na[j] = temp
    }
    return na
}

const stageWidth = parseInt(getComputedStyle(game).getPropertyValue('--width'))
const stageHeight = parseInt(getComputedStyle(game).getPropertyValue('--height'))
game.style.width = (2 * stageWidth) + 'em'
game.style.height = (2 * stageHeight) + 'em'

// Let's have the elements be letters for now
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const grid = {}

let knownElem = false
let animating = false

const animateFlipOver = async (elem, letter) => {
    const a = elem.animate([
        { transform: 'scaleX(1)' },
        { transform: 'scaleX(0)'}
    ], 200)

    await a.finished

    elem.innerText = letter

    elem.animate([
        { transform: 'scaleX(0)' },
        { transform: 'scaleX(1)' }
    ], 200)
}

const reveal = async ({elem, letter}) => {
    const delay = (time) => new Promise(resolve => {
        setTimeout(() => resolve(), time)
    })
    if (animating) {
        return
    }

    await animateFlipOver(elem, letter)

    if (!knownElem) {
        knownElem = {
            letter,
            elem
        }
    } else {
        // Compare the two and check for the same or now.
        if (letter === knownElem.letter) {
            // correct, keep them both open
            knownElem.elem.onclick = () => {}
            elem.onclick = () => {}
            knownElem = false
        } else {
            await delay(200)
            animateFlipOver(elem, '')
            await animateFlipOver(knownElem.elem, '')
            knownElem = false
        }
    }
}

{
    const poss = []
    for (let x = 1; x <= stageWidth; x++) {
        for (let y = 1; y <= stageHeight; y++) {
            poss.push([x,y])
        }
    }

    const choices = shuffle(poss)

    for (let letter of alphabet) {
        const elem = document.createElement('div')
        elem.className = 'card'
        
        const [x, y] = choices.pop()
        const [x2, y2] = choices.pop()
        elem.style.gridColumn = x
        elem.style.gridRow = y
        // elem.innerText = letter
        const s1 = {elem, letter}
        elem.onclick = () => reveal(s1)
        game.appendChild(elem)
        // elem.animate([
        //     {transform: 'scaleX(0)'},
        //     {transform: 'scaleX(1)'}
        // ], 1000)

        const e2 = document.createElement('div')
        e2.className = 'card'
        e2.style.gridColumn = x2
        e2.style.gridRow = y2
        // e2.innerText = letter
        const s2 = {elem: e2, letter}
        e2.onclick = () => reveal(s2)
        game.appendChild(e2)
    }
}