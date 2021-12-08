# yande-proxy
基于yande.re官方json制作的第三方web页面


## 部署
1. 安装依赖
```bash
npm -i
```

2. 配置设置
重命名`wrangler.sample.toml`为`wrangler.toml`
更改`wrangler.toml`中`name = "yande"`与`account_id = "账户ID"`选项，更改为自己的设置

3. 开始部署
```bash
wrangler publish
```