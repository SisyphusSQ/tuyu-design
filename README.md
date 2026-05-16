# tuyu-design

图屿 Studio Canvas-first 视觉原型。

本项目是独立的 Vite + Vue 3 + TypeScript 设计评审 App。它用于把后续 Studio 真正产品界面先做成可看的静态工作台，而不是复刻文档内容。内容来源是：

`/Users/suqing/Coding/golang/00_self/tuyu-studio/docs/design`

边界：

- 不在运行时解析 Markdown。
- 不依赖后端，当前只做静态视觉与信息架构。
- 不调用 AI 运行时。
- 不写入源设计仓库。
- 不修改 `/Users/suqing/Coding/golang/00_self/tuyu-studio/docs/design`。

## 覆盖范围

- 8 个 Studio 页面：App Shell / Project Canvas、Technology Stack、Project Setup、Asset Library、Project Canvas、Shot & Prompt、Handoff Fallback、Result Review。
- 10 个设计模块页：00 Product Scope 到 09 Delivery & Acceptance。
- 40 个子文档以模块页卡片和锚点覆盖，不拆成独立页面。
- 总览页提供 Canvas-first App Shell：左侧入口、无限画布、Inspector、任务/健康、Dark 与暖浅画布视觉口径。
- Shot & Prompt 页补充画布内脚本展开表：镜号、时长、画面描述、角色、角色图、行级状态、重新生成、生成分镜、下载和全屏展开。
- 每个页面至少有一张主图，并附带读图说明、来源文档和对应验收点。
- AntV 示例：
  - `@antv/g6`：Project Canvas/Creative Graph 关系图真实渲染。
  - `@antv/g2`：生产状态或模块覆盖图真实渲染。

## Commands

```bash
npm install
npm run build
npm run dev
```

默认 dev server 绑定 `127.0.0.1`。
