import {Application} from "./application";
import getWasm from '../src'

getWasm().then((module) => {
    console.log("wasm module ready", module);
    console.log("js app ready");
    app.initialize();
    app.run();
    module.ccall("say", null, null, null);
})

const app = new Application();


