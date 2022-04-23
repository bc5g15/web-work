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
    width: 500,
    height: 500
})

document.body.append(root)

const commonTraits = {
    fill: 'blue',
    stroke: 'white',
    'stroke-width': 5
}

// Trapezoidal block
const block = createShape('path', {
    d: "M 20 20 h 20 l 5 20 h -30 z",
    ...commonTraits
})

root.append(block)

// Think about when to use absolute positioning or offset

// Cubic curve
const cubicCurve = createShape('path', {
    ...commonTraits,
    d: "M 50 30 c 0 10 20 10 20 0"
})
root.append(cubicCurve)
