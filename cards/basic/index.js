const hand = document.getElementById('hand')

const makeCard = (display) => {
    const card = document.createElement('div')
    card.style.width = '10em'
    card.style.height = '10em'
    // card.style.padding = '5em 2em 2em 5em'
    card.style.paddingLeft = '2em'
    card.style.paddingRight = '2em'
    card.style.paddingTop = '5em'
    card.style.paddingBottom = '5em'
    card.style.border = '.5em solid white'
    card.style.position = 'absolute'
    card.style.backgroundColor = 'black'
    card.style.textAlign = 'center'

    card.style.borderRadius = '5%'
    card.innerText = display

    return card
}

const demoCard = makeCard('DEMO CARD')
demoCard.style.bottom = '0'
hand.append(demoCard)
hand.append(makeCard('TESTING MAKING CARDS'))