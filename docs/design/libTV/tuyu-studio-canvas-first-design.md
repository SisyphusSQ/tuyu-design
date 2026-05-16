# 图屿 Studio Canvas-first 双入口设计方案

状态：已完成方向讨论，待用户 review 后进入实施计划  
日期：2026-05-16  
关联调研：`docs/design/libTV/README.md`

## 1. 背景

LibTV 的核心体验不是传统多页面工作台，而是无限画布、节点生成、模板工具箱、案例制作过程和 Agent/Skill 入口。图屿 Studio 需要尽可能多地借鉴 LibTV 的创作体验，但不能丢掉自身已经形成的本地项目、资产连续性、运行审计和结构化影视生产闭环。

本方案定义图屿 Studio 的下一阶段产品设计基准：**画布优先的私有 AI 视频创作 Studio**。

## 2. 产品定位

图屿 Studio 是一个面向个人与小团队的私有 AI 视频创作画布。它以本地 Project Canvas 为第一工作台，把剧本、角色、场景、参考资产、分镜、提示词、生成任务、结果评审、交接包和 Agent 操作都组织在同一张可追溯画布中。

一句话定位：

> 图屿 Studio 借鉴 LibTV 的画布化创作体验，但把每一步创作、生成和 Agent 操作都落在本地、可恢复、可审计、连续性可控的项目状态机里。

## 3. 设计原则

### 3.1 保留并高亮图屿自己的特点

1. **本地优先的私有项目**
   - 项目、资产、运行记录、结果评审、审计事件都以本地项目目录为核心。
   - 项目必须可迁移、可备份、可恢复、可健康检查。
   - UI 中应持续显示项目保存状态、本地路径摘要、外发状态和审计摘要。

2. **影视连续性与资产约束**
   - 人物、场景、道具、风格不是普通素材，而是会影响镜头生产的规则资产。
   - 这些对象要有 source truth、digest、引用关系、continuity lock、dirty/stale 状态。
   - Shot、Prompt、Video Result 节点要能直接显示连续性影响。

3. **可审计运行与外发控制**
   - 内 provider 与外 agent 都不能绕过预览、权限、网络外发、事件日志和审计。
   - 运行必须可取消、可重试、可诊断。
   - 成本、扣费、积分只做占位设计，属于最低实现优先级；界面只需要保留策略位置和提示口径。

4. **结构化影视生产闭环**
   - 画布自由组织，但核心链路必须能追溯：Script -> Shot -> Prompt -> Run -> Asset/Take -> Review。
   - Package Export 仍保留，但降级为 handoff/fallback，不再主导第一工作台。

5. **人机共创的可见画布**
   - 人通过 UI 操作画布。
   - Agent 通过 Skill/CLI/MCP 风格接口操作同一张画布。
   - Agent 的操作必须可见：新增节点、移动节点、连线、运行中状态、结果写回、失败提示和审计来源都直接反映在画布上。

### 3.2 尽可能多地借鉴 LibTV

1. **画布体验优先**
   - 无限画布、节点菜单、连线、分组、小地图、缩放、网格吸附、快捷键、整理画布、历史轨。
   - Dark Canvas 是主创作模式；Light Canvas 也必须完整设计。
   - Light Canvas 不能是纯白高亮背景，应采用偏暖、低眩光的浅色底，例如 warm gray / off-white / paper-like canvas，并使用低对比点阵或细网格。

2. **生成链路第二优先级**
   - 借鉴“节点即生成入口”：文本、图片、视频、音频、脚本节点都能成为任务入口。
   - 图屿必须补充 ProviderMode、RunEvent、外发确认、取消/重试、结果回流。

3. **模板/案例第三优先级**
   - 借鉴工具箱模板、案例制作过程、复制项目、分镜组、多镜头模板、角色三视图模板。
   - 图屿中的模板应升级为 Canvas Blueprint，包含节点结构、输入要求、输出契约、能力要求和恢复语义。

4. **Agent/Skill 第四优先级，但一等设计**
   - Agent/Skill 必须进入顶层架构，但实现可分期。
   - 目标不是后台 Agent 产出结果，而是 Agent 像 Pencil MCP 一样直接修改画布文档。

## 4. 总体架构

图屿 Studio 采用 **Canvas-first Dual Entry** 架构。

