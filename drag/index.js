const drag1 = document.getElementById('drag1')
const drag2 = document.getElementById('drag2')
const zone1 = document.getElementById('zone1')
const zone2 = document.getElementById('zone2')

/**
 * 
 * @param {DragEvent} ev 
 */
function ondrag(ev) {
    console.log(ev)
    ev.dataTransfer.setData('me', ev.target.id)
    ev.dataTransfer.effectAllowed = 'move'
}

drag1.addEventListener('dragstart', ondrag);
drag2.addEventListener('dragstart', ondrag);

/** @param {DragEvent} ev */ 
function onhover(ev) {
    ev.preventDefault()
    ev.dataTransfer.dropEffect = 'move'
}

/** @param {DragEvent} ev */
function dragenter(ev) {
    const elem = document.getElementById(ev.target.id)
    elem.style.backgroundColor = 'green'
}

/** @param {DragEvent} ev */
function dragleave(ev) {
    const elem = document.getElementById(ev.target.id)
    elem.style.backgroundColor = ''
}

/** @param {DragEvent} ev */
function ondrop(ev) {
    ev.preventDefault()
    console.log(`Dropped at ${ev.target.id} with ${ev.dataTransfer.getData('me')}`)
    const elem = document.getElementById(ev.target.id)
    elem.innerText = `Dropped element ${ev.dataTransfer.getData('me')}`
    elem.style.backgroundColor = ''
}
zone1.addEventListener('dragover', onhover)
zone2.addEventListener('dragover', onhover)

zone1.addEventListener('dragenter', dragenter)
zone2.addEventListener('dragenter', dragenter)
zone1.addEventListener('dragexit', dragleave)
zone2.addEventListener('dragexit', dragleave)

zone1.addEventListener('drop', ondrop)
zone2.addEventListener('drop', ondrop)