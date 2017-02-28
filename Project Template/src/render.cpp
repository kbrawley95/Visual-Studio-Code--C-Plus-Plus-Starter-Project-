//ID of vertex buffer object
GLuint vertexBufferID;
//ID of elements (index) object
GLuint indexBufferID;

Render::Render()
{

}

Render::~Render()
{
    
}

void Render::sendDataToOpenGL()
{
    glewInit();


    //CUBE
    Vertex verts[]={

    /*FRONT*/

    //Top Left
    {glm::vec3(-0.5f, 0.5f, 0.5f),
    glm::vec4(1.0f, 0.0f,0.0f, 1.0f)}, 

    //Bottom Left
    {glm::vec3(-0.5f, -0.5f, 0.5f), 
    glm::vec4(1.0f, 0.0f,0.0f, 1.0f)},

    //Bottom Right
    {glm::vec3(0.5f, -0.5f, 0.5f), 
    glm::vec4(0.0f, 1.0f, 0.0f, 1.0f)},

    //Top Right
    {glm::vec3(0.5f, 0.5f, 0.5f),
    glm::vec4(.0f, 1.0f,0.0f, 1.0f)}, 

    /*BACK*/

    //Top Left
    {glm::vec3(-0.5f, 0.5f, -0.5f),
    glm::vec4(0.0f, 0.0f,1.0f, 1.0f)}, 

    //Bottom Left
    {glm::vec3(-0.5f, -0.5f, -0.5f), 
    glm::vec4(0.0f, 0.0f,1.0f, 1.0f)},

    //Bottom Right
    {glm::vec3(0.5f, -0.5f, -0.5f), 
    glm::vec4(0.0f, 1.0f, 1.0f, 1.0f)},

    //Top Right
    {glm::vec3(0.5f, 0.5f, -0.5f),
    glm::vec4(0.0f, 1.0f,1.0f, 1.0f)}, 
    
    };

    GLuint indices[]={
        //front 
        0,1,2,
        0,3,2,

        //left
        4,5,1,
        4,1,0,

        //right
        3,7,2,
        7,6,2,

        //bottom
        1,5,2,
        6,2,5,

        //top
        4,0,7,
        0,7,3,

        //back
        4,5,6,
        4,7,6

    };

   
    //Generater Buffer with given id
    glGenBuffers(1, &vertexBufferID);
    //Specify binding point (buffer to GL_Array_buffer)
    glBindBuffer(GL_ARRAY_BUFFER, vertexBufferID);
    //Bind data from buffer object to array buffer
    glBufferData(GL_ARRAY_BUFFER, sizeof(verts), verts, GL_STATIC_DRAW);

    //Enable Data on the Array Buffer
    //Tell the shader that 0 is the position elementsBufferID
    glEnableVertexAttribArray(0);
    glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, sizeof(Vertex), (void **)offsetof(Vertex, position));

    glEnableVertexAttribArray(1);
    glVertexAttribPointer(1,4, GL_FLOAT, GL_FALSE, sizeof(Vertex), (void **)offsetof(Vertex, colour));
    
    glGenBuffers(1, &indexBufferID);
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, indexBufferID);
    glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(indices), indices, GL_STATIC_DRAW);
}

void Render::initOpenGL()
{
   sendDataToOpenGL();
}

void Render::setViewport(int width, int height)
{
    //Setup viewport
    glViewport(0,0,(GLsizei)width, (GLsizei)height);
}

void Render::drawToScreen()
{
    //Clear the background to black
    glClearColor(0.0f,0.0f,0.0f,0.0f);
    glClear(GL_COLOR_BUFFER_BIT|GL_DEPTH_BUFFER_BIT);

    //Space to implement your own shader code (shaders & most of the opengl setup has already been writen for you)

    glDrawElements(GL_TRIANGLES, 6, GL_UNSIGNED_SHORT, 0);
}

void Render::cleanUp()
{
    glDeleteBuffers(1, &vertexBufferID);
    glDeleteBuffers(1, &indexBufferID);
}
