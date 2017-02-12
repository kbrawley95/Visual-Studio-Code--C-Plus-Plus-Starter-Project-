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

**UPDATES:**

1. **The following popular OpenGL libaries (SDL2, GLM, GLEW) have been added.**

2. **Ensure that your editor is using the approrpiate integrated terminal by default.** 
**This can be set through File-->Preferences-->Settings and adding one of the following configuration to your settings.json file:**
  
>**64-bit cmd if available, otherwise 32-bit**<br/>
>"terminal.integrated.shell.windows": "C:\\Windows\\sysnative\\cmd.exe"<br/><br/>
>**64-bit PowerShell if available, otherwise 32-bit**<br/>
>"terminal.integrated.shell.windows": "C:\\Windows\\sysnative\\WindowsPowerShell\\v1.0\\powershell.exe"<br/><br/>
>**Git Bash**
>"terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe"<br/>><br/>
>**Bash on Ubuntu (on Windows)**
>"terminal.integrated.shell.windows": "C:\\Windows\\sysnative\\bash.exe"<br/


---------------------------------------------------------------------------
For more information on the materials provided, refer to the sources below:

>**VS Portable:** http://gareth.flowers/vscode-portable/<br/>
>**MinGW (Minimalist GNU for Windows):** http://mingw.org/<br/>
>**Debugging:** http://code.visualstudio.com/docs/editor/debugging<br/>
>**Integrated Terminal: https://code.visualstudio.com/docs/editor/integrated-terminal**<br/>
>**Tasks:** http://code.visualstudio.com/docs/editor/tasks<br/>
>**OpenGL Documentation:** https://www.opengl.org/<br/>
