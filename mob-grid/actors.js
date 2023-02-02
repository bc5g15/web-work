
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

const buildPositionManager = () => {
    const positionMap = new Map();
    const stringify = ([x, y]) => `${x},${y}`;
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

    return {
        getByPosition,
        getById,
        setPosition,
        deleteByPosition,
        checkPosition,
    }
}

const buildCollisionActor = (actor1, actor2) => {
    return {
        moveLeft: false,
        name: `Explosion from ${actor1.name} and ${actor2.name}`
    }
}

const moveAndCollide = (actorManager, positionManager) => {
    const { listActors, getActor, deleteActor, hasActor, addActor } = actorManager;
    const { getByPosition, getById, setPosition, deleteByPosition, checkPosition } = positionManager;

    const actors = [...listActors()];

    while (actors.length > 0) {
        const actorId = actors.pop();
        
        if (!hasActor(actorId)) {
            continue;
        }

        const position = getById(actorId);

        if (!position) {
            // Actor is not on grid, no control necessary
            continue;
        }

        // Calculate movement somehow
        const details = getActor(actorId);
        const [x, y] = position;
        let nx = 0;
        if (details.moveLeft) {
            nx = x - 1;
        } else {
            nx = x + 1;
        }

        if (checkPosition([nx, y])) {
            // Collision!
            console.log('Collision!');
            const collider = getByPosition([nx, y]);

            // Clear the colliding entities
            deleteByPosition([nx, y]);
            deleteByPosition([x, y]);

            // Create a new entity based on the two entities
            // TODO
            const them = getActor(collider);
            const collision = buildCollisionActor(details, them);

            // Add the collision actor and remove the colliding entities
            const collisionId = addActor(collision);
            deleteActor(actorId);
            deleteActor(collider);

            deleteByPosition([x, y]);
            deleteByPosition([nx, y]);

            setPosition([nx, y], collisionId);
            continue;
        }

        // Otherwise this is a normal move
        console.log(`${details.name} move to ${nx}, ${y}`);
        deleteByPosition(position);
        setPosition([nx, y], actorId);
    }
}

const start = () => {
    const actorOne = {
        name: 'bagel',
        moveLeft: false,
    }

    const actorTwo = {
        name: 'donut',
        moveLeft: true,
    }

    const actorManager = buildActorManager();
    const positionManager = buildPositionManager();

    const actorOneId = actorManager.addActor(actorOne);
    const actorTwoId = actorManager.addActor(actorTwo);
    positionManager.setPosition([0, 0], actorOneId);
    positionManager.setPosition([5, 0], actorTwoId);
    
    const button = document.createElement('button');
    button.innerText = 'step';
    button.onclick = () => moveAndCollide(actorManager, positionManager);
    document.body.append(button);
}

start();