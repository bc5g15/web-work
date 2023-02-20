const block = document.createElement('div');
let s = block.style;
s.width = '10em';
s.height = '3em';
s.outline = '1px solid white';
document.body.append(block);

let last;
/**
 * @param {DOMHighResTimeStamp} timestamp 
 */
const gameLoop = async (timestamp) => {
    if (last === undefined) {
        last = timestamp;
    }
    const delta = (timestamp - last)/1000;

    last = timestamp;
    block.innerText = 1/delta;
    window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);