```text
Human UI  --------------------+
                              |
Agent Skill / CLI / MCP ------+--> Studio Command Bus
                                      |
                                      v
                              Shared Canvas Core
                                      |
          +---------------------------+---------------------------+
          |                           |                           |
   Project Canvas              Domain Objects              Runtime / Audit
   nodes / edges / frames      Script / Shot / Take         Run / Event / Provider
          |                           |                           |
          +---------------------------+---------------------------+
                                      |
                                      v
                              Canvas Render / Inspector
```

### 4.1 Human Entry

用户通过 Studio UI 直接操作画布：

- 新增节点
- 拖入素材
- 插入模板
- 连线与分组
- 发起生成
- 接管 Agent 节点
- 评审结果
- 导出 handoff package

### 4.2 Agent Entry

外部 Agent 读取图屿 Skill，通过 CLI 或 MCP 风格接口操作同一个 Project Canvas。

Agent 可以执行的画布命令包括：

- 创建项目或打开项目
- 创建节点
- 移动节点
- 创建连线
- 插入 Canvas Blueprint
- 导入素材
- 发起 run
- 查询 run events
- 写回生成结果
- 标记 Review 状态
- 生成 handoff package

Agent 不能直接写项目文件，必须通过 Studio Command Bus 进入 Shared Canvas Core。

### 4.3 Shared Canvas Core

Shared Canvas Core 是画布和 Agent 的共同状态机，负责：

- 命令校验
- 画布文档更新
- 领域对象引用
- 资产导入与绑定
- 连续性规则传播
- 运行状态记录
- 审计事件
- UI 事件广播
- 撤销/重试/恢复入口

## 5. 模块设计

### 5.1 Project Canvas

Project Canvas 保存画布视口、节点、边、Frame、布局、选择摘要和渲染状态。

核心对象：

```ts
interface ProjectCanvas {
  id: string
  projectId: string
  version: number
  viewport: { x: number; y: number; zoom: number }
  theme: "dark" | "light"
  nodes: CanvasNode[]
  edges: CanvasEdge[]
  frames: CanvasFrame[]
  updatedAt: string
}
```

Canvas 是 UI 和 Agent 的共享编辑对象。所有修改都通过 command 进入，不允许 UI 或 CLI 直接改文件。

### 5.2 Canvas Node

节点分为四类：

| 类别 | 示例 | 作用 |
| --- | --- | --- |
| 内容节点 | text、image、video、audio、script | 承载创作输入与输出 |
| 领域节点 | character、scene、prop、style、shot、prompt、take | 引用结构化影视对象 |
| 任务节点 | generation、fusion、handoff、review | 表示可运行或可评审动作 |
| 组织节点 | frame、reference group、blueprint group | 管理工作流结构和模板 |

节点要支持：

- title
- kind
- status
- badges
- source
- refId
- assetRefs
- runRefs
- continuity flags
- error state
- layout

### 5.3 Domain Objects

Domain Objects 继续承载结构化生产真相：

- Script
- Character
- Scene
- Prop
- Style
- Shot
- Prompt
- Package
- Take
- Review

画布节点可以引用 Domain Object，但节点不是完整数据真相。这样可以同时支持自由画布体验和稳定生产数据。

### 5.4 Asset Library

Asset Library 管理所有输入、输出和历史资产：

- 图片
- 视频
- 音频
- 文本
- 上传文件
- 生成结果
- 外部回收结果

资产必须包含：

- digest
- source
- source node
- binding
- lineage
- continuity lock
- project-relative path
- review status

### 5.5 Runtime Gateway

Runtime Gateway 统一处理内 provider 与外 agent 发起的运行。

核心记录：

```ts
interface StudioRun {
  id: string
  projectId: string
  canvasNodeId: string
  providerMode: "internal_provider" | "external_agent"
  status: "queued" | "running" | "waiting_user" | "completed" | "failed" | "cancelled"
  attempt: number
  inputDigest: string
  outputRefs: string[]
  eventLogRef: string
  auditRef: string
}
```

运行要求：

- completed 必须有输出校验。
- failed 必须有错误语义和恢复动作。
- cancelled 必须保留已产生事件和临时产物。
- 成本/扣费/积分只保留 placeholder 字段和 UI 插槽，最低实现优先级。

### 5.6 Provider & Agent Gateway

两种模型使用方式都是一等入口：

| 模式 | 触发者 | 行为 | 设计要求 |
| --- | --- | --- | --- |
| internal_provider | Studio UI | Studio 调用 ProviderProfile 执行任务 | 可预览、可取消、可重试、可审计 |
| external_agent | Agent Skill / CLI | Agent 通过 Studio command 修改画布和运行状态 | 操作可见、来源可追溯、可接管 |

