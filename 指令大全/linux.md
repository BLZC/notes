1. 查看想开的端口是否已开 # firewall-cmd --query-port=666/tcp
2. 查看防火墙状态  # systemctl status firewalld
   - running 状态即防火墙已经开启
   - dead 状态即防火墙未开启
3. 开启防火墙 # service firewalld start  
4. 关闭防火墙 # systemctl stop firewalld
   - centos7.3 上述方式可能无法开启，可以先#systemctl unmask firewalld.service 然后 # systemctl start firewalld.service
5. 开永久端口号 firewall-cmd --add-port=666/tcp --permanent   提示    success 表示成功
6. 重新载入配置  # firewall-cmd --reload    比如添加规则之后，需要执行此命令
7. 若移除端口 # firewall-cmd --permanent --remove-port=666/tcp