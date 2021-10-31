const block = document.createElement('div')
block.style.gridColumn = 5
block.style.gridRow = 3
block.style.width = '1em'
block.style.height = '1em'
block.style.background = 'blue'
document.body.appendChild(block)

let mx = 5;
let my = 3

document.addEventListener('keydown', (event) => {
    console.log(event.key)

    switch (event.key) {
        case 'ArrowRight':
            mx += 1
            break
        case 'ArrowLeft':
            mx -= 1
            break
        case 'ArrowUp':
            my -= 1
            break
        case 'ArrowDown':
            my += 1
    }
    // if (event.key === 'ArrowRight') {
    //     mx += 50;
    //     // txt.style.left = '100px';
    //     // console.log('Animate')
    //     // txt.animate([{
    //     //     transform: 'translateX(300px)'
    //     // }], {
    //     //     duration: 1000,
    //     //     iterations: 1
    //     // })
    // }
    block.style.gridColumn = mx;
    block.style.gridRow = my;

})