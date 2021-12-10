const canvas = document.getElementById('canvas')

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d')

const mapWidth = 24
const mapHeight = 24
const screenWidth = 640
const screenHeight = 480

// Input management

const curKeys = new Set()
document.addEventListener('keydown', (e) => {
    curKeys.add(e.code)
})

document.addEventListener('keyup', (e) => {
    curKeys.delete(e.code)
})

const worldMap = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,2,2,2,2,2,0,0,0,0,3,0,3,0,3,0,0,0,1],
    [1,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,2,0,0,0,2,0,0,0,0,3,0,0,0,3,0,0,0,1],
    [1,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,2,2,0,2,2,0,0,0,0,3,0,3,0,3,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,4,0,4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,4,0,0,0,0,5,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,4,0,4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,4,0,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const verLine = (x, drawStart, drawEnd, colour) => {
    ctx.fillStyle = `rgb(${colour.join(',')})`
    ctx.fillRect(x, drawStart, 1, (drawEnd - drawStart))
}

const clearScreen = () => {
    ctx.fillStyle = 'white'
    ctx.clearRect(0, 0, screenWidth, screenHeight)
}

const drawFPS = (fps) => {
    ctx.fillText(fps, 10, 10)
}

function main() {
    let posX = 22, posY = 12    // X and Y start position
    let dirX = -1, dirY = 0     // initial direction vector
    let planeX = 0, planeY = 0.66   // 2d raycaster version of camera plane

    let time = 0 // time of current frame
    let oldTime = 0 // time of previous frame

    const w = screenWidth // I guess this is what this is?
    const h = screenHeight

    // Draw screen?

    const loopMe = (step) => {
        clearScreen()

        for (let x = 0; x < w; x++) {
            let cameraX = 2 * x / w-1 // X-coordinate in camera space
            let rayDirX = dirX + planeX * cameraX
            let rayDirY = dirY + planeY * cameraX

            // Which box of the map we are in
            let mapX = Math.floor(posX)
            let mapY = Math.floor(posY)
            
            // length of the ray from current position to next x or y side
            let sideDistX, sideDistY

            // Length of ray from one x or y-side to the next x or y-side
            let deltaDistX = (rayDirX === 0) ? 1e30 : Math.abs(1/rayDirX)
            let deltaDistY = (rayDirY === 0) ? 1e30 : Math.abs(1/rayDirY)
            let perpWallDist

            // What direction to step in x or y-direction (either +1 or -1)
            let stepX = 0, stepY = 0

            let hit = 0 // Was there a wall hit?
            let side    // was a NS or EW wall hit?

            // calculate step and initial sideDist
            if (rayDirX < 0) {
                stepX = -1
                sideDistX = (posX - mapX) * deltaDistX
            } else {
                stepX += 1
                sideDistX = (mapX + 1.0 - posX) * deltaDistX
            }
            if (rayDirY < 0) {
                stepY = -1
                sideDistY = (posY - mapY) * deltaDistY
            } else {
                stepY = 1
                sideDistY = (mapY + 1.0 - posY) * deltaDistY
            }

            // Perform DDA
            while (hit === 0) {
                // jump to next map square, either in x-direction or in y-direction
                if (sideDistX < sideDistY) {
                    sideDistX += deltaDistX
                    mapX += stepX
                    side = 0
                } else {
                    sideDistY += deltaDistY
                    mapY += stepY
                    side = 1
                }
                // Check if ray has hit a wall
                // console.log(stepX, posX, posY, mapX, mapY)
                if (worldMap[mapX][mapY] > 0) hit = 1
            }
            // Calculate distance projected on camera direction (Euclidian distance would give fisheye effect!)
            if (side === 0) perpWallDist = (sideDistX - deltaDistX)
            else            perpWallDist = (sideDistY - deltaDistY)

            // Calculate height of line to draw on screen
            let lineHeight = (h / perpWallDist)

            // calculate lowest and heighest pixel to fill in current stripe
            let drawStart = -lineHeight / 2 + h / 2
            if (drawStart < 0) drawStart = 0
            let drawEnd = lineHeight / 2 + h /2
            if (drawEnd >= h) drawEnd = h-1

            // choose wall colour
            let colour
            switch (worldMap[mapX][mapY])
            {
                case 1: colour = [255, 0, 0]; break; // red
                case 2: colour = [0, 255, 0]; break; // green
                case 3: colour = [0, 0, 255]; break; // blue
                case 4: colour = [255, 255, 255]; break; // white
                default: colour = [255, 255, 0]; break; // yellow
            }

            // give x and y sides different brightness
            if (side === 1) colour = colour.map(v => v/2)
            verLine(x, drawStart, drawEnd, colour)
        }

        // Timing for input and FPS counter(?)
        oldTime = time
        time = step
        let frameTime = (time - oldTime) / 1000
        drawFPS(1/frameTime)

        // speed modifiers
        let moveSpeed = frameTime * 5.0
        let rotSpeed = frameTime * 3.0

        // move forward if no wall in front of you
        if (curKeys.has('ArrowUp')) {
            if (worldMap[Math.floor(posX + dirX * moveSpeed)][Math.floor(posY)] === 0 ) posX += dirX * moveSpeed
            if (worldMap[Math.floor(posX)][Math.floor(posY + dirY * moveSpeed)] === 0) posY += dirY * moveSpeed
        }
        // move backwards if no wall behind you
        if (curKeys.has('ArrowDown')) {
            if (worldMap[Math.floor(posX - dirX * moveSpeed)][Math.floor(posY)] === 0) posX -= dirX * moveSpeed
            if (worldMap[Math.floor(posX)][Math.floor(posY - dirY * moveSpeed)] === 0) posY -= dirY * moveSpeed
        }
        // rotate to the right
        if (curKeys.has('ArrowRight')) {
            // Both camera direction and camera plane must be rotated
            let oldDirX = dirX
            dirX = dirX * Math.cos(-rotSpeed) - dirY * Math.sin(-rotSpeed)
            dirY = oldDirX * Math.sin(-rotSpeed) + dirY * Math.cos(-rotSpeed)
            let oldPlaneX = planeX
            planeX = planeX * Math.cos(-rotSpeed) - planeY * Math.sin(-rotSpeed)
            planeY = oldPlaneX * Math.sin(-rotSpeed) + planeY * Math.cos(-rotSpeed)
        }
        // rotate to the left
        if (curKeys.has('ArrowLeft')) {
            // Both camera direction and camera plane must be rotated
            let oldDirX = dirX
            dirX = dirX * Math.cos(rotSpeed) - dirY * Math.sin(rotSpeed)
            dirY = oldDirX * Math.sin(rotSpeed) + dirY * Math.cos(rotSpeed)
            let oldPlaneX = planeX
            planeX = planeX * Math.cos(rotSpeed) - planeY * Math.sin(rotSpeed)
            planeY = oldPlaneX * Math.sin(rotSpeed) + planeY * Math.cos(rotSpeed)
        }
        // console.log('hello')
        window.requestAnimationFrame(loopMe)
    }
    // MAIN LOOP GOES HERE
    window.requestAnimationFrame(loopMe)
}

main()