@echo off
setlocal
set PATH=.\.ci\tools\;%PATH%

if "%1"=="Debug" (set CONFIGURATION=Debug) else (set CONFIGURATION=Release)
echo Building in %CONFIGURATION%

call yarn --cwd CsrExtensions/clientResources install
if %errorlevel% NEQ 0 exit /B %errorlevel%

if "%1"=="Debug" (CALL yarn --cwd CsrExtensions/clientResources build:debug) else (CALL yarn --cwd CsrExtensions/clientResources build:release)
if %errorlevel% NEQ 0 exit /B %errorlevel%

dotnet build CsrExtensions.sln -c %Configuration%