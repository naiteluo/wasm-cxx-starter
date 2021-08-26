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
        say: () => void;
        initGL: (w: number, h: number) => boolean;
        updateCameraRotationXY: (x: number, y: number) => boolean;
        tick: () => void;
    };
}

declare const factory: EmscriptenModuleFactory<WasmModule>;
export default factory;
