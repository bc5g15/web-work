const tileGrid = document.getElementById('grid')
const controls = document.getElementById('controls')

/** @param {Node} elem */
const emptyNode = (elem) => {
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild)
    }
}

// Initial population
for (let j = 0; j < 6; j++) {
    for (let i = 0; i < 6; i++) {
        const tile = document.createElement('div')
        tile.style.width = '1em'
        tile.style.height = '1em'
        tile.style.backgroundColor = `var(--palette${j})`
        tile.style.gridRow = j+1
        tile.style.gridColumn = i+1
        tileGrid.append(tile)
    }
}

// Create controls 
{
    for (let i = 0; i < 6; i++) {
        const paletteRange = document.createElement('input')
        paletteRange.type = 'range'
        paletteRange.min = 0
        paletteRange.max = 360
        paletteRange.oninput = (e) => {
            // console.log(e.target.value)
            document.body.style.setProperty(`--palette${i}`, `hsl(${e.target.value}, 100%, 50%)`)
        }
        controls.append(paletteRange)
    }
}