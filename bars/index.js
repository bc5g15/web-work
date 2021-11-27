let value = 100
// Value Controls
{
    const increaseButton = document.createElement('button')
    increaseButton.innerText = '+'
    increaseButton.onclick = () => {
        value++
        document.body.style.setProperty('--value', `${value}%`)
    }
    
    const decreaseBtn = document.createElement('button')
    decreaseBtn.innerText='-'
    decreaseBtn.onclick = () => {
        value--
        document.body.style.setProperty('--value', `${value}%`)
    }

    const slider = document.createElement('input')
    slider.type = 'range'
    slider.min = 0
    slider.max = 100
    slider.step = 1
    slider.value=100
    slider.oninput = () => {
        value = slider.value
        document.body.style.setProperty('--value', `${value}`)
    }

    document.body.appendChild(decreaseBtn)
    document.body.appendChild(increaseButton)
    document.body.appendChild(slider)

}