const mazegrid = document.getElementById('mazearea')
const stringify = (x, y) => `${x},${y}`

const width = 10
const height = 10

mazegrid.style.width = width + 'em'
mazegrid.style.height = height + 'em'
mazegrid.style.gridTemplateColumns = `repeat(${width}, 1em)`
mazegrid.style.gridTemplateRows = `repeat(${height}, 1em)`

const grid = {}

// Fill in all the cells
for (let x = 1; x <= width; x++) {
    for (let y = 1; y <= height; y++) {
        const elem = document.createElement('div')
        elem.className = 'mazecell'
        mazegrid.appendChild(elem)
        grid[stringify(x,y)] = elem
    }
}