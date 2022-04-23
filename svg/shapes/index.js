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

const root = createSVGElem('svg')

root.setAttribute('width', 1000)
root.setAttribute('height', 1000)


const backdrop = createSVGElem('rect')
// backdrop.setAttribute('width', '100%')
// backdrop.setAttribute('height', '100%')
// backdrop.setAttribute('fill', 'red')
setAttributes(backdrop, {
    'width': '100%',
    'height': '100%',
    'fill': 'blue'
})
root.append(backdrop)

document.body.append(root)