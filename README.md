-------------
INSTRUCTIONS
-------------
This repo is tailored to who wish to get started with VSCode(specifically configured for C++ Applications).
Included is a template project (with the relevant C++ extensions installed), a MinGW directory (Compilers, dependencies etc),
and a portable version of the Visual Studio Code Editor (**Visit**:https://github.com/garethflowers/vscode-portable/releases/tag/v1.8.1
for latest versions).

Make sure you have the MinGW directory added to your system path. This can be achieved through the following Command Prompt Sequence:

>set PATH=C:\MinGW\bin;%PATH%	**Change path to your actual location of the directory**

While provided, as a sanity check, you may wish to ensure these extensions are installed:

>C/C++<br/>
>Include Autocomplete

Additionally, make sure all compatible Microsoft C++ Redistributions are installed correctly. This can be achieved by going to the Microsoft
support page [http://www.microsoft.com/en-us/download/details.aspx?id=48145], or installing a Windows supported game.

Finally open the project folder with vs code and press F1
Then type 'run task' and click 'Run Task'. Select 'Build' from the menu.
Alternatively, you can debug the project by pressing F5 (CTRL + F5 run without debugging).

Your project should now be setup properly.

---------------------------------------------------------------------------
For more information on the materials provided, refer to the sources below:

>**VS Portable:** http://gareth.flowers/vscode-portable/<br/>
>**MinGW (Minimalist GNU for Windows):** http://mingw.org/<br/>
>**Debugging:** http://code.visualstudio.com/docs/editor/debugging<br/>
>**Tasks:** http://code.visualstudio.com/docs/editor/tasks