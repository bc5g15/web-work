console.log("Checking")

// const magic = setInterval(spawnElement, 1000);
const txt = document.querySelector('.spawnText');

let mx = 0;
let my = 0;

const mover = document.createElement('div')
mover.className = 'spawnText';
mover.innerText = 'TEXT'
document.body.appendChild(mover);

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
    mover.style.left = mx + 'em';
    mover.style.top = my + 'em';

})

function spawnElement() {
    const myThing = document.createElement('div');
    myThing.className = 'spawnText';
    myThing.innerText = 'TEXT';
    myThing.style.left = 100 + Math.random() * (window.innerWidth - 300) + "px"
    myThing.style.top = 100 + Math.random() * (window.innerHeight - 200) + "px"
    document.body.appendChild(myThing);
    setTimeout(() => {
        document.body.removeChild(myThing);
    }, 2000)
}