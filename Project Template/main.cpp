//Main (Entry Point)
#include "include/Common.h"

Render* render;

void draw()
{
    //Render Test (Can be alter view the method below)
    render->drawToScreen();
}

int main(int argc, char* args[])
{
    const int WIDTH = 1024;
    const int HEIGHT = 720;

    bool isRunning = true;

   /*SDL ERROR CHECKING*/
    if (SDL_Init(SDL_INIT_EVERYTHING) != 0) {
        SDL_Log("Unable to initialize SDL: %s\n", SDL_GetError());
        return -1;
    }
    else{
        SDL_Log("SDL initialized");
    }

    //Generate Application Window
    SDL_Window* window = SDL_CreateWindow("SDL", //Window Title 
                        SDL_WINDOWPOS_CENTERED, //x
                        SDL_WINDOWPOS_CENTERED, //y
                        WIDTH, //Width
                        HEIGHT, //Height
                        SDL_WINDOW_OPENGL); //Flags


    //Map OpenGL context to window
    SDL_GLContext glContext = SDL_GL_CreateContext(window);

    //OpenGL Initialisation
    render->initOpenGL();


    //Handle Events (Input)
    SDL_Event event;
    while(isRunning)
    {
       while(SDL_PollEvent(&event))
       {
           if(event.type==SDL_QUIT || event.type ==SDL_WINDOWEVENT_CLOSE)
           {
               isRunning = false;
           }

           switch(event.type)
           {
               case SDL_KEYDOWN:
               {
                switch (event.key.keysym.sym)
                   {
                       case SDLK_ESCAPE:
                        isRunning = false;
                        break;

                   }
                   break;
               }
           }
       }
        // update ();
        draw();
        //Call swap so that our GL back buffer is displayed         
        SDL_GL_SwapWindow(window); 
    }

    //Clean Up (Free Allocated Memory)
    render->cleanUp();
    SDL_GL_DeleteContext(glContext);
    SDL_DestroyWindow(window);
    SDL_Quit();
    return 0;
}


