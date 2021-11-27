const bar = document.getElementById('healthbar');
let value = 100
// Create buttons
{
    const increaseButton = document.createElement('button')
    increaseButton.innerText = '+'
    increaseButton.onclick = () => {
        value++
        bar.style.setProperty('--value', `${value}%`)
    }
    
    const decreaseBtn = document.createElement('button')
    decreaseBtn.innerText='-'
    decreaseBtn.onclick = () => {
        value--
        bar.style.setProperty('--value', `${value}%`)
    }

    document.body.appendChild(decreaseBtn)
    document.body.appendChild(increaseButton)

}