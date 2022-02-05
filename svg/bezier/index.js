const draw = document.getElementById('draw')
const controls = document.getElementById('controls')

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

let dx = 50
let dy = 0

const bezierPath = makeSvgElem('path')
bezierPath.setAttribute('d', `M 0 50 q ${dx} ${dy} 100 0`)
bezierPath.style.fill = 'green'
bezierPath.style.stroke = 'green'

draw.append(bezierPath)

{
    const dyControls = document.createElement('input')
    dyControls.type = 'range'
    dyControls.min = -50
    dyControls.max = 50
    dyControls.value = 0

    dyControls.oninput = (v) => {
        dy = v.target.value
        bezierPath.setAttribute('d', `M 0 50 q ${dx} ${dy} 100 0`)
    }

    const dxControls = document.createElement('input')
    dxControls.type = 'range'
    dxControls.min = 0
    dxControls.max = 100
    dxControls.value = 50
    dxControls.oninput = (v) => {
        dx = v.target.value
        bezierPath.setAttribute('d', `M 0 50 q ${dx} ${dy} 100 0`)
    }

    controls.append(dxControls, dyControls)
}