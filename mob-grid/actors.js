const stringify = ([x, y]) => `${x},${y}`;
const pickRandom = array => array[Math.floor(Math.random()*array.length)];

const buildActorManager = () => {
    const state = new Map();

    const addActor = (actorData) => {
        const id = Symbol(`Actor ${state.size}`);
        state.set(id, actorData);
        return id;
    }
    
    const listActors = () => {
        return state.keys();
    }

    const getActor = (actorId) => {
        return state.get(actorId);
    }

    const deleteActor = (actorId) => {
        state.delete(actorId);
    }

    const updateActor = (actorId, newState) => {
        state.set(actorId, newState);
    }

    const hasActor = (actorId) => {
        return state.has(actorId);
    }

    return {
        listActors,
        getActor,
        deleteActor,
        updateActor,
        addActor,
        hasActor,
    }
}

const buildPositionManager = (size) => {
    const positionMap = new Map();
    const idMap = new Map();

    const getByPosition = (address) => {
        return positionMap.get(stringify(address));
    }

    const getById = (actorId) => {
        return idMap.get(actorId);
    }

    const setPosition = (address, id) => {
        positionMap.set(stringify(address), id)
        idMap.set(id, address);
    }

    const deleteByPosition = (address) => {
        const id = positionMap.get(stringify(address));
        if (!id) {
            return;
        }
        positionMap.delete(stringify(address));
        idMap.delete(id);
    }

    const checkPosition = (address) => {
        return positionMap.has(stringify(address));
    }

    const listPositions = () => {
        return [...positionMap.entries()];
    }

    const isLegalSpace = (address) => {
        const [x, y] = address;
        return x >= 0 &&
            x < size &&
            y >= 0 &&
            y < size;
    }

    return {
        getByPosition,
        getById,
        setPosition,
        deleteByPosition,
        checkPosition,
        listPositions,
        isLegalSpace,
    }
}


const buildGrid = (size) => {
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
            addresses.set(stringify([j, i]), block);
        }
    }

    /**
     * Exported function to set the member of a cell
     * @param {number} x 
     * @param {number} y 
     * @param {HTMLElement} elem
     */
    const setCell = (address, elem) => {
        if (!addresses.has(address)) {
            return false;
        }

        const block = addresses.get(address);
        block.append(elem);
        return true;
    }

    const clearCell = (address) => {
        if (!addresses.has(address)) {
            return false;
        }

        const block = addresses.get(address);
        while(block.firstChild) {
            block.removeChild(block.firstChild);
        }
        return true;
    }

    const clearAll = () => {
        addresses.forEach((block) => {
            while(block.firstChild) {
                block.removeChild(block.firstChild);
            }
        })
    };
    
    return {
        element: e,
        setCell,
        clearCell,
        clearAll
    };
}

const buildCollisionActor = (actor1, actor2) => {
    const elem = document.createElement('div');
    elem.innerText = 'Explosion!'
    return {
        moveLeft: false,
        name: `Explosion from ${actor1.name} and ${actor2.name}`,
        element: elem,
        type: 'mover',
        typeDetails: {
            direction: 'random'
        }
    }
}


const moveAndCollide = (actorId, actorManager, positionManager) => {
    const { getActor, deleteActor, hasActor, addActor } = actorManager;
    const { getByPosition, getById, setPosition, deleteByPosition, checkPosition, isLegalSpace } = positionManager;
        
    if (!hasActor(actorId)) {
        return;
    }

    const position = getById(actorId);

    if (!position) {
        // Actor is not on grid, no control necessary (yet)
        return;
    }

    // Calculate movement somehow
    const details = getActor(actorId);
    if (details.type === 'mover') {
        const [x, y] = position;
        let nx = x;
        let ny = y;
        const { direction } = details.typeDetails;
        if (direction === 'left' && isLegalSpace([x-1, y])) {
            nx -= 1;
        }

        if (direction === 'right' && isLegalSpace([x+1, y])) {
            nx += 1;
        }

        if (direction === 'random') {
            let [tx, ty] = pickRandom([
                [x+1, y],
                [x-1, y],
                [x, y+1],
                [x, y-1],
            ].filter(v => isLegalSpace(v)))
            nx = tx;
            ny = ty;
        }

        if (checkPosition([nx, ny])) {
            // Collision!
            console.log(`Collision at ${nx}, ${ny}!`);
            const collider = getByPosition([nx, ny]);

            // Clear the colliding entities
            deleteByPosition([nx, ny]);
            deleteByPosition([x, y]);

            // Create a new entity based on the two entities
            const them = getActor(collider);
            const collision = buildCollisionActor(details, them);

            // Add the collision actor and remove the colliding entities
            const collisionId = addActor(collision);
            deleteActor(actorId);
            deleteActor(collider);

            deleteByPosition([x, y]);
            deleteByPosition([nx, ny]);

            setPosition([nx, ny], collisionId);
            return;
        }

        // Otherwise this is a normal move
        console.log(`${details.name} move to ${nx}, ${ny}`);
        deleteByPosition(position);
        setPosition([nx, ny], actorId);
        return;
    }

}

const buildWorld = (size, actorManager) => {
    const {element, setCell, clearAll} = buildGrid(size);

    document.body.append(element);

    const positionManager = buildPositionManager(size);

    const displayChanges = (pm) => {
        clearAll();
        const { listPositions } = pm;
        const positions = listPositions();
        positions.forEach(([address, id]) => {
            const { element } = actorManager.getActor(id);
            setCell(address, element)
        })
    }

    return {
        positionManager,
        displayChanges
    }
}

const start = () => {

    const elemOne = document.createElement('div');
    elemOne.innerText = 'bagel';
    const actorOne = {
        name: 'bagel',
        type: 'mover',
        typeDetails: {
            direction: 'right'
        },
        element: elemOne,
    }

    const elemTwo = document.createElement('div');
    elemTwo.innerText = 'donut';
    const actorTwo = {
        name: 'donut',
        type: 'mover',
        typeDetails: {
            direction: 'left'
        },
        element: elemTwo,
    }

    const actorManager = buildActorManager();
    const { positionManager, displayChanges }  = buildWorld(7, actorManager);

    const actorOneId = actorManager.addActor(actorOne);
    const actorTwoId = actorManager.addActor(actorTwo);
    positionManager.setPosition([0, 0], actorOneId);
    positionManager.setPosition([5, 0], actorTwoId);
    
    const button = document.createElement('button');
    button.innerText = 'step';
    button.onclick = () => {
        const actors = [...actorManager.listActors()];
        while (actors.length > 0) {
            const actor = actors.pop();
            moveAndCollide(actor, actorManager, positionManager);
        }
        displayChanges(positionManager);
    }
    document.body.append(button);
}

start();