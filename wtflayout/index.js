const topelem = document.getElementById('topcontainer')

const defaultWidth = '10em'
const defaultHeight = '2em'

let currentElement = ''
let blockCount = 0
{
    // Create controls 
    const controlsContainer = document.getElementById('controls')

    const defaultElemInput = document.createElement('textarea')
    defaultElemInput.value = 
        'width: 10em; height: 2em; background-color: orange; border: .2em solid red; opacity: 60%;'
    controlsContainer.appendChild(defaultElemInput)

    const addElemButton = document.createElement('button')
    addElemButton.innerText = 'Create Element'
    addElemButton.onclick = () => createElement(currentElement, defaultElemInput.value)
    controlsContainer.appendChild(addElemButton)

    const removeElemButton = document.createElement('button')
    removeElemButton.innerText = 'Delete Element'
    removeElemButton.onclick = () => deleteElement(currentElement)
    controlsContainer.appendChild(removeElemButton)

    const displayInput = document.createElement('textarea')
    displayInput.id = 'cssrecord'
    displayInput.value = topelem.style.cssText
    controlsContainer.appendChild(displayInput)
    
    const setDisplayButton = document.createElement('button')
    setDisplayButton.innerText = 'Set Style'
    setDisplayButton.onclick = () => setStyle(currentElement, displayInput.value)
    controlsContainer.appendChild(setDisplayButton)
}

const createElement = (rootElemId, elemStyle) => {
    if (!rootElemId) return
    const elem = document.createElement('div')
    elem.id = `block${blockCount++}`
    elem.style = elemStyle
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

const deleteElement = (elemId) => {
    if (elemId !== topelem.id) {
        const elem = document.getElementById(elemId)
        const eParent = elem.parentElement
        eParent.removeChild(elem)
        currentElement = false
    }
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
