#include <GLES2/gl2.h>
#include <GLES2/gl2ext.h>
#include <SDL/SDL.h>

#include <iostream>
#include <emscripten/emscripten.h>

SDL_Surface *screen;
float r = .8f, g = .4f, b = .3f, a = 1.0f;

#ifdef __cplusplus
extern "C" {
#endif

void say(char *msg) {
    std::cout << "[WASM LOG] " << msg << std::endl;
}

int initGL(int width, int height) {
    if (SDL_Init(SDL_INIT_VIDEO | SDL_INIT_AUDIO | SDL_INIT_TIMER) == 0) {
        screen = SDL_SetVideoMode(width, height, 0, SDL_OPENGL);
        if (screen == NULL) {
            std::cerr << "SDL_SetVideoMode fails. " << SDL_GetError() << std::endl;
            return 0;
        }
    } else {
        std::cerr << "SDL_Init fails. " << SDL_GetError() << std::endl;
        return 0;
    }
    std::cout << "gles init success. start drawing in cxx" << std::endl;
    std::cout << "canvas size: " << width << "*" << height << std::endl;
    glClearColor(.8f, .4f, .3f, 1.0f);
    glClear(GL_COLOR_BUFFER_BIT);
    glViewport(0, 0, width, height);
    SDL_GL_SwapBuffers();
    return 1;
}

int updateColor(float _r, float _g, float _b, float _a) {
    r = _r;
    g = _g;
    b = _b;
    a = _a;
    return 1;
}

void tick() {
    glClearColor(r, g, b, a);
    glClear(GL_COLOR_BUFFER_BIT);
    SDL_GL_SwapBuffers();
}

#ifdef __cplusplus
};
#endif