@echo off
setlocal

REM ==============================
REM Config
REM ==============================
set MAX_SIZE=1024
set EXTENSIONS=jpg jpeg png webp bmp tif tiff

echo.
set /p TARGET_DIR=Enter folder path containing images: 

REM Remove quotes if pasted
set TARGET_DIR=%TARGET_DIR:"=%

if not exist "%TARGET_DIR%" (
    echo.
    echo ERROR: Folder does not exist.
    pause
    exit /b
)

echo.
echo Processing folder: %TARGET_DIR%
echo.

pushd "%TARGET_DIR%"

for %%E in (%EXTENSIONS%) do (
    echo Resizing *.%%E
    magick mogrify -resize %MAX_SIZE%x%MAX_SIZE%^> *.%%E
)

popd

echo.
echo Done resizing images.
pause
