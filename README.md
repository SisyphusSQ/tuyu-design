# tuyu-design

图屿 Studio 设计可视化 Web 原型。

本项目是独立的 Vite + Vue 3 + TypeScript 设计评审 App。内容来源是：

`/Users/suqing/Coding/golang/00_self/tuyu-studio/docs/design`

边界：

- 不在运行时解析 Markdown。
- 不依赖后端。
- 不调用 AI 运行时。
- 不写入源设计仓库。
- 不修改 `/Users/suqing/Coding/golang/00_self/tuyu-studio/docs/design`。

## 覆盖范围

- 7 个生产流程页：Overview、Project Setup、Asset Library、Creative Graph、Shot & Prompt、Package Export、Result Review。
- 10 个设计模块页：00 Product Scope 到 09 Delivery & Acceptance。
- 39 个子文档以模块页卡片和锚点覆盖，不拆成独立页面。
- 每个页面至少有一张主图，并附带读图说明、来源文档和对应验收点。
- AntV 示例：
  - `@antv/g6`：Creative Graph 关系图真实渲染。
  - `@antv/g2`：生产状态或模块覆盖图真实渲染。

## Commands

```bash
npm install
npm run build
npm run dev
```

默认 dev server 绑定 `127.0.0.1`。
