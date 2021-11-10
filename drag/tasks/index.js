// const students = document.getElementById('students')
// const chairs = document.getElementById('chairs')

const resources = document.getElementById('resources')
const tasks = document.getElementById('tasks')

const randomRange = (max) => (Math.floor(Math.random() * max))
const stringify = (x, y) => `${x},${y}`

const shuffle = (arr) => {
    const na = Array(...arr)
    for (let i = 0; i < na.length-1; i++) {
        const j = randomRange(na.length - i) + i
        const temp = na[i]
        na[i] = na[j]
        na[j] = temp
    }
    return na
}

const names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

// Generate resources
const resourceData = {}
const choiceNames = shuffle(names)
for (let i = 0; i < 8; i++) {
    const id = `resource${i}`
    const name = choiceNames.pop()
    const elem = document.createElement('div')
    elem.className = 'resource'
    elem.id = id
    const nameElem = document.createElement('span')
    nameElem.innerText = name
    elem.append(nameElem)

    const skill = randomRange(9) + 1
    const skillElem = document.createElement('span')
    skillElem.style.alignSelf = 'right'
    skillElem.innerText = skill

    elem.draggable = true
    elem.id = `resource${i}`
    elem.ondrag = ondrag

    resources.append(elem)

    resourceData[id] = {
        elem,
        skill,
        name,
        id
    }
}

// Generate initial tasks
const availableTasks = {}
let taskNo = 1
while (taskNo < 6) {
    const task = document.createElement('div')
    const taskId = `task${taskNo}`
    task.className = 'task'

    const taskName = document.createElement('div')
    taskName.innerText = `Task ${taskNo}`
    task.appendChild(taskName)
    
    const time = (randomRange(30) + 1) * 1000
    const taskTimer = document.createElement('div')
    taskTimer.innerText = time
    task.appendChild(taskTimer)

    const taskResources = document.createElement('div')
    taskResources.style.display = 'flex'
    task.appendChild(taskResources)

    const dropZone = document.createElement('div')
    dropZone.style.position = 'absolute'
    dropZone.style.inset = 0
    dropZone.style.opacity = '30%'
    dropZone.id = taskId
    task.appendChild(dropZone)

    dropZone.ondragenter = dragenter
    dropZone.ondragleave = dragexit
    dropZone.ondrop = drop
    dropZone.ondragover = dragover

    availableTasks[taskId] = {
        elem: task,
        time,
        timeElem: taskTimer,
        resource: [],
        resourceElem: taskResources
    }

    tasks.appendChild(task)
    taskNo++
}

let dragId = ''
/** @param {DragEvent} ev */
function ondrag(ev) {
    dragId = ev.target.id
    ev.dataTransfer.effectAllowed = 'move'
}


/** @param {DragEvent} ev */ 
function dragover(ev) {
    ev.preventDefault()
    ev.dataTransfer.dropEffect = 'move'
}

/** @param {DragEvent} ev */
function dragenter(ev) {
    if (ev?.target?.id) {
        const elem = document.getElementById(ev.target.id)
        elem.style.backgroundColor = 'green'
    }
}

/** @param {DragEvent} ev */
function dragexit(ev) {
    if (ev?.target?.id) {
        const elem = document.getElementById(ev.target.id)
        elem.style.backgroundColor = ''
    }
}

/** @param {HTMLElement} elem */
const disableDraggable = (elem) => {
    elem.draggable = false
    elem.style.opacity = '50%'
}

/** @param {HTMLElement} elem */
const enableDraggable = (elem) => {
    elem.draggable = true
    elem.style.opacity = '100%'
}

/** @param {DragEvent} ev */
function drop(ev) {
    ev.preventDefault()
    const dropId = ev.target.id
    const task = availableTasks[dropId]
    const elem = document.getElementById(ev.target.id)
    elem.style.backgroundColor = ''
    const dragged = document.getElementById(dragId)
    disableDraggable(dragged)

    // Add dragged details to the task list
    task.resource.push(resourceData[dragId])
    task.resourceElem.innerText = task.resource.map((r) => r.name + ' ')
    id = false
}

const freeResources = (resources) => resources.forEach(({elem}) => enableDraggable(elem))

const deleteTask = (taskId) => {
    const task = availableTasks[taskId]
    delete availableTasks[taskId]
    tasks.removeChild(task.elem)
}

// Game loop for task counting down
{
    let last
    /** @param {DOMHighResTimeStamp} timestamp */
    const step = (timestamp) => {
        if (last === undefined) last = timestamp
        const delta = (timestamp - last)/1000
        last = timestamp

        const completed = []
        for (let taskId in availableTasks) {
            const task = availableTasks[taskId]
            for (let r of task.resource) {
                task.time -= r.skill
            }
            task.time = Math.round(task.time)
            if (task.time <= 0) {
                task.time = 0
                task.resourceElem.innerText = ''
                freeResources(task.resource)
                completed.push(taskId)
            }
            task.timeElem.innerText = task.time
        }

        while (completed.length > 0) {
            deleteTask(completed.pop())
        }

        window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step)
}