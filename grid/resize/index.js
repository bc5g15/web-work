const tileGrid = document.getElementById('grid')
const controls = document.getElementById('controls')

/** @param {Node} elem */
const emptyNode = (elem) => {
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild)
    }
}

let width = 10
let height = 11
let scale = 1

const populateGrid = () => {
    for (let j = 0; j < height; j++){
        for (let i = 0; i < width; i++) {
            const tile = document.createElement('div')
            tile.style.width = `${scale}px`
            tile.style.height = `${scale}px`
            tile.style.gridRow = j+1
            tile.style.gridColumn = i+1
            tile.style.backgroundColor = `hsl(${i+j}, 100%, 50%)`
            tileGrid.append(tile)
        }
    }
}

// Create controls 
{
    const gridWidth = document.createElement('input')
    gridWidth.type = 'number'
    const gridHeight = document.createElement('input')
    gridHeight.type = 'number'
    const scaleInput = document.createElement('input')
    scaleInput.type = 'number'
    const submit = document.createElement('button')
    submit.innerText = 'change'
    submit.onclick = () => {
        emptyNode(tileGrid)
        width = parseInt(gridWidth.value, 10)
        height = parseInt(gridHeight.value, 10)
        scale = parseInt(scaleInput.value, 10)
        // grid.style
        tileGrid.style.gridTemplateColumns = `repeat(${width}, ${scale}px)`
        tileGrid.style.gridTemplateRows = `repeat(${height}, ${scale}px)`
        populateGrid()
    }

    controls.append(gridWidth, gridHeight, scaleInput, submit)
}