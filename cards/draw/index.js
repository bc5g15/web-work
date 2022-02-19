const board = document.getElementById('board')
const deckElement = document.getElementById('deck')
const handElement = document.getElementById('hand') 

const singleCard = buildCard('FRONT TEXT', 'BACK TEXT', true)
board.append(singleCard.elem)

const hand = []
const handPos = (card, offset) => ({
    x: `${handElement.offsetLeft + (card.offsetWidth/2 * offset)}px`,
    y: `${handElement.offsetTop}px`
})

const deck = []
const deckPos = () => ({
    x: `${deckElement.offsetLeft}px`,
    y: `${deckElement.offsetTop}px`
})

const buildDeck = () => {
    for (let i = 0; i < 52; i++) {
        const card = buildCard(i+1, 'BACK', true)
        card.elem.style.transition = 'all 500ms ease-out'
        board.append(card.elem)
        deck.push(card)
    }
}

deck.push(singleCard)
buildDeck()




const drawScreen = (hand, deck) => {
    
    deck.forEach(card => {
        setCardPosition(card, deckPos())
    })

    hand.forEach((card, i) => {
        setCardPosition(card, handPos(card.elem, i))
    })
}
drawScreen(hand, deck)
singleCard.elem.style.transition = 'all 1s ease-out'

const magicButton = document.createElement('button')
magicButton.innerText = 'CLICK ME'
magicButton.onclick = () => {
    if (deck.length) {
        const card = deck.pop()
        hand.push(card)
        drawScreen(hand, deck)

    }
}
document.body.append(magicButton)