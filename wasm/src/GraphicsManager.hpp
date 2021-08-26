#pragma once
#include <GLES3/gl3.h>
#include <GLES3/gl3platform.h>

#include "Eigen/Core"
#include "Eigen/Geometry"

#define DEG_TO_RAD M_PI / 180.0f
#define DEG_RAD_3 DEG_TO_RAD * 3

namespace Gm {
    class GraphicsManager {
    public:
        virtual int Initialize(int _width, int _height);

        virtual void Finalize();

        virtual void Clear();

        virtual void Draw();

        virtual void Reset();

        virtual void UpdateCameraPositionZ(float z);

        virtual void UpdateCameraRotationXY(float drx, float dry);

    private:
        void InitializeBuffers();

        bool InitializeProgram();

        void InitializePerspectiveMatrix();

        void UpdateCameraViewMatrix();

        void UpdateModelMatrix();

        bool SetShaderParameters(float *worldMatrix, float *viewMatrix, float *projectionMatrix);

    private:

        int m_width;
        int m_height;

        float rotateAngle = 0.0f;

        // handle to the shader program
        GLuint shaderProgram;
        // handle for Vertex Array Object
        GLuint VAO;
        // handles for Vertex Buffer Object
        GLuint VBOs[2];

        Eigen::Matrix4f m_worldMatrix;
        Eigen::Matrix4f m_viewMatrix;
        Eigen::Matrix4f m_projectionMatrix;

        float m_positionX = 0, m_positionY = 0, m_positionZ = -10;
        float m_rotationX = 0, m_rotationY = 0, m_rotationZ = 0;

        float m_modelRotationX = 45, m_modelRotationY = 45, m_modelRotationZ = 0;

        const float screenDepth = 1000.0f;
        const float screenNear = 0.1f;
    };
}
