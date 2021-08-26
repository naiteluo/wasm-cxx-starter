import wasmLoader, {WasmModule} from "./WasmModule";

type PartialWasmModule = Partial<WasmModule>;
let wasmModule: WasmModule | undefined;

async function getWasm(initialModule: PartialWasmModule): Promise<WasmModule> {
    if (wasmModule) {
        return Promise.resolve(wasmModule);
    } else {
        wasmModule = await wasmLoader(initialModule);
        if (!wasmModule.bindings) {
            wasmModule.bindings = {
                say: wasmModule.cwrap('say', null, []),
                initGL: wasmModule.cwrap('initGL', 'number', ['number', 'number']),
                updateCameraRotationXY: wasmModule.cwrap('updateCameraRotationXY', 'number', ['number', 'number'], {
                    async: true
                }),
                tick: wasmModule.cwrap('tick', null, [], {
                    async: true
                })
            }
        }
        return wasmModule;
    }
}

export default getWasm;