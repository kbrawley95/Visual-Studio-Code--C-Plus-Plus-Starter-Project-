#version 150

in vec3 vertexPosition;
in vec4 vertexColour;
out vec4 colour; 

uniform mat4 MVP;

void main()
{
    gl_Position = vec4(vertexPosition,1.0);
    colour = vertexColour;
}