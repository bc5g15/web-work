const draw = document.getElementById('draw')

const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
rect.setAttribute('width', '100%')
rect.setAttribute('height', '100%')
rect.setAttribute('fill', 'red')

draw.appendChild(rect)