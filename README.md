# 陈与小金 · 个人站

这是 [xiaochens.com](https://xiaochens.com/) 的公开源码：一个以个人作品、工作流和 AI 实践为主题的中文个人站，并保留了一个受 Santioni Spirits 启发的原生 WebGL 叙事入口。

## 本地运行

```bash
npm install
npm run dev
```

构建与检查：

```bash
npm run build
npm run verify:site
npm run lint
```

## 目录说明

- `src/`：React 页面、内容和样式。
- `public/experience/`：原生 WebGL 互动入口及其资源。
- `scripts/build-native-home.mjs`：将原生互动入口写入生产首页，同时保留作品集子页面。

## 关于复刻

原生 WebGL 入口的交互结构和视觉方向参考了 [Santioni Spirits](https://santionispirits.com/) 的获奖网站体验；原站由 Active Theory 制作、Plan8 负责声音。这里的文字、人物形象、品牌内容和个人站页面已替换为陈与小金的内容。

本仓库用于展示和交流个人站实现。原站及其第三方素材的版权归各自权利人所有；本仓库没有授予这些第三方素材的额外许可。
