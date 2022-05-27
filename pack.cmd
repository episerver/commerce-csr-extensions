@echo off
setlocal

set CONFIGURATION=Release

if "%2"=="Debug" (set CONFIGURATION=Debug)

powershell .\build\pack.ps1 %1 -configuration %CONFIGURATION%

exit /B %errorlevel%
