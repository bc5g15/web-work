const stack = document.getElementById('stack')
const mergeButton = document.getElementById('merge')
const addButton = document.getElementById('add')

const boxes = []

const shuffleDown = (boxes, offset) => boxes.forEach(({box}, i) => {
    box.style.bottom = `${(i+offset)*5}%`
})

const reposition = (boxes) => boxes.forEach(({box}, i) => {
    box.style.bottom = `${i*5}%`
})

const makeBox = (value, root) => {
    const box = document.createElement('div')
    box.className = 'box'
    box.innerText = value

    root.append(box)
    box.animate([
        {transform: 'translateY(-100vh)'},
        {transform: 'translateY(0)'}
    ], {
        duration: 300,
        easing: 'ease-in'
    })

    return {box, value}
}

for (let i = 0; i < 16; i++) {
    boxes.push(makeBox(2, stack))
}

reposition(boxes)

const updateValue = ({box, value}) => {
    box.innerText = value
    box.style.backgroundColor = `hsl(${value}, 100%, 50%)`
}

const merge = (boxA, boxB) => {
    boxA.value += boxB.value
    updateValue(boxA)
}

const mergeAnimation = (root, boxA, boxB) => {
    const endPosition = boxA.box.style.bottom
    boxB.box.animate([
        {bottom: endPosition,
        transform: 'scale(0)'}
    ], {
        duration: 300
    }).finished.finally(() => {
        boxA.box.innerText = boxA.value
        root.removeChild(boxB.box)
    })
}

const mergeBoxes = (boxes, root) => {
    if (boxes.length === 0) return

    const temp = []
    const merges = []
    let base = boxes.shift()

    while (boxes.length > 0) {
        let current = boxes.shift()

        if (base.value === current.value) {
            merge(base, current)
            merges.push(() => mergeAnimation(root, base, current))
            continue
        }
        temp.push(base)
        base = current
    }
    boxes.push(...temp, base)

    reposition(boxes)
    merges.forEach(e => e())
}

mergeButton.onclick = () => {
    mergeBoxes(boxes, stack)
}

addButton.onclick = () => {
    boxes.push(makeBox(2,  stack))
    reposition(boxes)
}

const addBox = () => {
    boxes.push(makeBox(2, stack))
    reposition(boxes)
}

setInterval(() => {
    addBox()
}, 800)