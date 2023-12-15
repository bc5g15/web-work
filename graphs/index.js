const canvas = document.getElementById('canvas')

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d')

ctx.fillStyle = 'rgb(200, 0, 0)'
ctx.fillRect(10, 10, 50, 50)
ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
ctx.fillRect(30, 30, 50, 50)

ctx.fillStyle = 'rgb(200, 0, 0)'

const graphValues = new Array(640);

let t = 0;
setInterval(() => {
    ctx.clearRect(0,0,640,480)

    graphValues.unshift((Math.sin(t) * 100)+240)
    if (graphValues.length > 640) {
        graphValues.pop();
    }

    for( let i = 0; i < 640; i++) {
        const y = graphValues[i];
        const x = 640 - (i+1);
        ctx.fillRect(x, y, 1, 1);
    }
    t += 0.1;
}, 100)

/**
 * @param {string} name 
 * @returns 
 */
const createSVGElem = (name) => document.createElementNS('http://www.w3.org/2000/svg', name)

/**
 * @param {SVGElement} element 
 * @param {Object} attributes 
 */
const setAttributes = (element, attributes) => {
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value)
    })
}

/**
 * @param {string} name 
 * @param {Object} attributes 
 * @returns {SVGElement}
 */
const createShape = (name, attributes) => {
    const element = createSVGElem(name)
    setAttributes(element, attributes)
    return element
}

const root = createShape('svg', {
    width: 640,
    height: 480
})

document.body.append(root)

const polyline = createShape('polyline', {
    stroke: 'white',
    'stroke-width': 1
});
root.append(polyline);

setInterval(() => {
    const pathString = graphValues.reduce((acc, cur, index) => acc + `${640-(index+1)},${cur} `, '');
    polyline.setAttribute('points', pathString);
}, 100);
