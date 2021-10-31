

// game loop

const rate = Math.floor(1000/60)

const gameLoop = async () => {
    const delay = (time) => new Promise(resolve => {
        setTimeout(() => resolve(), time)
    })

    let oldTime = Date.now()
    while (true) {
        let newTime = Date.now()
        const delta = (newTime - oldTime)/1000
        oldTime = newTime

        // Logic

        // Position

        // Draw
        if (delta < rate) {
            await delay(rate-delta)
        } else {
            await delay(10)
        }
    }
}