import {Application} from "./application";
import getWasm from '../src'

let canvas = document.getElementById('stage') as HTMLCanvasElement;

let stop = false;
let frameCount = 0;
let fps: number, fpsInterval: number, startTime: number, now: number, then: number, elapsed: number;

canvas.style.position = "absolute";
canvas.style.top = "0px";
canvas.style.left = "0px";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

getWasm({
    canvas
}).then((module) => {
    console.log("wasm module ready", module);
    console.log("js app ready");
    app.initialize();
    app.run();
    module.bindings.say();
    module.bindings.initGL(canvas.width, canvas.height);
    let dragStart: boolean;
    let clientX: number, clientY: number;
    canvas.addEventListener("touchstart", (e) => {
        // Cache the client X/Y coordinates
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
        dragStart = true;
    });
    canvas.addEventListener("touchmove", (e) => {
        if (dragStart) {
            let deltaX, deltaY;

            // Compute the change in X and Y coordinates.
            // The first touch point in the changedTouches
            // list is the touch point that was just removed from the surface.
            deltaX = e.changedTouches[0].clientX - clientX;
            deltaY = e.changedTouches[0].clientY - clientY;
            module.bindings.updateCameraRotationXY(-deltaY / 10, -deltaX / 10);
        }
    });
    canvas.addEventListener("touchend", (e) => {
        dragStart = false;
    });

    function startTick(fps: number) {
        fpsInterval = 1000 / fps;
        then = Date.now();
        startTime = then;
        tick();
    }

    function tick() {
        // request another frame

        requestAnimationFrame(tick);

        // calc elapsed time since last loop

        now = Date.now();
        elapsed = now - then;

        // if enough time has elapsed, draw the next frame

        if (elapsed > fpsInterval) {

            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            then = now - (elapsed % fpsInterval);

            // Put your drawing code here
            module.bindings.tick();
        }
    }


    startTick(60);

})

const app = new Application();


