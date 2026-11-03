@echo off
chcp 65001 > nul
title 摄影作品集网站本地服务 (Port 8765)
color 0A
echo ================================================================
echo           ALEX ARCHIVE - 摄影作品集 本地服务已启动
echo ================================================================
echo.
echo   [1] 前台网站展示:   http://127.0.0.1:8765/
echo   [2] 后台内容管理:   http://127.0.0.1:8765/admin.html
echo.
echo   * 支持修改即时写入本地 portfolio_data.json
echo   * 支持卡片一键更换图片与粘贴 (Ctrl+V)
echo   * 请保持此命令行窗口运行，关闭窗口即停止服务
echo.
echo ================================================================
echo.
python server.py
if errorlevel 1 (
    echo.
    echo [错误] Python 启动失败，请确保电脑已安装 Python 并已添加至环境变量。
    pause
)
