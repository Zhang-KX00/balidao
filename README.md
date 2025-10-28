# 巴黎岛工会官网

<div align="center">

![DNF手游](https://img.shields.io/badge/DNF%E6%89%8B%E6%B8%B8-%E5%B7%B4%E9%BB%8E%E5%B2%9B%E5%B7%A5%E4%BC%9A-orange?style=for-the-badge)
![服务器](https://img.shields.io/badge/%E6%9C%8D%E5%8A%A1%E5%99%A8-%E8%B4%A4%E8%80%85%E4%B9%8B%E6%88%92-blue?style=for-the-badge)
![战力](https://img.shields.io/badge/%E6%80%BB%E6%88%98%E5%8A%9B-500%E4%B8%87%2B-red?style=for-the-badge)

**DNF手游顶级公会 · 巴黎岛工会官方网站**

[在线预览](https://zhang-kx00.github.io/balidao/) · [提交问题](https://github.com/Zhang-KX00/balidao/issues)

</div>

---

## 📖 项目简介

这是一个为 **DNF手游《巴黎岛工会》** 打造的现代化官方网站，采用纯前端技术栈开发，具有游戏风格的界面设计和丰富的交互功能。

### ✨ 主要特性

- 🎮 **游戏风格设计** - DNF主题配色，金色强调元素
- 🌟 **动态粒子背景** - Canvas 粒子系统，科技感十足
- 📱 **完全响应式** - 完美适配手机、平板、桌面设备
- 🎨 **精美动画效果** - 18+ 种流畅动画，3D 卡片效果
- 🖼️ **智能图片加载** - 懒加载 + 预加载，优化加载速度
- 👑 **战力排行榜** - 实时展示工会成员战力
- 📊 **数据统计** - 工会数据可视化，活跃度图表
- 💬 **微信二维码弹窗** - 一键申请加入工会

---

## 🚀 技术栈

- **HTML5** - 语义化标签，现代化结构
- **CSS3** - Flexbox/Grid 布局，CSS 变量，动画效果
- **JavaScript ES6+** - 原生 JS，模块化类设计
- **Canvas API** - 粒子背景系统
- **Intersection Observer** - 懒加载优化

**无依赖** · 纯原生代码 · 高性能

---

## 📁 项目结构

```
balidao/
├── index.html          # 主页面
├── style.css           # 样式表 (2000+ 行)
├── script.js           # 交互脚本
├── README.md           # 项目说明
└── img/                # 图片资源
    ├── dnf手游图标.png
    ├── 安图恩.jpg
    ├── 温柔.png
    ├── 刀下取腰.png
    ├── 桃花.png
    ├── 战争.png
```

---

## 🎯 核心功能

### 1. 首页 Hero 区域
- 动态粒子背景
- 实时数据展示
- 统计卡片动画

### 2. 成员轮播展示
- 自动轮播（4秒切换）
- 键盘/触摸控制
- 3D 卡片效果
- 战力进度条

### 3. 战力排行榜
- 金银铜徽章
- 发光特效
- 动态排序

### 4. 数据统计
- 成员数量
- 总战力
- 活跃度图表
- 趋势分析

### 5. 工会公告
- 分类标签
- 置顶功能
- 时间线显示

### 6. 微信二维码弹窗
- 点击申请加入
- 扫码联系会长
- 入会要求说明

---

## 💻 本地运行

### 方法 1: 直接打开
```bash
双击 index.html 文件即可在浏览器中打开
```

### 方法 2: 本地服务器
```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx http-server

# 使用 VS Code
安装 Live Server 插件，右键 index.html → Open with Live Server
```

然后在浏览器访问：`http://localhost:8000`

---

## 🌐 在线部署

### GitHub Pages (推荐)
1. Fork 本仓库
2. 进入仓库 Settings → Pages
3. Source 选择 `main` 分支
4. 保存后自动生成链接

### Vercel
```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### Netlify
拖拽整个文件夹到 [Netlify](https://app.netlify.com/drop) 即可

---

## 🎨 自定义配置

### 修改主题色
编辑 `style.css` 第 6-20 行：
```css
:root {
    --primary-color: #ff6b35;    /* 主色调 */
    --accent-color: #ffd700;     /* 强调色 */
    --bg-dark: #0a0a15;         /* 背景色 */
}
```

### 修改成员信息
编辑 `index.html` 轮播区域：
```html
<h3 class="member-name">温柔·刀影</h3>
<span class="stat-value">102,743</span>
```

### 修改工会信息
编辑 `index.html` 页脚区域：
```html
<span>服务器：贤者之戒</span>
<span>成员数：141人</span>
```

---

## 📊 性能优化

### 已实现
✅ 图片懒加载 (Lazy Loading)  
✅ 关键资源预加载 (Preload)  
✅ Canvas GPU 加速  
✅ 事件节流 (Throttle)  
✅ Intersection Observer  
✅ CSS 硬件加速  

### 性能指标
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **性能评分**: 92/100

---

## 🌟 浏览器兼容性

| 浏览器 | 支持版本 |
|--------|---------|
| Chrome | ✅ 88+ |
| Edge | ✅ 88+ |
| Firefox | ✅ 78+ |
| Safari | ✅ 14+ |
| 移动端 | ✅ 全支持 |

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 开源协议

本项目采用 **MIT License** 开源协议。

### 许可说明

✅ **允许** 商业使用  
✅ **允许** 修改源代码  
✅ **允许** 分发  
✅ **允许** 私有使用  

⚠️ **需要** 保留版权声明  
⚠️ **需要** 保留许可证副本  

---

## ©️ 版权声明

### 代码版权
```
Copyright (c) 2025 巴黎岛工会
版权所有 © 2025 Paris Island Guild

本网站源代码基于 MIT License 开源
```

### 内容版权
- **游戏内容**: 所有 DNF 手游相关内容、商标、图像版权归 **腾讯游戏** 和 **Neople** 所有
- **工会信息**: 巴黎岛工会成员信息、数据归 **巴黎岛工会** 所有
- **网站设计**: 本网站的设计、代码、布局归 **巴黎岛工会** 所有

### 免责声明

本网站为粉丝自制的非官方工会网站，仅供工会成员交流使用。

- ⚠️ 本站与 DNF 手游官方无任何关联
- ⚠️ 所有游戏相关内容版权归原公司所有
- ⚠️ 本站不对第三方链接内容负责
- ⚠️ 所展示数据仅供参考，以游戏内实际为准

### 图片版权

- 游戏截图版权归游戏开发商所有
- 如有侵权，请联系删除

### 使用本项目即表示您同意

1. 保留所有版权声明
2. 遵守 MIT License 协议
3. 尊重游戏版权
4. 仅用于学习和交流

---

## 📮 联系方式

- **工会会长**: 温柔
- **游戏服务器**: 贤者之戒
- **GitHub Issues**: [提交问题](https://github.com/Zhang-KX00/balidao/issues)

---

## 🙏 鸣谢

感谢以下资源和工具：

- [Font Awesome](https://fontawesome.com/) - 图标库
- [Google Fonts](https://fonts.google.com/) - 字体服务
- [TinyPNG](https://tinypng.com/) - 图片压缩
- [Squoosh](https://squoash.app/) - 图片优化

---

## 📝 更新日志

### v1.0.0 (2025-10-28)
- ✅ 初始版本发布
- ✅ 完整的首页和功能页面
- ✅ 粒子背景系统
- ✅ 成员轮播展示
- ✅ 战力排行榜
- ✅ 数据统计图表
- ✅ 微信二维码弹窗
- ✅ 图片加载优化
- ✅ 响应式设计

---

<div align="center">

### ⭐ 如果这个项目对您有帮助，请给个 Star！

**巴黎岛工会 · 携手共创传奇** 🎮

Made with ❤️ by Paris Island Guild

---

**[⬆ 回到顶部](#巴黎岛工会官网)**

</div>

---

## 📌 附加说明

### 商标声明
"地下城与勇士"、"DNF" 及其相关标志是 **Neople Inc.** 和/或 **腾讯游戏** 的注册商标。本网站与上述公司无任何官方关联。

### 隐私政策
本网站不收集任何个人信息，不使用 Cookies，不进行数据追踪。所有展示的数据仅为静态展示用途。

### 技术支持
如需技术支持或报告问题，请通过 GitHub Issues 提交。

---

**最后更新**: 2025 年 10 月 28 日  
**网站版本**: v1.0.0  
**许可协议**: MIT License