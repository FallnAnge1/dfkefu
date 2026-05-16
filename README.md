# 山东巅峰网络科技官网

这是一个企业官网项目，页面由原生 HTML、CSS 和 JavaScript 组成，试用申请表单通过 `/api/trial` 接口转发到企业微信机器人。

项目已经包含腾讯云 CVM 可用的 Node 服务入口：

- 静态页面：由 `server.cjs` 直接读取项目文件返回
- 表单接口：`/api/trial`
- 进程守护：推荐使用 `pm2`
- 域名访问：推荐使用 Nginx 反向代理到 `127.0.0.1:3000`

## 页面结构

- `index.html`：官网首页、核心业务、服务保障、试用申请表单
- `cases.html`：客户案例
- `pricing.html`：收费标准
- `news.html`：新闻资讯
- `about.html`：企业简介
- `honors.html`：荣誉资质
- `how-to-cooperate.html`：合作流程
- `privacy.html`：隐私政策
- `sitemap.html` / `sitemap.xml`：网站地图
- `api/trial.js`：试用申请接口
- `server.cjs`：腾讯云服务器运行入口
- `ecosystem.config.cjs`：PM2 配置
- `deploy/tencent-nginx.conf.example`：Nginx 反向代理示例

## 本地预览

```bash
npm start
```

然后访问：

```text
http://127.0.0.1:3000
```

## 部署配置

正式部署前需要配置环境变量：

```bash
WECOM_TRIAL_WEBHOOK_URL=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=你的企业微信机器人key
```

不要把真实 webhook 地址写进代码仓库。`.env.example` 只保留占位示例。

## 腾讯云 CVM 部署

以下以 Ubuntu / Debian 系服务器为例，CentOS 命令略有不同，但思路一致。

### 1. 准备服务器

在腾讯云控制台购买 CVM，建议：

- 系统：Ubuntu 22.04 LTS
- 安全组放行：`22`、`80`、`443`
- 域名解析：把 `dfkefu.com` 和 `www.dfkefu.com` 的 A 记录指向服务器公网 IP

### 2. 登录服务器

```bash
ssh root@你的服务器公网IP
```

### 3. 安装 Node.js、Nginx、PM2

```bash
apt update
apt install -y nginx curl
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
npm install -g pm2
```

检查版本：

```bash
node -v
npm -v
pm2 -v
```

### 4. 上传项目

如果你用 `scp` 上传，可以在本地执行：

```bash
scp -r /Users/fallenangel/dfkefu-main root@你的服务器公网IP:/var/www/dfkefu-main
```

如果你后续用 Git 管理，也可以在服务器上 `git clone` 到 `/var/www/dfkefu-main`。

### 5. 配置环境变量

进入服务器项目目录：

```bash
cd /var/www/dfkefu-main
cp .env.example .env
nano .env
```

把 `.env` 改成真实企业微信机器人地址：

```bash
WECOM_TRIAL_WEBHOOK_URL=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=你的真实key
```

### 6. 启动 Node 服务

```bash
cd /var/www/dfkefu-main
npm run check
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

本机测试：

```bash
curl -I http://127.0.0.1:3000/
```

看到 `HTTP/1.1 200 OK` 就说明 Node 服务已正常运行。

### 7. 配置 Nginx

创建站点配置：

```bash
nano /etc/nginx/sites-available/dfkefu.com
```

填入以下内容，并把域名换成你的真实域名：

```nginx
server {
    listen 80;
    server_name dfkefu.com www.dfkefu.com;

    client_max_body_size 1m;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

启用配置：

```bash
ln -s /etc/nginx/sites-available/dfkefu.com /etc/nginx/sites-enabled/dfkefu.com
nginx -t
systemctl reload nginx
```

现在访问：

```text
http://你的域名
```

### 8. 配置 HTTPS

域名备案和解析正常后，推荐使用腾讯云 SSL 证书，或在服务器上用 Certbot：

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d dfkefu.com -d www.dfkefu.com
```

完成后访问：

```text
https://你的域名
```

### 9. 常用维护命令

```bash
pm2 status
pm2 logs dfkefu-site
pm2 restart dfkefu-site
nginx -t
systemctl reload nginx
```

更新网站文件后：

```bash
cd /var/www/dfkefu-main
pm2 restart dfkefu-site
```

## 表单安全

当前接口已包含基础校验：

- 只允许 `POST`
- 店铺名和手机号必填
- 手机号必须是中国大陆 11 位手机号格式
- 文本字段做长度限制和简单清理
- 加了隐藏字段拦截常见自动提交
- 加了轻量级 IP 频率限制

如果后续投放广告或访问量上来，建议接入验证码、日志监控和更可靠的网关级限流。
