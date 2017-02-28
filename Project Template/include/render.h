#ifndef _RENDER_H
#define _RENDER_H

class Render
{
    public:
    Render();
    ~Render();

    void initOpenGL();
    void drawToScreen();
    void cleanUp();

    private:
    void sendDataToOpenGL();
    void setViewport(int width, int height);

};

#include "../src/render.cpp"

#endif