const stringify = (x, y) => `${x},${y}`;

// Fisher-Yates algorithm
const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

const pickRandom = array => array[Math.floor(Math.random()*array.length)];

const drawGrid = (size) => {
    const cellSize = 64;

    const e = document.createElement('div');
    let s = e.style;
    s.display = 'grid';
    s.gridTemplateColumns = `repeat(${size}, 1fr)`;
    s.gridTemplateRows = `repeat(${size}, 1fr)`;
    s.outline = '1px solid white';
    s.width = `${cellSize * size}px`;
    s.height = `${cellSize * size}px`;

    /** @type {Map<string, HTMLElement>} */
    const addresses = new Map();

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const block = document.createElement('div');
            s = block.style;
            s.width = '100%';
            s.height = '100%';
            s.gridRow = i+1;
            s.gridColumn = j+1;
            s.outline = '1px solid blue'
            e.append(block);
            addresses.set(stringify(j, i), block);
        }
    }

    /**
     * Exported function to set the member of a cell
     * @param {number} x 
     * @param {number} y 
     * @param {HTMLElement} elem
     */
    const setCell = (x, y, elem) => {
        const address = stringify(x, y);
        if (!addresses.has(address)) {
            return false;
        }

        const block = addresses.get(address);
        block.append(elem);
        return true;
    }

    const clearCell = (x, y) => {
        const address = stringify(x, y);
        if (!addresses.has(address)) {
            return false;
        }

        const block = addresses.get(address);
        while(block.firstChild) {
            block.removeChild(block.firstChild);
        }
        return true;
    }
    
    return {
        element: e,
        setCell,
        clearCell
    };
}

const mapManager = () => {
    const size = 2;
    const {
        element: grid,
        setCell,
        clearCell
    } = drawGrid(size);
}

let mobs = new Map();

const start = () => {
    const size = 2;
    const {
        element: grid,
        setCell,
        clearCell
    } = drawGrid(size);

    const sizeArr = Array(size).fill(0).map((_v, i) => i);
    const spaces = sizeArr.flatMap(v => sizeArr.map(w => [v, w]));
    shuffleArray(spaces);

    for (let i = 0; i < 2; i++) {
        // pick random space on grid
        const [x, y] = spaces.pop();
        const address = stringify(x,y);
        const elem = document.createElement('div');
        elem.innerText = `X${i}`
        elem.style.width = 'fit-content';
        elem.style.height = '100%';
        elem.style.margin = 'auto';
        // Use stringified version as address
        mobs.set(address, {
            name: `Mob ${i}`,
            position: [x, y],
            element: elem,
        });
        setCell(x, y, elem);
    }

    document.body.append(grid);
    
    const legalPositions = (x, y) => {
        const result = [];
        if (x > 0) {
            result.push([x-1, y]);
        }
        if (x < size-1) {
            result.push([x+1, y]);
        }
        if (y > 0) {
            result.push([x, y-1]);
        }
        if (y < size-1) {
            result.push([x, y+1]);
        }
        return result;
    }

    const step = () => {
        // For each mobile object
        let newMobs = new Map();
        mobs.forEach((v) => {
            const [x, y] = v.position;
            const [nx, ny] = pickRandom(legalPositions(x, y));

            const newAddr = stringify(nx, ny);
            if (newMobs.has(newAddr)) {
                console.log('Collision');
                const collider = newMobs.get(newAddr);
                // Do something clever with the collider
                clearCell(nx, ny);
                newMobs.delete(newAddr);
            } else {
                setCell(nx, ny, v.element);
                v.position = [nx, ny];
                newMobs.set(newAddr, v);
            }
            console.log(newMobs);
        });
        mobs = newMobs;
    } 
    // update button
    const button = document.createElement('button');
    button.innerText = 'step'
    button.onclick = step;
    document.body.append(button);

}

start();
