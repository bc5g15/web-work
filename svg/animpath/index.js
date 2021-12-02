const draw = document.getElementById('draw')
const randomRange = (max) => (Math.floor(Math.random() * max))

const makePoints = () => {
    return Array(10).fill(0).map(_ => [randomRange(160), randomRange(160)])
}

/**
 * 
 * @param {string} type 
 * @returns {SVGAElement}
 */
const makeSvgElem = (type) => document.createElementNS('http://www.w3.org/2000/svg', type)

const line = makeSvgElem('polyline')

const makePath = (points) => {
    return points.map(([x, y], i) => `${i>0 ? 'L' : 'M'}${x},${y}`).join(' ')
}

const points = makePoints()
const polypoints = points.map(i => i.join(' ')).join(' ')

line.setAttribute('points', polypoints)
line.style.stroke = 'red'
draw.append(line)

// animate circle for line
const pth = makePath(points)
const str = `path('${pth}')`

const circle = makeSvgElem('circle')
circle.setAttribute('r', 10)
circle.style.fill = 'yellow'
circle.style.offsetPath = str
circle.style.animation = 'followpath 10s infinite'
console.log(circle.style.offsetPath)
console.log(str)
draw.append(circle)


const block = document.createElement('div')
block.style.widows = '1em'
block.style.height = '1em'
block.style.backgroundColor = 'blue'
block.style.offsetPath = `path('${makePath(points)}'')`


draw.append(block)