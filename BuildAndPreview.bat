@echo off
REM 构建项目
echo 正在构建项目...
call npm run build
if %errorlevel% neq 0 (
    echo 构建项目出错，错误代码：%errorlevel%
    exit /b %errorlevel%
)

REM 启动本地服务器并打开浏览器访问
echo 正在启动本地服务器并打开浏览器访问...
start http://localhost:4173/
npm run preview
if %errorlevel% neq 0 (
    echo 启动预览服务器出错，错误代码：%errorlevel%
    exit /b %errorlevel%
)

echo 预览服务器启动成功！
pause