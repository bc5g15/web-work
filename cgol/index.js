const game = document.querySelector('.gamearea')

const stringify = (x, y) => `${x},${y}`
// const test = document.createElement('div')
// test.onclick = 

const live = {}

const createBlock = (x, y) => {
    const block = document.createElement('div')
    block.style.gridColumn = x
    block.style.gridRow = y
    block.style.backgroundColor = 'white'
    game.appendChild(block)
    live[stringify(x,y)] = block
}

game.onclick = (e) => {
    console.log(e)
    console.log(e.clientX, e.clientY)
    const posx = Math.floor(e.clientX/16)
    const posy = Math.floor(e.clientY/16)
    createBlock(posx, posy)
    
}
// window.screen.height
