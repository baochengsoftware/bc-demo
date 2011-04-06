BC平台演示

因子模块的配置需要，需要在~/.ssh/config文件中配置如下内容：
Host bcsoft.github.com
 User git
 Hostname github.com
 PreferredAuthentications publickey
 IdentityFile ~/.ssh/[你的ssh私钥,如id_rsa]
