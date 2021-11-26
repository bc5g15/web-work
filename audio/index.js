
const audioCtx = new window.AudioContext()

const oscillator = audioCtx.createOscillator()
const gainNode = audioCtx.createGain()

oscillator.connect(gainNode)
gainNode.connect(audioCtx.destination)

const maxFreq = 6000
const maxVol = 0.02
const initialVol = 0.001

oscillator.detune.value = 100
oscillator.start(0)

oscillator.onended = () => {
    console.log("Stopped playing")
}

// mute button
{
    const mutebtn = document.createElement('button')
    mutebtn.innerText = "MUTE"
    let muted = false
    mutebtn.onclick = () => {
        if (!muted) {
            gainNode.disconnect(audioCtx.destination)
            mutebtn.innerText = "UNMUTE"
            muted = true
        } else {
            gainNode.connect(audioCtx.destination)
            mutebtn.innerText = "MUTE"
            muted = false
        }
    }
    
    document.body.appendChild(mutebtn)
}

// Tuning controls
{
    let value = 100
    const container = document.createElement('div')

    const detuneUpBtn = document.createElement('button')
    detuneUpBtn.innerText = "+"
    detuneUpBtn.onclick = () => {
        value += 10
        oscillator.detune.value = value
    }
    container.appendChild(detuneUpBtn)

    const detuneDownBtn = document.createElement('button')
    detuneDownBtn.innerText = '-'
    detuneDownBtn.onclick = () => {
        value -= 10
        oscillator.detune.value = value
    }
    container.appendChild(detuneDownBtn)

    const detuneSlider = document.createElement('input')
    detuneSlider.type = 'range'
    detuneSlider.min = 1
    detuneSlider.max = 1000
    detuneSlider.value = 100
    detuneSlider.step = 10
    detuneSlider.oninput = (v) => {
        value = detuneSlider.value
        oscillator.detune.value = value
    }
    container.appendChild(detuneSlider)

    document.body.appendChild(container)
}