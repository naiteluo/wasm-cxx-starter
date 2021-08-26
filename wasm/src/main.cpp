#include <GLES2/gl2.h>
#include <GLES2/gl2ext.h>
#include <SDL/SDL.h>

#include <iostream>
#include <emscripten/emscripten.h>
#include <Eigen/Core>
#include "GraphicsManager.hpp"

using namespace Eigen;

//int main() {
//    std::cout << "hi wasm main " << std::endl;
//    return 0;
//}

namespace Gm {
    Gm::GraphicsManager *g_pGraphicsManager = reinterpret_cast<Gm::GraphicsManager * >(new Gm::GraphicsManager);
}

SDL_Surface *screen;
Eigen::Matrix4f a = Matrix4f::Identity();

#ifdef __cplusplus
extern "C" {
#endif

void say(int argc, char **argv) {
    std::cout << "hi wasm method" << std::endl;
    std::cout << "eigen3 4x4 identity matrix print:\n" << a << std::endl;
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
    Gm::g_pGraphicsManager->Initialize(width, height);
    Gm::g_pGraphicsManager->Clear();
    Gm::g_pGraphicsManager->Draw();
    SDL_GL_SwapBuffers();
    return 1;
}

void updateCameraRotationXY(float x, float y) {
    return Gm::g_pGraphicsManager->UpdateCameraRotationXY(x, y);
}

void tick() {
    Gm::g_pGraphicsManager->Clear();
    Gm::g_pGraphicsManager->Draw();
    SDL_GL_SwapBuffers();
}

#ifdef __cplusplus
};
#endif