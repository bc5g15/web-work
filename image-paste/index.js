const image = new Image();
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
                console.log(event.target.result); // data url!
                // const x = event.target.result;
                image.src = event.target.result;
            }; 
            reader.readAsDataURL(blob);
        }
    }
};
