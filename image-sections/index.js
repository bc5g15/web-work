const image = new Image();
image.draggable = false;

image.style.position = 'absolute';
image.style.left = '0';
image.style.top = '0';

document.body.append(image);

document.onpaste = function (event) {
    const items = (event.clipboardData || event.originalEvent.clipboardData).items;
    console.log(JSON.stringify(items)); // might give you mime types
    for (const index in items) {
        const item = items[index];
        if (item.kind === 'file') {
            const blob = item.getAsFile();
            const reader = new FileReader();
            reader.onload = function (event) {
                // console.log(event.target.result); // data url!
                // const x = event.target.result;
                image.src = event.target.result;
            }; 
            reader.readAsDataURL(blob);
        }
    }
};

const dragBlock = document.createElement('div');
dragBlock.style.position = 'absolute';
dragBlock.style.width = '0%';
dragBlock.style.height = '0%';

dragBlock.style.outline = '0.2em solid red';

let x1 = 0;
let y1 = 0;

document.onmousedown = (ev) => {
    console.log(ev.clientX, ev.clientY);
    x1 = ev.clientX;
    y1 = ev.clientY;
}

document.onmouseup = (ev) => {
    console.log(ev.movementX, ev.movementY);

    const x2 = ev.clientX;
    const y2 = ev.clientY;

    const left = Math.min(x1, x2);
    const top = Math.min(y1, y2);
    const width = Math.max(x1, x2) - left;
    const height = Math.max(y1, y2) - top;
    console.log(left, top, width, height);
    dragBlock.style.width = `${width}px`;
    dragBlock.style.height = `${height}px`;
    dragBlock.style.left = `${left}px`;
    dragBlock.style.top = `${top}px`;
}

document.body.append(dragBlock);