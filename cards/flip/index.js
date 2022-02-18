const hand = document.getElementById('hand')
const board = document.getElementById('board')
const controls = document.getElementById('controls')

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
 * @param {*} front 
 * @param {*} back 
 * @returns card
 */
const makeCard = (front, back) => {
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
        faceup: true
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

const myCard = makeCard('DEMO CARD', 'BACK SIDE')
myCard.elem.style.top = '5em'
board.append(myCard.elem)

{
    const flipButton = document.createElement('button')
    flipButton.innerText = 'FLIP'
    controls.append(flipButton)

    flipButton.onclick = () => {
        flipCard(myCard)
    }

}