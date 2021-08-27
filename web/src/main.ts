import {Application} from "./application";
import getWasm from '../../src'

import * as Dat from "dat.gui";


let canvas = document.getElementById('stage') as HTMLCanvasElement;

let stop = false;
let frameCount = 0;
let fps: number, fpsInterval: number, startTime: number, now: number, then: number, elapsed: number;

// create app

const app = new Application({
    canvas,
    fps: 60
});

app.initialize().then(() => {
    app.log("app initialized");
    app.run();
});

// create control panel

const controls = new Dat.GUI();
const state = {
    randomColor: () => {
        app.updateRandomColor();
    },
    setColorOutOfRange:()=> {
        app.updateColor(2,2,2,1);
    }
}

controls.add(state, 'randomColor').name('Random');
controls.add(state, 'setColorOutOfRange').name('Out Range');
