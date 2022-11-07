
/**
 * @typedef {{
 *  front: string;
 *  back: string;
 *  elem: HTMLElement;
 *  faceup: boolean;
 * }} card
 */

/**
 * 
 * @param {string} front 
 * @param {string} back
 * @param {boolean} faceup 
 * @returns {card} 
 */
const buildCard = (front, back, faceup) => {
    const card = document.createElement('div')
    card.style.width = '10em'
    card.style.height = '10em'
    card.style.paddingLeft = '2em'
    card.style.paddingRight = '2em'
    card.style.paddingTop = '5em'
    card.style.paddingBottom = '5em'
    card.style.border = '.5em solid white'
    card.style.position = 'absolute'
    card.style.backgroundColor = 'black'
    card.style.textAlign = 'center'

    card.style.borderRadius = '5%'
    card.innerText = front

    return {
        front,
        back,
        elem: card,
        faceup
    }
}

/**
 * 
 * @param {card} card 
 */
const flipCard = (card) => {
    card.faceup = !card.faceup
    const {elem, front, back, faceup} = card

    const newText = faceup ? front : back
    elem.animate([
        {transform: 'scaleX(0)'}
    ], {
        duration: 200,
        easing: 'ease-in'
    }).finished.then(() => {
        elem.innerText = newText
        elem.animate([
            {transform: 'scaleX(0)'},
            {transform: 'scaleX(1)'}
        ], {
            duration: 200,
            easing: 'ease-out'
        })
    })
}

/**
 * 
 * @param {card} card 
 * @param {*} param1 
 */
const setCardPosition = (card, {x, y}) => {
    const elem = card.elem
    elem.style.left = x
    elem.style.top = y
}