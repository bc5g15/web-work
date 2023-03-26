const holder = document.createElement('div');
holder.style.display = 'grid';
holder.style.gridTemplateColumns = '1fr 1fr';
holder.style.gridTemplateRows = '1fr 1fr';
holder.style.gap = '1em';
document.body.append(holder);

let dragging = null;
let dropping = null;

document.body.ondragstart = () => false;

// Build drop spaces
for (let i = 0; i < 4; i++) {
    const elem = document.createElement('div');
    elem.style.width = '10em';
    elem.style.height = '10em';
    elem.style.backgroundColor = 'green';
    holder.append(elem);

    elem.onmouseenter = () => {
        if (!dragging) {
            return;
        }
        dropping = elem;
        elem.style.outline = '1em solid white';
    }

    elem.onmouseleave = () => {
        if(!dragging) {
            return;
        }
        dropping = null;
        elem.style.outline = '';
    }
}

const safeContainer = document.createElement('div');
document.body.append(safeContainer);

const draggable = document.createElement('div');
draggable.style.width = '5em';
draggable.style.height = '5em';
draggable.style.backgroundColor = 'blue';
safeContainer.append(draggable);

let dragPointX = 0;
let dragPointY = 0;

// keep a record of the mouse position
const mouseData = document.createElement('div');
document.body.append(mouseData);
let mouseX = 0;
let mouseY = 0;
document.onmousemove = (ev) => {
    mouseX = ev.pageX;
    mouseY = ev.pageY;
    mouseData.innerText = `${mouseX}, ${mouseY}`;
    if (!dragging) {
        return;
    }
    dragging.style.left = `${mouseX - dragPointX}px`;
    dragging.style.top = `${mouseY - dragPointY}px`;
}

// Drag logic handling
draggable.onmousedown = (ev) => {
    dragging = draggable;
    dragging.style.position = 'absolute';
    console.log(dragPointX, dragPointY);
    dragPointX = 25;
    dragPointY = 25;
    dragging.style.left = `${mouseX - dragPointX}px`;
    dragging.style.top = `${mouseY - dragPointY}px`;
    // Line below is how we stop the object intercepting mouse events when in overlay mode!
    draggable.style.pointerEvents = 'none';
}

// Needs to be document, since we've cancelled mouse events above
document.onmouseup = (ev) => {
    if (!dragging) {
        return;
    }

    if (!dropping) {
        // No drop point selected, return to safe spot
        safeContainer.append(dragging);
        dragging.style.position = 'static';
        dragging.style.pointerEvents = 'auto';
        dragging = null;
        return;
    }

    // Safe spot exists, add it to that
    dropping.append(dragging);
    dragging.style.position = 'static';
    dragging.style.pointerEvents = 'auto';
    dragging = null;
    dropping = null;
}
