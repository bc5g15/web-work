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

const spawnTwoBlock = (grid, root) => {
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

    // const newGrid = cloneGrid(grid)

    const [top, left] = possiblePositions[randomInt(possiblePositions.length)]
    const block = makeBlock(top, left, 2)
    grid[top][left] = block
    root.append(block.block)
    block.block.animate([
        {transform: 'scale(0)'},
        {transform: 'scale(100%)'}
    ], {
        duration: 300
    })
}

const reposition = (grid) => grid.forEach((line, top) => line.forEach((item, left) => {
    if (!item) return
    const {block: block} = item
    block.style.top = `${top * 25}%`
    block.style.left = `${left * 25}%`
}))

const mergeAnimation = (blockA, blockB) => {
    const endTop = blockA.style.top
    const endLeft = blockA.style.left
    blockB.animate([
        {left: endLeft,
        top: endTop,
        transform: 'scale(0)'}
    ], {
        duration: 300
    }).finished.finally(() => {
        blockB.remove()
    })
}

// Assume we always shift towards 0
const mergeLine = (line) => {
    if (line.length === 0) return
    if (line.every(a => a===null)) return

    const merge = (blockA, blockB) => {
        blockA.value += blockB.value
        const {block, value} = blockA
        block.innerText = value
    }


    const temp = []
    const merges = []

    const nulls = []
    let base = false
    let current = false
    while (line.length > 0) {
        current = line.pop()
        if (current === null) {
            nulls.push(current)
            continue
        }

        if (!base) {
            base = current
            continue
        }

        if (base.value === current.value) {
            merge(base, current)
            console.log(base, current)
            // merges.push(() => mergeAnimation(root, base.block, current.block))
            merges.push([base, current])
            // mergeAnimation(root, base.block, current.block)
            nulls.push(null)
            temp.push(base)
            base = false
            continue
        }
        temp.push(base)
        base = current
    } 

    temp.reverse()
    if (base) {
        line.push(base, ...temp, ...nulls)
    } else {
        line.push(...temp, ...nulls)
    }
    return merges
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

document.addEventListener('keydown', (key) => {
    const knownKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
    if (!knownKeys.includes(key.code)) return
    let merges = []
    const shifts = {
        'ArrowLeft': () => {
            merges = grid.flatMap(line => mergeLine(line))
        },
        'ArrowRight': () => {
            merges = grid.flatMap(line => {
                line.reverse()
                const m = mergeLine(line, field)
                line.reverse()
                return m
            })
        },
        'ArrowUp': () => {
            const regrid = [[], [], [], []]
            grid.forEach((line, top) => line.forEach((block, left) => {
                regrid[left][top] = block
            }))

            merges = regrid.flatMap(line => mergeLine(line))

            regrid.forEach((line, top) => line.forEach((block, left) => {
                grid[left][top] = block
            }))
        },
        'ArrowDown': () => {
            const regrid = [[], [], [], []]
            grid.forEach((line, top) => line.forEach((block, left) => {
                regrid[left][top] = block
            }))

            merges = regrid.flatMap(line => {
                line.reverse()
                const m = mergeLine(line)
                line.reverse()
                return m
            })

            regrid.forEach((line, top) => line.forEach((block, left) => {
                grid[left][top] = block
            }))
        }
    }
    shifts[key.code]()
    console.table(grid)
    merges.filter(i => i !== undefined).forEach(([a, b]) => mergeAnimation(a.block, b.block))
    reposition(grid)
    spawnTwoBlock(grid, field)
})