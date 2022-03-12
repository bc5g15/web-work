const field = document.getElementById('field')

const randomInt = (max) => Math.floor(Math.random() * max)

const makeBlock = (top, left, value) => {
    const block = document.createElement('div')
    block.className = 'block'
    block.innerText = value
    block.style.top = `${top * 25}%`
    block.style.left = `${left * 25}%`
    return {block, value}
}

const demoBlocks = () => {
    const positions = [0,1,2,3]
    positions.forEach(i => positions.forEach(j => {
        const block = makeBlock(i, j)
        field.append(block.block)
    }))
}

const grid = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]
]

const cloneGrid = (grid) => grid.map(i => i.map(j => j))

const spawnTwoBlock = (grid, field) => {
    const positions = [0,1,2,3]
    const possiblePositions = []
    positions.forEach(i => positions.forEach(j => {
        if (grid[i][j] === null) {
            possiblePositions.push([i, j])
        }
    }))

    if (possiblePositions.length === 0) {
        // Game Over
    }

    const newGrid = cloneGrid(grid)

    const [top, left] = possiblePositions[randomInt(possiblePositions.length)]
    const block = makeBlock(top, left, 2)
    newGrid[top][left] = block
    field.append(block.block)
    block.block.animate([
        {transform: 'scale(0)'},
        {transform: 'scale(100%)'}
    ], {
        duration: 300
    })
}

const shiftLine = (line, positionFunction) => {
    // Always assume we shift towards 0
    for (let i = 1; i < line.length; i++) {
        // If we have a block
        if (line[i]) {
            // Try to find a space for it
        }
    }
}

const shiftLeft = (grid) => {
    grid.forEach(line => {
        for (let i = 0; i < line.length; i++) {

        }
    })
}

// const drawGrid = (grid) => {
//     grid.forEach(list => list.forEach(i => {
//         if (i === null) return


//     }))
// }

// demoBlocks()

spawnTwoBlock(grid, field)