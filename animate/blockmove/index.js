const wrapper = document.getElementById('wrapper')

let x = 5;
let y = 6;

const elem = document.createElement('div')
elem.className = 'pc'
elem.style.left = x + 'em'
elem.style.top = y + 'em'
elem.style.transform = `rotate(${(x+y)*90}deg)`

// make it shake?
elem.animate([
    { transform: 'translateX(0em)'},
    { transform: 'translateX(.1em)'},
    { transform: 'translateX(-.1em)'}
], {
    duration: 100,
    iterations: 10
})

// elem.style.transform = `translateX(${x}em) translateY(${y}em)`

// elem.style.gridColumn = x;
// elem.style.gridRow = y;
// elem.style.width = '1em';
// elem.style.height = '1em'
// elem.style.position = 'absolute'
wrapper.appendChild(elem);

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            x += 1
            break
        case 'ArrowLeft':
            x -= 1
            break
        case 'ArrowUp':
            y -= 1
            break
        case 'ArrowDown':
            y += 1
    }
    // elem.style.gridColumn = x;
    // elem.style.gridRow = y;
    console.log(x, y)
    // elem.style.transform = `translateX(${x}em) translateY(${y}em)`
    elem.style.left = x + 'em'
    elem.style.top = y + 'em'
    elem.style.transform = `rotate(${(x+y)*90}deg)`
    // cons
    // console.log(elem.style.gridColumn, elem.style.gridRow)
})