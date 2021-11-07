const students = document.getElementById('students')
const chairs = document.getElementById('chairs')

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

const names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

// Create student cards
const myChoices = shuffle(names)
for(let i = 0; i < 6; i++) {
    const name = myChoices.pop()
    const elem = document.createElement('div')
    elem.className = 'studentcard'
    const nameElem = document.createElement('span')
    nameElem.innerText = name
    const ageElem = document.createElement('span')
    ageElem.style.alignSelf = 'right'
    ageElem.innerText = randomRange(200)
    elem.appendChild(nameElem)
    elem.appendChild(ageElem)
    elem.draggable = true
    elem.id=`student${i}`
    elem.ondrag = ondrag
    students.appendChild(elem)
}

// Create the chairs
for (let i = 0; i < 6; i++) {
    const chair = document.createElement('div')
    chair.className = 'chair'
    chair.ondragenter = dragenter
    chair.ondragexit = dragleave
    chair.ondrop = ondrop
    chair.ondragover = onhover
    chair.id = `chair${i}`
    chairs.appendChild(chair)
}


let id = ''
/** @param {DragEvent} ev */
function ondrag(ev) {
    id = ev.target.id
    ev.dataTransfer.effectAllowed = 'move'
}


/** @param {DragEvent} ev */ 
function onhover(ev) {
    ev.preventDefault()
    ev.dataTransfer.dropEffect = 'move'
}

/** @param {DragEvent} ev */
function dragenter(ev) {
    const elem = document.getElementById(ev.target.id)
    elem.style.backgroundColor = 'green'
}

/** @param {DragEvent} ev */
function dragleave(ev) {
    const elem = document.getElementById(ev.target.id)
    elem.style.backgroundColor = ''
}

/** @param {DragEvent} ev */
function ondrop(ev) {
    ev.preventDefault()
    const elem = document.getElementById(ev.target.id)
    elem.style.backgroundColor = ''
    elem.className = ''
    elem.ondrop = false
    elem.onhover = false
    elem.ondragenter = false
    elem.ondragexit = false
    elem.appendChild(document.getElementById(id))
}