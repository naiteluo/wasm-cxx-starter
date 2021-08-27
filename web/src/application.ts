import getWasm, {WasmModule} from "../../src";

const Default_FPS = 60;

class Application {

    private canvas: HTMLCanvasElement;
    private wasm?: WasmModule;

    private stopped = false;
    private frameCount = 0;
    private fps: number;
    private fpsInterval!: number;
    private startTime!: number;
    private now!: number;
    private then!: number;
    private elapsed!: number;

    constructor(configs: { canvas: HTMLCanvasElement, fps: number }) {
        configs.canvas.style.position = "fixed";
        configs.canvas.style.top = "0px";
        configs.canvas.style.left = "0px";
        configs.canvas.width = window.innerWidth;
        configs.canvas.height = window.innerHeight;
        configs.canvas.style.zIndex = '0';
        this.canvas = configs.canvas;
        window.addEventListener('resize', (e) => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.wasm?.bindings.initGL(this.canvas.width, this.canvas.height);
        })
        this.fps = configs.fps ?? Default_FPS;
    }

    async initialize() {
        this.wasm = await getWasm({canvas: this.canvas});
        console.log("wasm module ready", this.wasm);
        console.log("app ready");
        this.wasm.bindings.initGL(this.canvas.width, this.canvas.height);
    }

    finalize() {
        // todo properly release
    }

    run() {
        this.fpsInterval = 1000 / this.fps;
        this.then = Date.now();
        this.startTime = this.then;
        this.stopped = false;
        this.tick();
    }

    stop() {
        this.stopped = true;
    }

    private tick() {
        if (this.stopped) return;
        // request another frame

        requestAnimationFrame(() => {
            this.tick();
        });

        // calc elapsed time since last loop

        this.now = Date.now();
        this.elapsed = this.now - this.then;

        // if enough time has elapsed, draw the next frame

        if (this.elapsed > this.fpsInterval) {

            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            this.then = this.now - (this.elapsed % this.fpsInterval);

            // Put your drawing code here

            this.render();
        }
    }

    private render() {
        // run cxx app tick
        this.wasm?.bindings.tick();
    }

    updateRandomColor() {
        this.wasm?.bindings.updateColor(Math.random(), Math.random(), Math.random(), 1);
    }

    updateColor(r: number, g: number, b: number, a: number) {
        this.wasm?.bindings.updateColor(r, g, b, a);
    }

    log(msg: string) {
        this.wasm?.bindings.say(msg);
    }
}

export {Application}