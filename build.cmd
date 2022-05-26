@echo off
setlocal
set PATH=.\.ci\tools\;%PATH%

if "%1"=="Debug" (set CONFIGURATION=Debug) else (set CONFIGURATION=Release)
echo Building in %CONFIGURATION%

call yarn --cwd clientResources install
if %errorlevel% NEQ 0 exit /B %errorlevel%

if "%1"=="Debug" (CALL yarn --cwd clientResources build:debug) else (CALL yarn --cwd clientResources build:release)
if %errorlevel% NEQ 0 exit /B %errorlevel%

dotnet build CsrExtensions.csproj -c %Configuration%