const stringify = (x, y) => `${x},${y}`;

/** 
 * @param {number} size 
 * @param {(string) => void} stateDisplay
 */
const lightPuzzle = (size, stateDisplay) => {
    const grid = document.createElement('div');
    grid.style.outline = '1px solid white';
    // grid.style.margin = 'auto';
    grid.style.width = 'fit-content';
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = `repeat(${size}, 2em)`;
    grid.style.gridTemplateRows = `repeat(${size}, 2em)`;

    const elemMap = new Map();

    const checkOverallState = () => {
        let onCount = 0;
        elemMap.forEach(({state}) => {
            if (state) {
                onCount += 1;
            }
        });

        if (onCount === 0) {
            return 'all off';
        }  else if (onCount === elemMap.size) {
            return 'all on';
        } else {
            return 'incomplete';
        }
    };


    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const block = document.createElement('div');
            block.style.gridRow = i+1;
            block.style.gridColumn = j+1;
            block.style.width = '100%';
            block.style.height = '100%'
            block.style.outline = '1px solid white';
            block.style.backgroundColor = 'black'

            /** @param {boolean} value */
            const setActive = (value) => {
                block.style.backgroundColor = value ? 'white' : 'black';
            }
            elemMap.set(stringify(j, i), {
                state: false,
                setActive
            });

            block.onclick = () => {
                [
                    [i, j],
                    [i+1, j],
                    [i-1, j],
                    [i, j+1],
                    [i, j-1]
                ].forEach(([y, x]) => {
                    const addr = stringify(x,y);
                    const item = elemMap.get(addr);
                    if (item) {
                        const {state, setActive} = item;
                        setActive(!state);
                        elemMap.set(addr, {
                            state: !state,
                            setActive
                        });
                    }
                });
                stateDisplay(checkOverallState());
            }

            grid.append(block);
        }
    }
    stateDisplay(checkOverallState());
    return grid;
}

const makeStateDisplay = () => {
    const elem = document.createElement('div');
    return elem;
}

const text = makeStateDisplay();
document.body.append(lightPuzzle(4, (s) => {
    text.innerText = s;
}), text);