# Signature Capture：免费的开源签名背景去除工具

[![在线应用](https://img.shields.io/badge/live-signature.codeant.studio-2e7d32)](https://signature.codeant.studio/)
[![许可证：MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![运行环境：Cloudflare Workers](https://img.shields.io/badge/Runtime-Cloudflare%20Workers-f38020.svg)](https://developers.cloudflare.com/workers/static-assets/)

[English](./README.md) | [简体中文](./README.zh-CN.md)

这是一个免费的开源浏览器应用，可以去除纸张背景，将手写签名保存为透明 PNG 图片。

应用使用手机或电脑摄像头拍摄签名，在浏览器本地裁剪签名区域并去除纸张背景，然后让你下载处理后的图片。拍摄的图片不会上传。

本仓库包含 React 和 Vite 应用，以及用于 Cloudflare Workers Static Assets 部署的配置。

在线地址：https://signature.codeant.studio/

规范地址：https://signature.codeant.studio/

运行环境：Cloudflare Workers Static Assets，从 `dist` 目录提供 Vite 构建文件。

## 项目简介

Signature Capture 是免费的开源签名背景去除工具。它使用手机或电脑摄像头拍摄纸上手写签名，在浏览器本地去除纸张背景，并导出透明 PNG 图片。

签名图片只在你的浏览器中处理。应用不要求账户，也不会将拍摄的图片上传到服务器。

## 功能

* 使用本地摄像头拍摄
* 切换可用的视频设备
* 自动优先选择更清晰的手机或电脑摄像头
* 在浏览器中清理背景
* 下载 PNG 或复制到剪贴板
* 在 Cloudflare Workers Static Assets 上支持单页应用路由
* 支持分支部署预览地址

## 截图

### 手机

![Signature Capture 手机截图](./docs/screenshots/mobile-capture.png)

### 桌面

![Signature Capture 桌面截图](./docs/screenshots/desktop-capture.png)

## 技术栈

* React 19
* TypeScript
* Vite
* React Router
* React Helmet Async
* Tailwind CSS
* PostCSS 和 Autoprefixer
* 带 React Hooks 规则的 ESLint
* Cloudflare Workers Static Assets
* Wrangler

## 图片处理算法

清理算法位于 `src/core/imageProcessing.ts`。它保持小型、确定且只在浏览器中运行，因此签名图片不需要离开用户设备。

处理流程如下：

1. 从摄像头画面裁剪虚线引导框区域。
2. 将裁剪结果绘制到隐藏画布。
3. 使用灰度亮度值处理 RGB 像素。
4. 构建 256 个灰度级别的直方图。
5. 使用大津法自动寻找阈值。
6. 创建二值透明度遮罩。
7. 通过形态学闭运算连接细小的笔画断点。
8. 将签名笔画写成黑色，并将背景设为透明。
9. 导出 PNG 数据地址，供预览、复制或下载。

算法参考：

* Nobuyuki Otsu，《A Threshold Selection Method from Gray-Level Histograms》，IEEE Transactions on Systems, Man, and Cybernetics，1979。DOI：https://doi.org/10.1109/TSMC.1979.4310076
* 灰度转换使用常见的 Rec. 601 风格 RGB 到亮度近似权重。

## 开发

```bash
npm install
npm run dev
```

## 本地测试环境

请使用本项目专用的本地端口，避免与其他应用冲突。

运行自动化测试：

```bash
npm test
```

运行 Vite 开发服务器：

```bash
npm run dev -- --host 127.0.0.1 --port 5174 --strictPort
```

访问 `http://127.0.0.1:5174/`。

测试生产构建：

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4174 --strictPort
```

访问 `http://127.0.0.1:4174/`。

运行完整检查：

```bash
npm run check
```

## 构建

```bash
npm run build
```

## 部署

本地部署命令如下：

```bash
npm run deploy
```

Cloudflare Web Analytics 只在部署环境提供令牌时启用。请在部署环境中设置 `VITE_CLOUDFLARE_ANALYTICS_TOKEN`。即使本地环境存在令牌，localhost 预览也不会加载统计脚本。

## CNB CI/CD

CNB 是本项目的主仓库和 CI/CD 平台，GitHub 保留为备份镜像。

CNB 仓库：https://cnb.cool/CodeAnt-2026/signature-capture/

GitHub 备份：https://github.com/mobilEKG/signature-capture/

根目录的 `.cnb.yml` 会执行以下流程：

* 合并请求运行 lint、测试和生产构建。
* 推送到 `main` 后重复这些检查，并部署到 Cloudflare Workers。
* Git 标签运行完整检查，作为发布点验证，但不会重复部署。

在 CNB 中将以下变量配置为受保护的秘密变量，然后再启用主分支部署：

* `CLOUDFLARE_API_TOKEN`：具有本 Worker 部署权限的 Cloudflare API 令牌。
* `CLOUDFLARE_ACCOUNT_ID`：拥有此 Worker 的 Cloudflare 账户 ID。
* `VITE_CLOUDFLARE_ANALYTICS_TOKEN`：可选的 Web Analytics 令牌。

不要将这些值提交到仓库。缺少必要部署秘密时，主分支流水线会在运行 Wrangler 前失败。

部署目标由 [`wrangler.toml`](./wrangler.toml) 定义。新的提交应以 CNB 为准，GitHub 备份应保持相同的提交。

## 隐私模型

签名图片只在浏览器本地处理。应用不要求账户，也不会将拍摄的图片发送到服务器。

请勿提交以下内容：

* 生成的秘密
* VAPID 私钥
* API 令牌
* `.env` 文件
* Cloudflare 凭据

`vapid-keys.json`、`.env` 和 `.env.*` 已加入 Git 忽略规则。公开部署地址不是秘密凭据。

## 贡献

欢迎贡献代码。提交合并请求前，请阅读 [CONTRIBUTING.md](./CONTRIBUTING.md)。

安全或隐私问题不要提交公开 issue，请按照 [SECURITY.md](./SECURITY.md) 中的方式联系维护者。

## 许可证

本项目使用 MIT 许可证。详情请查看 [LICENSE](./LICENSE)。
