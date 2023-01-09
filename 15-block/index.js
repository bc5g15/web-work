const blocks = document.getElementById('blocks')

const stringify = (row, column) => `${row},${column}`

/** @param {Node} elem */
const emptyNode = (elem) => {
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild)
    }
}

const blockMap = {}

// Populate the initial block state
for (let i = 0; i < 15; i++) {
    const column = (i % 4) + 1
    const row = Math.floor(i / 4) + 1

    const elem = document.createElement('div')
    elem.innerText = `${i+1}`
    elem.style.gridColumn = column
    elem.style.gridRow = row
    elem.style.outline = '1px solid blue'
    elem.style.width = '1em'
    elem.style.height = '1em'
    blocks.append(elem)
    blockMap[stringify(row, column)] = elem
}

{
    // Add the blank tile
    const elem = document.createElement('div')
    elem.innerText = '_'
    elem.style.gridColumn = 4
    elem.style.gridRow = 4
    elem.style.outline = '1px solid orange'
    elem.style.width = '1em'
    elem.style.height = '1em'
    blocks.append(elem)
    blockMap[stringify(4, 4)] = elem
}

const reportDistortion = () => {
    const distortions = []
    const report = document.getElementById('report')
    emptyNode(report)

    for (let v in blockMap) {
        const [r, c] = v.split(',').map(t => parseInt(t, 10))
        const elem = blockMap[v]
        const i = c + ((r-1)*4)
        const value = elem.innerText === '_' ? '16' : elem.innerText
        if (value !== `${i}`) {
            distortions.push(`(${elem.innerText}, ${i})`)
        }
    }

    const d = distortions.length
    const number = document.createElement('div')
    number.innerText = `D = ${d}`
    report.append(number)

    for (let result of distortions) {
        const elem = document.createElement('div')
        elem.innerText = result
        report.append(elem)
    }
}

let column = 4
let row = 4
// Swap positions with the arrow keys
const inputHandler = document.addEventListener('keydown', (event) => {
    let deltaRow = 0
    let deltaColumn = 0
    switch (event.key) {
        case 'ArrowRight':
            deltaColumn += 1
            break
        case 'ArrowLeft':
            deltaColumn -= 1
            break
        case 'ArrowUp':
            deltaRow -= 1
            break
        case 'ArrowDown':
            deltaRow += 1
            break
    }

    const blankElem = blockMap[stringify(row, column)];
    const newRow = row + deltaRow
    const newColumn = column + deltaColumn
    if (newRow < 1 || newRow > 4 || newColumn < 1 || newColumn > 4) {
        return
    }

    const swapElem = blockMap[stringify(newRow, newColumn)]

    blankElem.style.gridRow = newRow
    blankElem.style.gridColumn = newColumn
    swapElem.style.gridRow = row
    swapElem.style.gridColumn = column

    blockMap[stringify(newRow, newColumn)] = blankElem
    blockMap[stringify(row, column)] = swapElem

    row = newRow
    column = newColumn
    reportDistortion()
})