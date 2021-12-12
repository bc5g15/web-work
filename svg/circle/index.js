const space = document.getElementById('root')

const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
svg.setAttribute('width', 200)
svg.setAttribute('height', 200)
space.append(svg)
svg.style.color = 'white'

const vs = [0,1,2,3,4,5,6,7]
const r = 80

const middleText = document.createElementNS('http://www.w3.org/2000/svg', 'text')
middleText.innerHTML = 'HELLO'
middleText.setAttribute('x', 100)
middleText.setAttribute('y', 100)
middleText.setAttribute('fill', 'white')
svg.append(middleText)

vs.forEach((v, i) => {
    const x = (Math.sin(Math.PI * 2 * i / vs.length) * r) + 100
    const y = (-Math.cos(Math.PI * 2 * i / vs.length) * r) + 100

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    text.innerHTML = v
    text.setAttribute('x', x)
    text.setAttribute('y', y)
    text.setAttribute('fill', 'white')
    text.x = x
    text.y = y
    svg.append(text)
})
