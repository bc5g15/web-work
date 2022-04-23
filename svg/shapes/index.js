// Reference for SVG shapes

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

const root = createSVGElem('svg')

root.setAttribute('width', 1000)
root.setAttribute('height', 600)


const backdrop = createSVGElem('rect')
setAttributes(backdrop, {
    'width': '100%',
    'height': '100%',
    'fill': '#636363'
})
root.append(backdrop)

document.body.append(root)

// Rectangle
root.append(createShape('rect', {
    x: 10,
    y: 10,
    width: 30,
    height: 30,
    stroke: 'black',
    fill: 'transparent',
    'stroke-width': 5
}))

// Rectangle Rounded Corners
root.append(createShape('rect', {
    x: 60, y: 10,
    rx: 10, ry: 10,
    width: 30, height: 30,
    stroke: 'black', fill: 'transparent',
    'stroke-width': 5
}))

// Circle
root.append(createShape('circle', {
    cx: 25, cy: 75, r: 20,
    stroke: 'red', fill: 'transparent',
    'stroke-width': 5
}))

// Ellipse
root.append(createShape('ellipse', {
    cx: 75, cy: 75, rx: 20, ry: 5,
    stroke: 'red', fill: 'transparent', 
    'stroke-width': 5
}))

// Line
root.append(createShape('line', {
    x1: 10, x2: 50, y1: 110, y2: 150,
    stroke: 'orange', 'stroke-width': 5
}))

// Polyline
root.append(createShape('polyline', {
    points: "60 110 65 120 70 115 75 130 80 125 85 140 90 135 95 150 100 145",
    stroke: 'orange',
    fill: 'transparent',
    'stroke-width': 5
}))

// Polygon
root.append(createShape('polygon', {
    points: "50 160 55 180 70 180 60 190 65 205 50 195 35 205 40 190 30 180 45 180",
    stroke: 'green',
    fill: 'green',
    'stroke-width': 5
}))

// Path
root.append(createShape('path', {
    d: "M20,230 Q40,205 50,230 T90,230",
    fill: 'none',
    stroke: 'purple',
    'stroke-width': 5
}))