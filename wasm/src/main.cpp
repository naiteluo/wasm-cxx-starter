#include <GLES2/gl2.h>
#include <GLES2/gl2ext.h>
#include <SDL/SDL.h>

#include <iostream>
#include <emscripten/emscripten.h>

int main() {
    std::cout << "hi wasm main " << std::endl;
    return 0;
}

#ifdef __cplusplus
extern "C" {
#endif
EMSCRIPTEN_KEEPALIVE void say(int argc, char **argv) {
    std::cout << "hi wasm method" << std::endl;
}
#ifdef __cplusplus
};
#endif