
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
    stroke: 'blue',
    fill: '#00F',
    'fill-opacity': 0.4,
    'stroke-width': 1
});
root.append(polyline);

const line2 = createShape('polyline', {
    stroke: 'red',
    fill: '#F00',
    'fill-opacity': 0.4,
    'stroke-width': 1
});
root.append(line2)

const graphValues = new Array(640);
graphValues.fill(240);

let t = 0;
setInterval(() => {
    graphValues.unshift((Math.sin(t) * 100)+240)
    if (graphValues.length > 640) {
        graphValues.pop();
    }

    let pathString = graphValues.reduce((acc, cur, index) => acc + `${640-(index+1)},${cur} `, '640, 480 ');
    pathString += ' 0, 480'
    polyline.setAttribute('points', pathString);

    let altPath = graphValues.reduce((acc, cur, index) => acc + `${640-(index+1)},${480-cur} `, '640, 480 ');
    altPath += ' 0, 480'
    line2.setAttribute('points', altPath);

    t += 0.1;
}, 100)

