import getWasm from "../src"

test("main", async () => {
    let module = await getWasm();
    console.log(module);
    expect('a').toBe('a');
})