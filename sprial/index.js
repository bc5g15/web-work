const root = document.getElementById('spiral');

/**
 * @param {string} type 
 * @returns {SVGAElement}
 */
const makeSvgElem = (type) => document.createElementNS('http://www.w3.org/2000/svg', type)

/** @param {Node} elem */
const emptyNode = (elem) => {
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild)
    }
}

const lineElem = makeSvgElem('polyline');
lineElem.style.stroke = 'white';
lineElem.id = 'spiral-line'
root.append(lineElem);

const view = makeSvgElem('g');
view.classList = 'rotater';
root.append(view);

const drawPoints = (v, c, w, maxPoints) => {
    const coords = (t) => {
        const x = (v*t + c) * Math.cos(w * t);
        const y = (v*t + c) * Math.sin(w * t);
        return {x, y};
    }

    const polypoints = [];
    for (let i = 0; i<maxPoints; i++) {
        polypoints.push(coords(i));
    }
    const points = polypoints.map(({x, y}) => `${x+100} ${y+100}`).join(' ');

    lineElem.setAttribute('points', points);
}

const drawThickeningPoints = (v, c, w, maxPoints) => {
    const coords = (t) => {
        const x = (v*t + c) * Math.cos(w * t);
        const y = (v*t + c) * Math.sin(w * t);
        return {x, y};
    }
    emptyNode(view);

    const width = root.clientWidth;
    const height = root.clientHeight;
    console.log(width, height);

    const xOffset = width/2;
    const yOffset = height/2;

    // const points = [];
    let oldCoord = false;
    for (let i = 1; i < maxPoints; i++) {
        if (!oldCoord) {
            oldCoord = coords(i);
            continue;
        }
        const newCoord = coords(i);
        const stepLine = makeSvgElem('line');
        stepLine.setAttribute('x1', oldCoord.x + xOffset);
        stepLine.setAttribute('y1', oldCoord.y + yOffset);
        stepLine.setAttribute('x2', newCoord.x + xOffset);
        stepLine.setAttribute('y2', newCoord.y + yOffset);
        stepLine.style.stroke = 'white'
        // stepLine.setAttribute('stroke', 'white');
        stepLine.style.strokeWidth = ((i+1) * 0.05);
        view.append(stepLine);
        oldCoord = newCoord;
    }
}

const submitButton = document.getElementById('submit');

submitButton.onclick = () => {
    const v = document.getElementById('v').valueAsNumber;
    const c = document.getElementById('c').valueAsNumber;
    const w = document.getElementById('w').valueAsNumber;
    // console.log(v);
    // drawPoints(v, c, w, 200);
    drawThickeningPoints(v, c, w, 200);
}