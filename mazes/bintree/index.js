const root = document.getElementById('root')

const stringify = (x,y) => `${x},${y}`
const destringify = (s) => s.split(',').map(v => parseInt(v,10))

const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)]

const mazeSize = 100

const dirs = ['up','down','left','right']

const opposite = {
    'up': 'down',
    'down': 'up',
    'left': 'right',
    'right': 'left'
}

const deltas = {
    'up': [0,-1],
    'left': [-1,0],
    'right': [1,0],
    'down': [0,1]
}

const makeBlankMaze = (size) => Array(size).fill(0).map(() => Array(size).fill(0).map(() => new Set()))

const maze = makeBlankMaze(mazeSize)

// Binary Tree

const dirChoice = ['up', 'left']
maze.forEach((arr, y) => arr.forEach((cell, x) => {
    const dir = pickRandom(dirChoice)
    const [dx, dy] = deltas[dir]
    cell.add(dir)
    maze?.[y+dy]?.[x+dx]?.add(opposite[dir])
}))

// Try drawing the maze

/**
 * @param {[[Set<string>]]} maze 
 */
const displayMaze = (maze) => {
    const container = document.createElement('div')
    const height = maze.length
    const width = maze[0].length
    container.style.display = 'grid'
    container.style.gridTemplateColumns = `repeat(${width}, 1em)`
    container.style.gridTemplateRows = `repeat(${height}, 1em)`

    
    maze.forEach((arr, y) => arr.forEach((cell, x) => {
        const borderMatch = (dir) => cell.has(dir) ? '' : '.1em solid blue'
        const block = document.createElement('div')
        block.style.backgroundColor = 'white'
        block.style.borderTop = borderMatch('up')
        block.style.borderLeft = borderMatch('left')
        block.style.borderRight = borderMatch('right')
        block.style.borderBottom = borderMatch('down')
        block.style.width = '100%'
        block.style.height = '100%'
        container.append(block)
    }))
    root.append(container)
}

displayMaze(maze)