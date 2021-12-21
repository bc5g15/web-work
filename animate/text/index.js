const main = document.getElementById('main')

const updown = (text, root) => {
    for (let i in text) {
        const spn = document.createElement('span')
        spn.innerText = text[i]
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

updown('Hello There', main)