const block = document.getElementById('block')
const newStyle = document.getElementById('newstyle')
const btnSetStyle = document.getElementById('setstyle')

btnSetStyle.onclick = () => {
    const value = newStyle.value
    block.style = value
}