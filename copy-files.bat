@echo off
call .\clear-files.bat
set currentPath=%cd%
cd ..
cd PFP-Revamp.wiki
git fetch
git pull
xcopy "%cd%\Documentation\CMS-Documentation" "%currentPath%\test-files\CMS-Documentation" /E/H/I/Q
xcopy "%cd%\.attachments" "%currentPath%\test-files\CMS-Documentation\.attachments" /E/H/I/Q

cd %currentPath%
exit /b