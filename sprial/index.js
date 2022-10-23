const root = document.getElementById('spiral');

// const v = 1;
// const c = 0;
// const w = 1;

// const points = (t) => {
//     const x = (v*t + c) * Math.cos(w * t);
//     const y = (v*t + c) * Math.sin(w * t);
//     return {x, y};
// }

/**
 * 
 * @param {string} type 
 * @returns {SVGAElement}
 */
const makeSvgElem = (type) => document.createElementNS('http://www.w3.org/2000/svg', type)

const lineElem = makeSvgElem('polyline');
lineElem.style.stroke = 'white';
root.append(lineElem);

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

// const polypoints = [];
// for (let i = 0; i<100; i++) {
//     polypoints.push(points(i));
// }
// const drawPath = polypoints.map(({x, y}) => `${x+100} ${y+100}`).join(' ');
// lineElem.setAttribute('points', drawPath);

const submitButton = document.getElementById('submit');

submitButton.onclick = () => {
    const v = document.getElementById('v').valueAsNumber;
    const c = document.getElementById('c').valueAsNumber;
    const w = document.getElementById('w').valueAsNumber;
    // console.log(v);
    drawPoints(v, c, w, 200);
}