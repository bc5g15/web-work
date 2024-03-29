/**
 * @param {string} type 
 * @returns {SVGAElement}
 */
const makeSvgElem = (type) => document.createElementNS('http://www.w3.org/2000/svg', type)

const shuffle = array => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

const delay = (time) => new Promise(resolve => {
    setTimeout(() => resolve(), time)
})

const buildPuzzle = (count) => {

    const root = document.createElement('div');
    let s = null;

    // Build lights
    const lightContainer = makeSvgElem('svg');
    lightContainer.setAttribute('width', '50vmin');
    lightContainer.setAttribute('height', '50vmin');
    root.append(lightContainer);
    s = lightContainer.style;
    s.outline = '1px solid white';
    s.marginLeft = 'auto';
    s.marginRight = 'auto';
    const lightMap = new Map();
    for (let i = 0; i < count; i++) {
        const elem = makeSvgElem('circle');
        const radius = 3;
        elem.setAttribute('r', `${radius}vmin`);
        s = elem.style;
        s.stroke = 'blue';
        s.fill = 'black';
        s.strokeWidth = '0.2em';
        const left = (Math.cos((Math.PI * 2 / count) * i) * 20) +25;
        const top = (Math.sin((Math.PI * 2 / count) * i) * 20) +25;
        elem.setAttribute('cx', `${left}vmin`);
        elem.setAttribute('cy', `${top}vmin`)
        lightContainer.append(elem);

        // Behaviour
        const setColour = (colour) => {
            elem.style.fill = colour;
        }
        lightMap.set(i, setColour);
    }

    // Add a success circle in the center
    const winCircle = makeSvgElem('circle');
    winCircle.setAttribute('r', '5vmin');
    winCircle.style.stroke = 'green';
    winCircle.style.strokeWidth = '0.2em';
    winCircle.setAttribute('cx', '25vmin');
    winCircle.setAttribute('cy', '25vmin');
    lightContainer.append(winCircle);

    // Build buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    root.append(buttonContainer);
    let current = null;
    const active = new Set();

    const pressLogic = async (i) => {

        // Have a delay to show which button was pressed. 
        const setColour = lightMap.get(i);
        setColour('yellow');
        await delay(150);

        if (current === null || i === (current + 1) % count)  {
            current = i;
            setColour('green');
            active.add(i);

            if (active.size === count) {
                // Victory condition
                console.log('Done!')
                winCircle.style.fill = 'green';
            }
            return;
        } 

        // If wrong button
        for (v of lightMap.values()) {
            v('black');
        }
        current = null;
        active.clear();
    }

    const buttonList = [];

    for (let i = 0; i < count; i++) {
        const elem = document.createElement('button');
        s = elem.style;
        s.width = '2em';
        s.height = '2em';
        s.margin = '0.5em';

        elem.onclick = () => {
            pressLogic(i);
        };
        buttonList.push(elem);
    }
    const shuffled = shuffle(buttonList);
    shuffled.forEach(b => buttonContainer.append(b));


    return root;
}

document.body.append(buildPuzzle(8));