Agent Gateway 的目标不是替代 Studio UI，而是让 Agent 像协作者一样直接操作同一张画布。

### 5.7 Template / Blueprint Registry

Canvas Blueprint 用于承载模板和案例工作流。

第一批建议模板：

- 空白创作画布
- 剧本到分镜
- 角色三视图
- 场景参考组
- 道具/产品展示
- 多镜头连贯分镜
- 首帧图生视频
- 结果评审
- 手动 handoff package

Blueprint 应包含：

- 节点结构
- 边结构
- Frame 分组
- 输入槽
- 输出契约
- required capabilities
- recovery semantics
- demo data

### 5.8 Inspector / Review Layer

Inspector 是人类接管和评审的主要界面。

需要展示：

- 节点属性
- 绑定的 Domain Object
- 输入/输出
- asset lineage
- continuity lock
- provider mode
- run events
- error recovery
- review decision
- audit source

## 6. 画布视觉设计

### 6.1 Dark Canvas

Dark Canvas 是主创作模式。

要求：

- 深色点阵或细网格背景。
- 节点层级清晰，避免高饱和大面积背景。
- 运行中、成功、失败、阻断、dirty/stale 状态要可辨识。
- 连线不应喧宾夺主，默认低对比，选中或 hover 时增强。
- Agent 操作中的节点要有来源标识。

### 6.2 Light Canvas

Light Canvas 是完整模式，不是简单反色。

要求：

- 背景偏暖、低眩光，不使用纯白。
- 推荐 warm gray、off-white 或 paper-like canvas。
- 网格使用低对比，不影响长时间工作。
- 节点阴影和边框要比 Dark 更克制。
- 状态色需重新校准，避免浅色背景下过亮。

### 6.3 画布基础布局

第一屏布局：

| 区域 | 内容 |
| --- | --- |
| Top Bar | 项目名、本地状态、保存状态、Provider/Agent 状态、设置 |
| Left Rail | 添加节点、模板、素材、历史、搜索、教程 |
| Canvas | 无限画布、节点、边、Frame、状态 |
| Inspector | 节点详情、运行、连续性、评审 |
| Bottom Bar | 缩放、小地图、队列、健康、事件摘要 |

## 7. 关键用户路径

### 7.1 人类画布路径

1. 打开本地项目。
2. 进入 Project Canvas。
3. 插入“剧本到分镜” Blueprint。
4. 导入剧本、角色和参考图。
5. 画布生成 Shot / Prompt 节点。
6. 用户选择节点运行。
7. Runtime Gateway 写入 Run/Event。
8. 结果资产回流到画布。
9. 用户在 Inspector 中评审 Take。
10. 需要外部生成时导出 handoff package。

### 7.2 Agent 画布路径

1. Agent 读取图屿 Skill。
2. Agent 调用 CLI 打开项目。
3. CLI 通过 Studio Command 创建节点和 Frame。
4. UI 画布实时显示 Agent 创建的节点。
5. Agent 发起 run 或写入外部执行结果。
6. Run/Event/Audit 同步写入。
7. 用户看到 Agent 来源标识，可以接管、暂停、重试或评审。

### 7.3 混合协作路径

1. 用户在画布上框选一组节点。
2. 用户要求 Agent 基于该组生成分镜或 Prompt。
3. Agent 通过 CLI 读取选中上下文。
4. Agent 创建新节点、连线和运行记录。
5. 用户审查结果，决定保留、重做或转 handoff。

## 8. 错误处理与恢复

| 错误 | 展示位置 | 恢复动作 |
| --- | --- | --- |
| 缺少输入 | 节点 badge + Inspector | 补输入、绑定资产、插入模板 |
| provider 不支持 | 节点状态 + Bottom Bar | 换 provider、降级、转 handoff |
| 运行失败 | 节点 + Run detail | 重试、改输入、查看事件、取消 |
| Agent 命令失败 | 事件流 + Agent 操作节点 | 回滚命令、重发、要求用户确认 |
| 结果无法绑定 | Unbound Results 面板 | 手动绑定、保留待处理、废弃 |
| 权限拒绝 | Inspector + Audit | 修改授权、改路径、取消 |
| 外发需要确认 | 节点运行前确认 | 确认、转本地、取消 |
| 成本/积分未知 | placeholder 提示 | 暂不阻断，后续版本补齐策略 |

## 9. 权限与安全边界

