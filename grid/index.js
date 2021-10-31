const wrapper = document.querySelector('.wrapper')

const elem = document.createElement('code')
elem.style.backgroundColor = 'black'

let x = 5;
let y = 6;
elem.style.gridColumn = x;
elem.style.gridRow = y;
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
    elem.style.gridColumn = x;
    elem.style.gridRow = y;
    console.log(elem.style.gridColumn, elem.style.gridRow)
})