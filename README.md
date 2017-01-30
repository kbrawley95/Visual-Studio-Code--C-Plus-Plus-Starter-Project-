-------------
INSTRUCTIONS
-------------
This repo is tailored to who wish to get started with VSCode(specifically configured for C++ Applications).
Include are a template project (with the relevant C++ extensions installed), a MinGW directory (Compilers, dependencies etc),
and a portable version of the Visual Studio Code Editor (**Visit**:https://github.com/garethflowers/vscode-portable/releases/tag/v1.8.1
for latest versions).

Make sure you have the following MinGW is added to your system path. This can be achieved through the following Command Prompt Sequence:

>set PATH=C:\MinGW\bin;%PATH%	**Change path to your actual location of the directory**

While provided, as a sanity check, you can make sure these extensions are installed:

>C/C++
>Include Autocomplete

Finally open the project folder with vs code and press F1
Then type 'run task' and click 'Run Task'. Select 'Build' from the menu.
Alternatively, you can debug the project by pressing F5 (CTRL +F5 run without debugging).

Your project should now be setup properly.

---------------------------------------------------------------------------
For more information on the materials provided, refer to the sources below:

>**VS Portable:** http://gareth.flowers/vscode-portable/
>**MinGW (Minimalist GNU for Windows):** http://mingw.org/
>**Debugging:** http://code.visualstudio.com/docs/editor/debugging
>**Tasks:** http://code.visualstudio.com/docs/editor/tasks