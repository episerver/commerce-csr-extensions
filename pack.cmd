@echo off
setlocal

set CONFIGURATION=Debug

if "%2"=="Release" (set CONFIGURATION=Release)

powershell .\build\pack.ps1 %1 -configuration %CONFIGURATION%

exit /B %errorlevel%
