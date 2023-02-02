# Requirements
- Independent actors are moving on a grid
- When the actors collide, they create a third entity (explosion) and the two of them are removed from the scene

# Technical considerations
- Being able to index by position is important, so will need to create and maintain a map of positions
- Will need to edit the collection of mobs in flight
    - Can't iterate over it with functional tools in that case
    - Probably a do:while pop/push will work best
    - When searching for an entity need to check the source list and destination list


# Pain points
> When searching for an entity need to check the source list and destination list
This is the point that is giving me the most frustration. I'll need to iterate over the entire list of actors when I want to make a change.
How can I improve upon this? It isn't a necessary optimisation right now, but I'd like to at least imagine the solutions

# Musing
The most important thing is the links between data
perhaps actors aren't consistent? They only exist for one turn and then are re-created rather than mutated?
But details need to exist in different places (list, position map) so how to reconcile that?

Ideally I'd have a single source of information for the actor. All other pieces would just reference that information. But then information invalidation becomes a problem.
Maybe an actor store? Always get them by a reference, rather than code.

So I'd say `getActor('myActor')` to get the specific details, then the `'myActor'` name is what would be stored elsewhere. 
That way if the name becomes invalid then I know the actor has been removed by an external process and can terminate early.
An `actorManager` does seem like it may be the way to go. 

I think the inspiration is that I am passing around an 'index' to those actor details that are stored in various places

# Planning

```
const buildActorManager = () => {
    // ...
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
    // ...
    return {
        getPosition,
        setPosition,
        deletePosition,
        checkPosition,
    }
}


const moveAndCollide = (actorManager, positionManager) => {
    const { listActors, getActor, deleteActor, updateActor, hasActor } = actorManager;
    const { getPosition, setPosition, deletePosition, checkPosition } = positionManager;
    const actors = listActors();
    
    while actors.length > 0 {
        const actorName = actors.pop();
        const position = getPosition(actorName);

        // Need to check. Actor may have been removed by an earlier process
        if (!hasActor(actorName)) {
            continue;
        }

        if (position does not exist) {
            // actor is not on the grid
            // we don't need to move it
            continue;
        }

        const details = getActor(actorName);

        /*
        ... 
        Calculate new position based on whatever other calculations there are
        ...
        */

        const newPosition = // ...

        if (checkPosition(newPosition)) {
            // there is a collision! 
            const collider = getPosition(newPosition);
            
            // Clear away the two colliding entities
            deletePosition(newPosition);
            deletePosition(position);

            // create a collision entity based on the actors (somehow)
            const me = getActor(actorName);
            const them = getActor(collider);
            const collision = buildCollisionActor(me, them);

            // Add the collision actor and remove the two colliders
            const collisionId = addActor(collision);
            deleteActor(actorName);
            deleteActor(collider);

            // This is another pain point
            // Could we globally delete the actor from once place?
            // Depends on what the actor was hooked into...
            deletePosition(actorName);
            deletePosition(collider);

            // Give the actor a position, so it can be drawn
            setPosition(newPosition, collisionId);
            continue;
        }

        // Otherwise this is a standard move
        deletePosition(position);
        setPosition(newPosition, actorName);
    }
}
```

I think this might work. At the very least it is an approach I'd like to try out.