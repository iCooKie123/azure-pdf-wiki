@echo off
if exist "%cd%\test-files\CMS-Documentation" (
    rmdir /s /q "%cd%\test-files\CMS-Documentation"
)