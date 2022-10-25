const first = document.getElementById('first');

first.onclick = async () => {
    console.log("Started method");

    const result = await new Promise(resolve => {
        const container = document.createElement('div');
        const yes = document.createElement('button');
        const no = document.createElement('button');
        container.append(yes,no);
        document.body.append(container);
        yes.innerText = "YES";
        no.innerText = "NO"
        const r = (value) => {
            document.body.removeChild(container);
            resolve(value);
        }
        yes.onclick = () => r('Yes');
        no.onclick = () => r('No');
    });

    console.log(result);
    console.log('done');

}