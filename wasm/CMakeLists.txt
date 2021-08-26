cmake_minimum_required(VERSION 3.5 FATAL_ERROR)

project(WASM_STARTER
        LANGUAGES CXX)

#set(CMAKE_EXECUTABLE_SUFFIX ".js")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -s \"EXTRA_EXPORTED_RUNTIME_METHODS=['ccall']\" -s MODULARIZE=1 -s SINGLE_FILE=1 -s INVOKE_RUN=0 -s NO_EXIT_RUNTIME=1")
add_executable(WasmModule src/main.cpp)

add_custom_command(TARGET WasmModule POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy ${CMAKE_CURRENT_BINARY_DIR}/WasmModule.js ${CMAKE_CURRENT_LIST_DIR}/../src/WasmModule.js
        )
