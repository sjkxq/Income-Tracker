@echo off
cd /d %~dp0
npm run dev
start http://localhost:5176
pause