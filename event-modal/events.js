const EVENTS = {}
{
    const buildEventText = (text) => {
        const elem = document.createElement('div');
        elem.innerText = text;
        elem.style.textAlign = 'center';
        return elem;
    }

    /** @param {[string, () => void][]} buttons */
    const buildEventButtons = (buttons) => {
        const root = document.createElement('div');
        root.style.display = 'flex';
        buttons.forEach(([text, onclick]) => {
            const button = document.createElement('button');
            button.style.margin = 'auto';
            button.style.width = 'fit-content';
            button.innerText = text;
            button.onclick = onclick;
            root.append(button);
        });
        return root;
    }

    /**
     * @param {any} state 
     * */
    const emptyEvent = (state) => {
        const container = document.createElement('div');
        container.className = 'eventContainer';

        const text = buildEventText('Nothing happened.');
        text.style.height = '40%';
        text.style.marginBlock = '15%';

        const returnState = new Promise((resolve) => {
            const buttons = buildEventButtons([
                ['Well then...', () => resolve(state)]
            ]);
            buttons.style.height = '30%';
            buttons.style.width = '100%';
    
            container.append(text, buttons);
        })

        return {
            element: container,
            returnState
        };
    }
    EVENTS.emptyEvent = emptyEvent;

    const rockGet = (state) => {
        const container = document.createElement('div');
        container.className = 'eventContainer';

        const text = buildEventText('You found a rock!');
        text.style.height = '40%';
        text.style.marginBlock = '15%';

        const returnState = new Promise((resolve) => {
            const currentRocks = state.rocks ?? 0;
            const buttons = buildEventButtons([
                ['Rock get!', () => resolve({
                    ...state, 
                    rocks: currentRocks + 1
                })]
            ]);
            buttons.style.height = '30%';
            buttons.style.width = '100%';
    
            container.append(text, buttons);
        })

        return {
            element: container,
            returnState
        };
    }
    EVENTS.rockGet = rockGet;
}