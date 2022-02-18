const board = document.getElementById('board')

const singleCard = buildCard('FRONT TEXT', 'BACK TEXT', true)
board.append(singleCard.elem)



const hand = []
const handPos = {
    bottom: '1em',
}
const deck = []
const deckPos = {
    right: '5em',
    top: '5em'
}

const buildDeck = () => {
    for (let i = 0; i < 52; i++) {
        const card = buildCard(i+1, 'BACK', true)
        card.elem.style.transition = 'all 500ms ease-out'
        board.append(card.elem)
        deck.push(card)
    }
}

buildDeck()


deck.push(singleCard)


const drawScreen = (hand, deck) => {
    
    deck.forEach(card => {
        setCardPosition(card, deckPos)
    })

    hand.forEach(card => {
        setCardPosition(card, handPos)
    })
}
drawScreen(hand, deck)
singleCard.elem.style.transition = 'all 1s ease-out'

const magicButton = document.createElement('button')
magicButton.innerText = 'CLICK ME'
magicButton.onclick = () => {
    if (deck.length) {
        const card = deck.shift()
        hand.push(card)
        drawScreen(hand, deck)

    }
}
document.body.append(magicButton)