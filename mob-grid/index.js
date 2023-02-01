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

const drawGrid = (size) => {
    const cellSize = 64;

    const e = document.createElement('div');
    let s = e.style;
    s.display = 'grid';
    s.gridTemplateColumns = `repeat(${size}, 1fr)`;
    s.gridTemplateRows = `repeat(${size}, 1fr)`;
    s.outline = '1px solid white';
    s.width = `${cellSize * size}px`;
    s.height = `${cellSize * size}py`;

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
            e.append(s);
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

const mobs = new Map();

const start = () => {
    const size = 7;
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
        // Use stringified version as address
        mobs.set(address, {
            name: `Mob ${i}`
        });
    }

}
