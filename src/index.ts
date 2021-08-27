import wasmLoader, {WasmModule} from "./WasmModule";

export {WasmModule};

/**
 * wasm module wrapping
 * load and construct original wasm module
 * initialize and bind apis
 */

type PartialWasmModule = Partial<WasmModule>;
let wasmModule: WasmModule | undefined;

/**
 * get an wasm module
 *
 * @param initialModule module configs/template
 */
async function getWasm(initialModule: PartialWasmModule): Promise<WasmModule> {
    if (wasmModule) {
        return Promise.resolve(wasmModule);
    } else {
        wasmModule = await wasmLoader(initialModule);
        if (!wasmModule.bindings) {
            wasmModule.bindings = {
                say: wasmModule.cwrap('say', null, ["string"]),
                initGL: wasmModule.cwrap('initGL', 'number', ['number', 'number']),
                updateColor: wasmModule.cwrap('updateColor', 'number',
                    ['number', 'number', 'number', 'number'], {
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