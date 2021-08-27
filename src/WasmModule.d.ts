/**
 * define your customized emscripten module
 * export as ts api
 */
export interface WasmModule extends EmscriptenModule {
    canvas: HTMLCanvasElement;
    ccall: (...args: any[]) => any;
    cwrap: (
        ident: string,
        returnType: Emscripten.JSType | null,
        argTypes: Emscripten.JSType[],
        opts?: Emscripten.CCallOpts,
    ) => ((...args: any[]) => any);
    bindings: {
        say: (msg: string) => void;
        initGL: (w: number, h: number) => boolean;
        updateColor: (r: number, g: number, b: number, a: number) => boolean;
        tick: () => void;
    };
}

declare const factory: EmscriptenModuleFactory<WasmModule>;
// return the wasm module factory
export default factory;
