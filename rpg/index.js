const buttonContainer = document.getElementById('buttons')

const btn = document.createElement('button')
btn.onclick= () => {
    console.log('clicked')
}
buttonContainer.appendChild(btn)