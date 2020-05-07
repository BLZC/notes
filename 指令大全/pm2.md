- pm2 start app.js # 启动app.js应用程序
- pm2 start app.js --watch # 当文件变化时自动重启应用
- pm2 list # 列表 PM2 启动的所有的应用程序
- pm2 monit # 显示每个应用程序的CPU和内存占用情况
- pm2 show [app-name] # 显示应用程序的所有信息
- pm2 logs # 显示所有应用程序的日志
- pm2 logs [app-name] # 显示指定应用程序的日志
- pm2 flush # 清除日志
- pm2 stop all # 停止所有的应用程序
- pm2 stop 0 # 停止 id为 0的指定应用程序
#### 注意restart和reload的区别：reload可以实现0s无缝对接
- pm2 restart/reload all # 重启所有应用
- pm2 reload/restart [name/id] # 重启 某项服务
- pm2 delete all # 关闭并删除所有应用
- pm2 delete 0 # 删除指定应用 id 0
- pm2 scale api 10 # 把名字叫api的应用扩展到10个实例
- pm2 startup # 创建开机自启动命令
- pm2 save # 保存当前应用列表
- pm2 resurrect # 重新加载保存的应用列表

[更多相关内容请前往](https://github.com/jawil/blog/issues/7)