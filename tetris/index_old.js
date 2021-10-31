const wrapper = document.querySelector('.wrapper')
const randomRange = (max) => (Math.floor(Math.random() * max))

const shapes = [
    // T
    {
        pivot: [1, 0],
        points: [
            [0,0],
            [1,0],
            [2,0],
            [1,1]
        ],
        colour: 'green'
    },
    // Line
    {
        pivot: [0, 0],
        points: [
            [0,0],
            [0,1],
            [0,2],
            [0,3]
        ],
        colour: '#34ebd8'
    }
]

// const shape = {
//     pivot: [1,0],
//     points: [
//         [0,0],
//         [1,0],
//         [2,0],
//         [1,1]
//     ],
//     colour: 'green'
// }
const height = 20
const width = 10
const roof = 1
const middle = 4
let playerX = middle
let playerY = roof

const addShape = (shape) => {
    console.log(shape.points)
    const objs = shape.points.map(([x,y]) => {
        const elem = document.createElement('div')
        elem.style.background = shape.colour
        elem.style.gridColumn = x + playerX
        elem.style.gridRow = y + playerY
        elem.style.outline = '1px groove'
        // elem.style.border = '1px groove'
        wrapper.appendChild(elem)
        return [x, y, elem]
    })
    // const elem = document.createElement('div')
    // elem.style.background = shape.colour;
    return {
        pivot: shape.pivot,
        points: objs,
    }
}

const move = (shape) => {
    shape.points.forEach(([x,y,o]) => {
        o.style.gridColumn = x + playerX
        o.style.gridRow = y+playerY
    })
}

const applyPoints = (shape, points) => {
    for (let i = 0; i<shape.points.length && i<points.length; i++) {
        const [x, y] = points[i]
        const o = shape.points[i][2]
        shape.points[i] = [x, y, o]
    }
    move(shape)
}

const clockwise = (x, y, px, py) => {
    return [(-(y-py))+px, (x-px)+py]
}

const counterclockwise = (x, y, px, py) => {
    return [(y-py)+px, -(x-px)+py]
}

const rotate = (shape, rotation) => {
    const [px, py] = shape.pivot
    // console.log(px, py)
    const newPoints = shape.points.map(([x, y, o]) => 
    {
        const [newX, newY] = rotation(x,y,px,py)
        // const newX = (-(y-py)) + px
        // const newY = ((x-px)) + py
        // Set position elsewhere
        // o.style.gridColumn = newX + playerX
        // o.style.gridRow = newY + playerY 
        return [newX, newY]
    })
    return newPoints
}

const getPoints = (shape) => shape.points.map(([x, y]) => [x, y])
const globaliseShape = (shape) => shape.points.map(([x, y, o]) => [x+playerX, y+playerY, o])
const stringify = (x, y) => `${x},${y}`

const occupied = {}

const willCollide = (points, nx, ny) => {
    // points.forEach(([x, y]) => {
    for (let [x, y] of points) {
        const x1 = x + nx
        const y1 = y + ny
        if (x1 > width ||
            x1 < 1 ||
            y1 > height ||
            y1 < 0 ||
            (stringify(x1, y1) in occupied)) {
                return true
            }
    }
    return false
}

const shapeStack = Array(5).fill(0).map(() => shapes[randomRange(shapes.length)])


let active = addShape(shapes[1])

// Player input handling
let inputFlag = ''
document.addEventListener('keydown', (event) => {
    // let points = getPoints(active)
    // let nx = playerX
    // switch (event.key){
    //     case ' ':
    //         points = rotate(active, clockwise);
    //         break;
    //     case 'z':
    //         points = rotate(active, clockwise)
    //         break;
    //     case 'x':
    //         points = rotate(active, counterclockwise)
    //         break;
    //     case 'ArrowLeft':
    //         nx = playerX - 1
    //         break;
    //     case 'ArrowRight':
    //         nx = playerX + 1
    //         break;
    //     case 'ArrowDown':
    //         yTick()
    //         break
    //     case 'ArrowUp':
    //         instaDrop()
    //         break
    // }
    // if (!willCollide(points, nx, playerY)) {
    //     playerX = nx
    //     applyPoints(active, points)
    // }
    inputFlag = event.key
})

const clearAndShuffle = (rows) => {
    for (let y of rows) {
        // delete row
        for (let x = 1; x <= width; x++) {
            const coords = stringify(x, y)
            const o = occupied[coords]
            wrapper.removeChild(o)
            delete occupied[coords]
        }
        // Shuffle rows above
        for (let y2 = y; y2 > roof; y2--) {
            for (let x = 1; x <= width; x++) {
                const coords = stringify(x, y2)
                if (occupied[coords]) {
                    let o = occupied[coords]
                    delete occupied[coords]
                    o.style.gridRow = y2+1
                    occupied[stringify(x, y2+1)] = o
                }
            }
        }
    }
}

const checkForRows = () => {
    const passingRows = []
    for (let y = 1; y <=height; y++) {
        let passed = true
        for (let x = 1; x <= width; x++) {
            if (!(stringify(x, y) in occupied)) {
                passed = false
                break
            }
        }
        if (passed) {
            passingRows.push(y)
        }
    }
    return passingRows
}

const lock = () => {
    const lockPoints = globaliseShape(active)
    lockPoints.forEach(([x, y, o]) => {
        occupied[stringify(x, y)] = o
    })
    // Check for row completion
    const rows = checkForRows()
    // console.log(rows)
    clearAndShuffle(rows)
    playerX = middle
    playerY = roof
    // pick shape
    active = addShape(shapeStack.pop())
    shapeStack.push(shapes[randomRange(shapes.length)])
}

const instaDrop = () => {
    const points = getPoints(active)
    let ny = playerY
    let blocked = willCollide(points, playerX, ny)
    while (!blocked) {
        ny++
        blocked = willCollide(points, playerX, ny)
    }
    ny--;
    playerY = ny
    move(active)
    lock()
}

const yTick = () => {
    const ny = playerY + 1
    if (!willCollide(getPoints(active), playerX, ny)) {
        playerY = ny
        move(active)
    } else {
        lock()
    }
}
// Time ticker to go downwards
{
    let yCount = 0
    const gameLoop = setInterval(() => {
        yCount ++
        if (yCount > 60) {
            yCount = 0
            yTick()
            console.log(active)
        }

        let points = getPoints(active)
        let nx = playerX

        switch (inputFlag){
            case ' ':
                points = rotate(active, clockwise);
                break;
            case 'z':
                points = rotate(active, clockwise)
                break;
            case 'x':
                points = rotate(active, counterclockwise)
                break;
            case 'ArrowLeft':
                nx = playerX - 1
                break;
            case 'ArrowRight':
                nx = playerX + 1
                break;
            case 'ArrowDown':
                yTick()
                break
            case 'ArrowUp':
                yCount = 0
                instaDrop()
                break
        }
        if (!willCollide(points, nx, playerY)) {
            playerX = nx
            applyPoints(active, points)
        }
        inputFlag = null
    }, 1000/60)
}

// setInterval(yTick, 1000)
