export interface WasmModule extends EmscriptenModule {
    ccall: (...args: any[]) => any;
}
export default function (): Promise<WasmModule>