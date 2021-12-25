const main = document.getElementById('main')

const updown = (text, root) => {
    for (let i in text) {
        const spn = document.createElement('span')
        spn.innerText = text[i]
        spn.style.width = text[i] === ' ' ? '.5ch' : ''
        spn.style.display = 'inline-block'
        spn.animate([
            {transform: 'translateY(0em)'},
            {transform: 'translateY(-.1em'},
            {transform: 'translateY(0em)'},
            {transform: 'translateY(.1em'},
            {transform: 'translateY(0em)'}
        ], {
            duration: 1000,
            delay: 1000 * (i/text.length),
            iterations: Infinity,
            easing: 'linear'
        }).finished.then(() => {
            console.log(`Done? ${i}`)
        })
        root.append(spn)
    }
}

const circle = (text, root) => {
    const animateBlocks = (count) => {
        const result = []
        for (let i = 0; i <= count; i++) {
            const myCos = -Math.cos(Math.PI*2*i/count) * .1
            const mySin = Math.sin(Math.PI*2*i/count) * .1
            result.push({
                transform: `translate(${mySin}em, ${myCos}em)`
            })
        }
        return result
    }

    for (let l in text) {
        const spn = document.createElement('span')
        spn.innerText = text[l]
        spn.style.display = 'inline-block'
        spn.style.width = text[l] === ' ' ? '.5ch' : ''
        const animBlock = animateBlocks(10)
        spn.animate(animBlock, {
            duration: 1000,
            delay: 1000 * (l/text.length),
            iterations: Infinity,
            easing: 'linear'
        })

        root.append(spn)
    }
}

const shake = (text, root) => {
    for (let l in text) {
        const spn = document.createElement('span')
        spn.innerText = text[l]
        spn.style.display = 'inline-block'
        spn.style.width = text[l] === ' ' ? '.5ch' : ''
        spn.animate([
            {transform: 'translate(-.1em, 0em'},
            {transform: 'translate(.1em, .1em'},
            {transform: 'translate(-.1em, -.1em'},
            {transform: 'translate(.1em, 0em'},
            {transform: 'translate(-.1em, .1em'},
            {transform: 'translate(0em, -.1em'}
        ], {
            duration: 200,
            delay: 200 * (l/text.length),
            direction: 'alternate',
            iterations: Infinity,
            easing: 'linear'
        })

        root.append(spn)
    }
}

const block1 = document.createElement('div')
main.append(block1)

updown('Hello There', block1)

const block2 = document.createElement('div')
main.append(block2)

circle('Welcome!', block2)

shake('It is very scary!', main)