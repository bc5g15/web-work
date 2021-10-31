const game = document.querySelector('.gamearea')
const randomRange = (max) => Math.floor(Math.random() * max)
const randomMember = (arr) => arr[Math.floor(Math.random() * arr.length)]
const stringify = (x, y) => `${x},${y}`

const width = 20
const height = 15

const colours = [
    'red',
    'blue',
    'green',
    'purple',
    // 'orange',
]

const helper = document.querySelector('.helper')
for (let col of colours) {
    const colblock = document.createElement('div')
    colblock.style.width = '2em'
    colblock.style.height = '2em'
    colblock.style.background = col
    helper.appendChild(colblock)
}

const grid = {}

const breakBlocks = (x, y) => {
    // const adjacent = (x, y) => ([
    //     [x+1, y],
    //     [x-1, y],
    //     [x, y+1],
    //     [x, y-1]
    // ])

    const adjacent = (x, y) => {
        const out = []
        if (x<width)    out.push([x+1, y])
        if (x>1)        out.push([x-1, y])
        if (y<height)   out.push([x, y+1])
        if (y>1)        out.push([x, y-1])
        return out
    }

    const {colour} = grid[stringify(x, y)]
    // Recursively find adjacent blocks of the same colour
    const correct = new Set()
    const adjacentBlocks = new Set()
    {
        const seen = new Set()
        seen.add(stringify(x,y))
        correct.add(stringify(x,y))
        const adj = adjacent(x, y)
        while (adj.length > 0) {
            const [a, b] = adj.pop()
            const coords = stringify(a,b)
            if (!grid[coords]) continue
            if (seen.has(coords)) continue
            seen.add(coords)
            const {colour: newCol} = grid[coords]
            if (colour !== newCol) {
                adjacentBlocks.add(coords)
                continue
            }
            correct.add(coords)
            adj.push(...adjacent(a,b).filter(([a,b]) => !seen.has(stringify(a,b))))
        }
    }

    // Don't allow single blocks to be broken
    if (correct.size === 1) {
        return
    }

    // Record the blocks that are adjacent to 'them'
    // Break the blocks of the same colour
    console.log(correct)
    const toBreak = [...correct]
    for (let coords of toBreak) {
        const {obj} = grid[coords]
        game.removeChild(obj)
        delete grid[coords]
    }
    // Switch the adjacent blocks to an incremental colour
    console.log(adjacentBlocks)
    const toSwitch = [...adjacentBlocks]
    for (let coords of toSwitch) {
        const {obj, sub, colour} = grid[coords]
        let newColour = (colour + 1) % colours.length
        obj.style.backgroundColor = colours[newColour]
        // obj.innerText = newColour
        sub.style.backgroundColor = colours[(newColour + 1) % colours.length]
        grid[coords] = {obj, sub, colour: newColour}
        
    }
}

const makeBlock = (x, y) => {
    const col = randomRange(colours.length)
    const block = document.createElement('div')
    block.className = 'block'
    block.style.gridColumn = x
    block.style.gridRow = y
    block.style.backgroundColor = colours[col]
    block.style.outline = '1px solid'
    block.style.position = 'relative'
    block.onclick = () => breakBlocks(x, y)
    // block.innerText = col

    const subBlock = document.createElement('div')
    subBlock.style.width = '1em'
    subBlock.style.height = '1em'
    subBlock.style.background = colours[(col + 1) % colours.length]
    subBlock.style.position = 'absolute'
    subBlock.style.right = 0
    subBlock.style.bottom = 0
    subBlock.style.outline = '1px solid black'
    block.appendChild(subBlock)
    game.appendChild(block)
    grid[stringify(x,y)] = {
        obj: block,
        sub: subBlock,
        colour: col
    }
}

const fillGrid = () => {
    for (let x = 1; x <= width; x++) {
        for (let y = 1; y <= height; y++) {
            makeBlock(x, y)
        }
    }
}

fillGrid()