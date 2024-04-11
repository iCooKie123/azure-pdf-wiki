@echo off

call .\copy-files.bat
node .\link-replacer.js
node .\copy-toc.js
 call .\command.bat
 call .\clear-files.bat

exit /b