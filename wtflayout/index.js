const topelem = document.getElementById('topcontainer')

const defaultWidth = '10em'
const defaultHeight = '2em'

let currentElement = ''
let blockCount = 0
{
    // Create controls 
    const controlsContainer = document.getElementById('controls')
    const addElemButton = document.createElement('button')
    addElemButton.innerText = 'Create Element'
    addElemButton.onclick = () => createElement(currentElement)
    controlsContainer.appendChild(addElemButton)

    const displayInput = document.createElement('textarea')
    displayInput.id = 'cssrecord'
    displayInput.value = topelem.style.cssText
    controlsContainer.appendChild(displayInput)
    
    const setDisplayButton = document.createElement('button')
    setDisplayButton.innerText = 'Set Style'
    setDisplayButton.onclick = () => setStyle(currentElement, displayInput.value)
    controlsContainer.appendChild(setDisplayButton)
}

const createElement = (rootElemId) => {
    if (!rootElemId) return
    const elem = document.createElement('div')
    elem.id = `block${blockCount++}`
    elem.style.width = defaultWidth
    elem.style.height = defaultHeight
    elem.className = 'block'
    elem.onclick = (ev) => selectElement(ev, elem.id)

    document.getElementById(rootElemId).appendChild(elem)
}

const selectElement = (ev, elemId) => {
    ev.stopPropagation()
    if (currentElement) {
        const oldElem = document.getElementById(currentElement)
        oldElem.style.outline = ''
    }
    const elem = document.getElementById(elemId)
    elem.style.outline = '1em solid purple'
    currentElement = elemId;
    document.getElementById('cssrecord').value = elem.style.cssText
}

const setDisplay = (elemId, displaySetting) => {
    const elem = document.getElementById(elemId)
    elem.style.display = displaySetting
}

const setStyle = (elemId, styleString) => {
    const elem = document.getElementById(elemId)
    elem.style = styleString
}

topelem.onclick = (ev) => selectElement(ev, 'topcontainer')
