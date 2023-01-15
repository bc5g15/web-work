const root = document.getElementById('game');

const makeGameDisplay = () => {
    const container = document.createElement('div');
    container.style.width = 'fit-content';
    container.style.height = 'fit-content';
    container.style.margin = 'auto';

    const leftMoveButton = document.createElement('button');
    leftMoveButton.className = 'moveButton';
    leftMoveButton.innerText = 'Move Left';
    leftMoveButton.onclick = () => {
        console.log('move left');
    }

    const setLeftAction = (action) => {
        leftMoveButton.onclick = action;
    }
    
    const rightMoveButton = document.createElement('button');
    rightMoveButton.className = 'moveButton';
    rightMoveButton.innerText = 'Move Right';
    rightMoveButton.onclick = () => {
        console.log('move right');
    }

    const setRightAction = (action) => {
        rightMoveButton.onclick = action;
    }

    container.append(leftMoveButton, rightMoveButton);

    return {
        element: container,
        setLeftAction,
        setRightAction
    };
}

/** 
 * @param {(state: any) => {element: HTMLDivElement;returnState: Promise<any>;}} event
*/
const triggerEvent = (event, state) => {
    const {
        element: eventModal,
        returnState
    } = event(state);

    root.append(eventModal);
    eventModal.animate([
        {transform: 'translateY(-100vh)', opacity: '0'},
        {transform: 'translateY(0)', opacity: '1'}
    ], {
        duration: 500,
        easing: 'ease-in-out'
    });

    return returnState.finally(() => {
        eventModal.animate([
            {transform: 'translateY(0)', opacity: '1'},
            {transform: 'translateY(-100vh)', opacity: '0'},
        ], {
            duration: 500,
            easing: 'ease-in-out'
        }).finished.then(() => {
            root.removeChild(eventModal);
        });
    });
}

const stateDisplay = () => {
    const element = document.createElement('div');
    element.style.outline = '1px solid white';

    const setText = (text) => {
        element.innerText = JSON.stringify(text);
    }
    return {
        element,
        setText
    };
}

const gameLoop = () => {
    const { element, setLeftAction, setRightAction } = makeGameDisplay();

    root.append(element);

    const { element: stateElement, setText} = stateDisplay();
    root.append(stateElement);

    let state = {};

    setLeftAction(() => triggerEvent(EVENTS.emptyEvent, state).then(v => {
        console.log(v);
    }));

    setRightAction(async () => {
        const newState = await triggerEvent(EVENTS.rockGet, state);
        state = newState;
        console.log(newState);
        setText(newState);
    });
}
gameLoop();