- 本地文件默认不外发。
- Agent 不得直接读取任意本机路径，只能访问项目白名单。
- CLI 不直接写项目文件，必须调用 Studio Command。
- Provider 凭据不进入项目文件和模板。
- 删除、覆盖历史、外发、导出敏感资产都需要明确策略。
- 所有 Agent 操作必须记录来源、命令、时间和影响对象。

## 10. 设计文档改造范围

后续需要优先修改 `tuyu-studio` 源设计文档：

| 源文档 | 改造目标 |
| --- | --- |
| `docs/design/README.md` | 更新产品定位为 canvas-first 私有 AI 视频创作 Studio |
| `details/00-product-scope-and-glossary/product-boundary.md` | 增加共享画布内核、人机双入口、Package fallback 边界 |
| `details/00-product-scope-and-glossary/user-workflows.md` | 增加人类画布路径、Agent 画布路径、混合协作路径 |
| `details/02-creative-graph-domain-model/nodes-and-edges.md` | 扩展 Canvas Node 分类、Frame、Blueprint、Agent 操作来源 |
| `details/03-asset-library-and-continuity/*` | 把主体库、历史结果、连续性锁定改为画布一等能力 |
| `details/05-instruction-stack-and-skills/*` | 扩展为 Skill/CLI/Blueprint/Agent Gateway 设计 |
| `details/06-ai-runtime-and-provider-adapters/*` | 增加 internal_provider 与 external_agent provider mode |
| `details/07-frontend-workbench-experience/*` | 改为无限画布第一屏、Dark/暖浅 Light Canvas、Inspector/Bottom Bar |
| `details/09-delivery-acceptance-and-test-plan/*` | 增加人机共创画布、节点运行、失败恢复和 Agent 可见操作验收 |

## 11. Web 原型改造范围

设计文档确认后，本仓库 Web 原型应从文档展示型页面改为真实 Studio 设计原型。

最低目标：

- 首页变成 Project Canvas，而不是总览或文档卡片。
- 添加 Dark Canvas 与暖浅 Light Canvas 视觉模式。
- 左侧工具栏包含节点、模板、素材、历史、搜索。
- 画布上展示真实节点链路：Script、Character、Scene、Shot、Prompt、Run、Result、Review。
- 右侧 Inspector 展示选中节点详情、连续性、运行事件、错误恢复。
- Bottom Bar 展示缩放、小地图、队列、健康和事件摘要。
- 增加 Agent 操作可见示例：Agent 创建节点、连线、运行、写回结果。
- Package Export 作为 handoff/fallback 抽屉或节点详情，不再是主页面中心。

## 12. 分期建议

### Phase 1：画布体验

- Canvas-first 信息架构。
- 节点菜单。
- 节点/连线/Frame/Inspector。
- Dark + 暖浅 Light Canvas。
- 基础状态：ready、running、failed、dirty、stale、reviewed。

### Phase 2：生成链路

- Run / Event / Attempt 模型。
- internal_provider 与 external_agent provider mode。
- 结果回流。
- 失败恢复。
- 外发确认。
- 成本/积分 placeholder。

### Phase 3：模板与案例

- Canvas Blueprint。
- 工具箱模板。
- 案例制作过程。
- 复制为本地项目模板。

### Phase 4：Agent/Skill 一等入口

- 图屿 Skill 结构。
- CLI command 设计。
- Agent 操作可见事件。
- 人类接管与审计。

## 13. 验收标准

正式设计与原型改造后应满足：

1. 用户打开项目后第一屏进入画布。
2. 人可以在画布上创建节点、连线、插入模板、查看运行状态、评审结果。
3. Agent 可以通过 CLI/Skill 修改同一张画布，并在 UI 上可见。
4. Dark Canvas 和暖浅 Light Canvas 都不是换色占位，而是完整层级设计。
5. 任意结果可以追溯到输入节点、Run、ProviderMode、资产、Review 和 Audit。
6. 失败、取消、权限拒绝、外发确认都有明确恢复动作。
7. 成本/扣费/积分只保留占位设计，不影响第一轮实现闭环。
8. Package Export 保留为 handoff/fallback，不主导第一屏。
9. 视觉稿和 Web 原型都能指导后续 Vue/Wails 页面改造。

## 14. 非目标

- 不复刻 LibTV 品牌、会员、积分体系。
- 不在第一轮实现真实付费、扣费或积分计算。
- 不把图屿做成云端多人协作 SaaS。
- 不把专业剪辑时间线作为第一轮目标。
- 不允许 Agent 绕过 Studio Command 直接改项目文件。
