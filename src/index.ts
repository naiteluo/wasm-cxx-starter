import wasmLoader, {WasmModule} from "./WasmModule";

let wasmModule: WasmModule | undefined;

async function getWasm():Promise<WasmModule> {
    if (wasmModule) {
        return Promise.resolve(wasmModule);
    } else {
        wasmModule = await wasmLoader();
        return wasmModule;
    }
}

export default getWasm;