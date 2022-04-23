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
    'fill': 'blue'
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