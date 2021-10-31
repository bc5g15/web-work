console.log("Checking")

const magic = setInterval(spawnElement, 1000);

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