import type { ProductionFrame, WorkbenchSketch, WorkflowPage } from '../types'

const sketch = (
  title: string,
  eyebrow: string,
  activeTab: string,
  boardItems: WorkbenchSketch['boardItems'],
  inspectorItems: WorkbenchSketch['inspectorItems'],
  queueItems: WorkbenchSketch['queueItems'],
): WorkbenchSketch => ({
  title,
  eyebrow,
  activeTab,
  tabs: ['Project', 'Graph', 'Assets', 'Runs', 'Health'],
  boardTitle: 'Semi-real App Sketch',
  boardItems,
  inspectorTitle: 'Inspector',
  inspectorItems,
  queueTitle: 'Queue / Health',
  queueItems,
  footerItems: [
    { label: 'source: docs/design', tone: 'source' },
    { label: 'prototype: review-only', tone: 'flow' },
    { label: 'runtime: no backend', tone: 'app' },
  ],
})

const productionFrameSketch = (
  title: string,
  eyebrow: string,
  frame: ProductionFrame,
  footerItems: WorkbenchSketch['footerItems'] = [
    { label: 'source: docs/design', tone: 'source' },
    { label: 'prototype: review-only', tone: 'flow' },
    { label: 'runtime: no backend', tone: 'app' },
  ],
): WorkbenchSketch => ({
  title,
  eyebrow,
  activeTab: 'Graph',
  tabs: ['Project', 'Graph', 'Assets', 'Runs', 'Health'],
  boardTitle: '双层生产组',
  boardItems: [],
  inspectorTitle: 'Inspector',
  inspectorItems: [],
  queueTitle: 'Queue / Health',
  queueItems: [],
  footerItems,
  variant: 'production-frame',
  productionFrame: frame,
})

const balconyFrame: ProductionFrame = {
  title: '外层生产组：阳台镜头融合',
  intent: '引用参考视频和角色图，生成文本、图片或视频输出',
  referenceGroup: {
    title: '内层参考组：2 个输入',
    role: '视频动作节奏 + 角色身份服装',
    priority: 'locked references first',
    inputNodes: [
      { label: '视频参考', meta: '动作 / 节奏 / 镜头运动', tone: 'source' },
      { label: '角色图片', meta: '身份 / 服装 / 脸部锁定', tone: 'app' },
    ],
    notes: '用户备注只作为 data 包装，不覆盖锁定规则。',
  },
  outputNode: { label: '输出节点', meta: '文本 / 图片 / 视频按供应商能力启用', tone: 'flow' },
  requiredCapabilities: ['textUnderstanding', 'imageUnderstanding', 'videoUnderstanding', 'imageGeneration', 'videoGeneration'],
  historySummary: [
    { label: '当前', meta: '第 3 版', tone: 'app' },
    { label: '收藏', meta: '第 2 版', tone: 'flow' },
    { label: '最近成功', meta: '第 1 版', tone: 'source' },
  ],
  taskStates: [
    { label: '提示词优化', meta: '需要文本理解，可运行', tone: 'app' },
    { label: '图片/视频理解', meta: '缺能力时降级为人工说明或手动分镜', tone: 'risk' },
    { label: '生成视频', meta: '接入视频生成供应商后启用', tone: 'flow' },
  ],
  storyboardRows: [
    { label: '镜号 1', meta: '中景 / 推 / 建立空间和人物位置', tone: 'source' },
    { label: '镜号 2', meta: '近景 / 跟随 / 强化角色动作', tone: 'app' },
    { label: '回写规则', meta: '候选逐行确认后才创建镜头节点', tone: 'risk' },
  ],
}

export const workflowPages = [
  {
    id: 'wf-overview',
    slug: 'overview',
    title: 'Overview',
    navTitle: 'Overview',
    summary:
      '从本地项目创建开始，图屿把剧本、资产、Creative Graph、指令栈、运行记录、交接包和结果评审组织成可追溯的生产闭环。',
    sourceBasis: [
      '主数据流来自 architecture/redacted-production-architecture.md。',
      '状态链路来自 details/README.md 的跨文档不变量和各模块状态机。',
      '本原型只解释设计，不实现真实产品功能。',
    ],
    userActions: [
      '创建或打开本地项目。',
      '导入剧本、角色、场景、道具和参考图。',
      '在 Creative Graph 中建立 Shot、Prompt、Package 和 Result 关系。',
      '预览指令栈，导出生成交接包，回收外部结果并评审。',
    ],
    systemWrites: [
      'project.json、graph.json、assets index、prompts/runs、packages、audit。',
      'Shot、PromptRun、GenerationPackage、VideoResult 和 Review Status。',
      '健康检查、包校验、错误记录和恢复记录。',
    ],
    blockers: [
      '跨项目引用、绝对路径泄漏、路径逃逸或缺少用户确认。',
      '上下文缺失、连续性冲突、非法关系、dirty Shot 或 stale Package。',
      '输出契约校验失败、包引用缺失、结果绑定不明确。',
    ],
    recoveryActions: [
      '运行健康检查并定位受影响对象。',
      '重新定位资产、补齐 Shot 字段、重编译上下文或重新导出包。',
      '以新 PromptRun、Package 版本或 Take 保留历史证据。',
    ],
    moduleRefs: [
      'product-scope',
      'local-storage',
      'creative-graph',
      'asset-continuity',
      'script-package',
      'instruction-stack',
      'runtime-adapters',
      'workbench-ux',
      'security-observability',
      'delivery-acceptance',
    ],
    sketch: sketch(
      'Production Control Overview',
      'End-to-end loop',
      'Project',
      [
        { label: 'Project', meta: 'schema ok', tone: 'source' },
        { label: 'Creative Graph', meta: '18 nodes / 22 edges', tone: 'app' },
        { label: 'Package Export', meta: '2 ready / 1 stale', tone: 'flow' },
        { label: 'Privacy Gate', meta: 'external task needs confirm', tone: 'risk' },
      ],
      [
        { label: 'Current Shot', meta: 'shot_012 context_ready', tone: 'app' },
        { label: 'Linked Assets', meta: '4 refs / 2 locked', tone: 'source' },
        { label: 'Next Gate', meta: 'prompt preview', tone: 'flow' },
      ],
      [
        { label: 'autosave', meta: 'clean', tone: 'app' },
        { label: 'package check', meta: '1 stale', tone: 'risk' },
        { label: 'result review', meta: 'waiting take', tone: 'flow' },
      ],
    ),
  },
  {
    id: 'wf-project-setup',
    slug: 'project-setup',
    title: 'Project Setup',
    navTitle: 'Project Setup',
    summary:
      '项目创建页展示本地项目目录、单一项目清单、默认 provider profile、保存状态和健康检查，把未来 App 的第一步固定在可迁移项目根上。',
    sourceBasis: [
      'details/01-local-project-storage/README.md',
      'details/01-local-project-storage/directory-layout.md',
      'details/08-security-privacy-observability/path-guard-and-permissions.md',
    ],
    userActions: [
      '选择 studio root 并创建项目。',
      '设置项目名称、默认 profile、风格设定和初始图谱。',
      '打开已有项目时确认恢复检查、锁状态和项目清单版本支持范围。',
    ],
    systemWrites: [
      '创建一个项目清单，集中保存项目元信息、图谱分区、原则和风格设定索引。',
      '记录 project.create/open、lock takeover、migration 和 health audit。',
      '保存项目相对路径，不把机器私有路径写入 manifest 或 graph。',
    ],
    blockers: [
      '目标目录不可写、项目清单缺失或项目清单版本不受支持。',
      'active lock 未确认接管。',
      '路径穿越、符号链接逃逸或外部目录写入未确认。',
    ],
    recoveryActions: [
      '只读打开或另存项目。',
      '从备份恢复项目清单或图谱分区，或进入诊断模式。',
      '迁移前备份，迁移失败回滚并保留报告。',
    ],
    moduleRefs: ['product-scope', 'local-storage', 'security-observability', 'delivery-acceptance'],
    sketch: sketch(
      'New Project Setup',
      'Local-first root',
      'Project',
      [
        { label: 'Project name', meta: '无名短片', tone: 'app' },
        { label: 'Root path', meta: '{studio_root}/projects/film_a', tone: 'source' },
        { label: '项目清单', meta: '支持写入', tone: 'app' },
        { label: 'Lock', meta: 'no active owner', tone: 'flow' },
      ],
      [
        { label: 'Directory plan', meta: 'assets / packages / audit', tone: 'source' },
        { label: 'Provider profile', meta: 'default-handoff', tone: 'flow' },
        { label: 'Privacy default', meta: 'local only', tone: 'risk' },
      ],
      [
        { label: 'health bootstrap', meta: 'ready', tone: 'app' },
        { label: 'migration', meta: 'not needed', tone: 'source' },
      ],
    ),
  },
  {
    id: 'wf-asset-library',
    slug: 'asset-library',
    title: 'Asset Library',
    navTitle: 'Asset Library',
    summary:
      '资产库页展示导入、索引、缩略图、绑定、来源追溯与连续性锁定，让角色、场景、道具和风格引用能安全进入 Shot 上下文。',
    sourceBasis: [
      'details/03-asset-library-and-continuity/README.md',
      'details/03-asset-library-and-continuity/asset-ingestion-and-indexing.md',
      'details/03-asset-library-and-continuity/continuity-rules.md',
    ],
    userActions: [
      '导入角色参考图、场景图、道具图或结果占位文件。',
      '把资产绑定到 Character、Scene、Prop、Style、Shot、Prompt、Package 或 Result。',
      '锁定连续性规则并处理缺失、重复或冲突资产。',
    ],
    systemWrites: [
      '写入 Asset、AssetBinding、AssetSource、缩略图、digest 和 lineage。',
      '连续性变更传播到关联 Shot dirty 与 Package stale。',
      '删除、恢复、解绑和重新定位写入 audit。',
    ],
    blockers: [
      '不支持的媒体类型、digest 不一致、路径越界。',
      'locked binding 未确认解绑。',
      '缺失 locked asset 或连续性冲突阻断正式运行与导出。',
    ],
    recoveryActions: [
      '重新导入或重新定位 managed reference。',
      '归档而非物理删除被引用资产。',
      '重新生成 context digest 并刷新受影响 Shot/Package。',
    ],
    moduleRefs: ['local-storage', 'asset-continuity', 'creative-graph', 'security-observability'],
    sketch: sketch(
      'Asset Library Board',
      'Continuity shelf',
      'Assets',
      [
        { label: 'Character / face_ref_01', meta: 'locked', tone: 'app' },
        { label: 'Scene / rain_alley', meta: 'used by 4 shots', tone: 'source' },
        { label: 'Style / dusk palette', meta: 'continuity rule', tone: 'flow' },
        { label: 'Prop / old_phone', meta: 'missing file', tone: 'risk' },
      ],
      [
        { label: 'Bindings', meta: 'Shot 012, Prompt 03', tone: 'source' },
        { label: 'Lineage', meta: 'imported -> package v03', tone: 'app' },
        { label: 'Impact', meta: '2 stale packages', tone: 'risk' },
      ],
      [
        { label: 'thumbnail job', meta: 'complete', tone: 'app' },
        { label: 'relink action', meta: 'required', tone: 'risk' },
      ],
    ),
  },
  {
    id: 'wf-creative-graph',
    slug: 'creative-graph',
    title: 'Creative Graph',
    navTitle: 'Creative Graph',
    summary:
      '创作图谱页展示未来 App 的主要工作面：以节点、边、双层生产组、状态徽标和 Inspector 把剧本、参考资产、Shot、Prompt、输出与历史串起来。',
    sourceBasis: [
      'details/02-creative-graph-domain-model/README.md',
      'details/02-creative-graph-domain-model/nodes-and-edges.md',
      'details/07-frontend-workbench-experience/canvas-interactions.md',
    ],
    userActions: [
      '创建节点、连接合法关系、移动布局并选择对象查看 Inspector。',
      '把视频、图片、文本等输入放入内层参考组，再用外层生产组承载任务意图和输出目标。',
      '从生产组展开上下文预览，查看参考组、供应商能力、输出节点和运行历史。',
      '删除或修改高影响对象前查看 ImpactReport。',
    ],
    systemWrites: [
      '保存图谱文档的节点、边、视口、布局、生产组、参考组和版本。',
      '通过 refId 关联领域对象，Graph 不保存完整领域数据。',
      '生产组运行历史引用提示词运行、适配器尝试和输出资产，不建成图谱节点。',
      '非法关系、断链、dirty、stale 和 capability missing 状态进入健康检查和 audit。',
    ],
    blockers: [
      'unsupported node kind、invalid relation、cycle detected。',
      '生产组缺少输出节点、参考组为空或所需 provider capability 缺失。',
      'stale graph version 或 missing required ref。',
      '删除领域对象前 ImpactReport 生成失败。',
    ],
    recoveryActions: [
      '保留 broken reference placeholder 并重新选择领域对象。',
      '缺图片/视频理解能力时保留生产组，任务降级为人工说明或手动分镜。',
      '只合并纯布局变化；关系和 ref 变化要求用户确认。',
      '取消删除时不留下半删除边或状态变化。',
    ],
    moduleRefs: ['creative-graph', 'asset-continuity', 'script-package', 'instruction-stack', 'workbench-ux'],
    sketch: productionFrameSketch(
      'Creative Graph Workbench',
      'Main canvas',
      balconyFrame,
    ),
  },
  {
    id: 'wf-shot-prompt',
    slug: 'shot-prompt',
    title: 'Shot & Prompt',
    navTitle: 'Shot & Prompt',
    summary:
      '分镜与提示词页展示镜头卡字段、双层生产组上下文、供应商能力、输出契约、生产组运行和提示词运行队列，强调运行前的可解释确认。',
    sourceBasis: [
      'details/04-script-shot-package-workflow/shot-card-lifecycle.md',
      'details/05-instruction-stack-and-skills/instruction-compile-order.md',
      'details/06-ai-runtime-and-provider-adapters/runtime-gateway.md',
    ],
    userActions: [
      '补齐 ShotCard 的场景、角色、镜头、动作、时长和参考资产。',
      '预览生产组的参考输入组、能力包、输出契约和供应商能力范围。',
      '确认后运行结构化文本、图像或接入后的视频任务，查看输出预览和历史轨。',
    ],
    systemWrites: [
      '保存镜头字段、生产组上下文摘要、编译请求、生产组运行和提示词运行。',
      '输出校验通过后才写正式 Prompt、Asset 或 Shot 派生字段。',
      '失败写错误记录，不污染正式对象。',
    ],
    blockers: [
      '必填字段缺失、上下文冲突、context too large。',
      'schema missing、run_output_invalid、provider error。',
      '图片/视频理解能力缺失时，媒体分析和自动拆镜不可运行。',
      '外部请求缺少用户确认。',
    ],
    recoveryActions: [
      '补字段、裁剪上下文、选择冲突优先级或替换能力包。',
      '缺媒体理解时改为人工说明或手动分镜表，不删除参考组。',
      '从同一上下文创建新 PromptRun 重试。',
      '输出无效时保留原始摘要并回到预览状态。',
    ],
    moduleRefs: ['creative-graph', 'script-package', 'instruction-stack', 'runtime-adapters', 'security-observability'],
    sketch: productionFrameSketch(
      'Shot Prompt Console',
      'Pre-run preview',
      {
        ...balconyFrame,
        title: '外层生产组：镜头 012 提示词',
        intent: '在同一生产组中优化提示词、生成图片请求，并在有能力时生成视频',
        outputNode: { label: '提示词 / 输出节点', meta: '结构化文本、图片提示词、视频任务', tone: 'flow' },
      },
    ),
  },
  {
    id: 'wf-package-export',
    slug: 'package-export',
    title: 'Package Export',
    navTitle: 'Package Export',
    summary:
      '交接包导出页把 Shot、Prompt、参考图、连续性说明和 manifest 汇总为可独立检查的包；包状态和 Shot 状态由校验结果推进。',
    sourceBasis: [
      'details/04-script-shot-package-workflow/package-export.md',
      'details/06-ai-runtime-and-provider-adapters/provider-handoff-adapter.md',
      'details/08-security-privacy-observability/path-guard-and-permissions.md',
    ],
    userActions: [
      '选择一个或多个 Shot 和 provider profile。',
      '检查 manifest、引用文件、prompt、连续性说明和目标目录。',
      '导出包后手动交接，并显式标记 handed_off。',
    ],
    systemWrites: [
      '写 packages/{package_id}/manifest.json、prompts、assets、checksums 和 audit。',
      'GenerationPackage.status 从 draft 推进到 ready 或 invalid。',
      'Shot.status 只有在 manifest 校验通过后进入 package_ready。',
    ],
    blockers: [
      '引用资产缺失、绝对路径泄漏、包内逃逸条目。',
      'dirty Shot、stale Package、handoff profile invalid。',
      '外部目录写入缺少用户确认。',
    ],
    recoveryActions: [
      '重新定位资产、重新导出新版本或标记旧包 invalid。',
      '回到项目内 packages 目录导出。',
      '完成外部交接后由用户显式标记 handed_off。',
    ],
    moduleRefs: ['script-package', 'asset-continuity', 'runtime-adapters', 'security-observability', 'delivery-acceptance'],
    sketch: sketch(
      'Package Export Review',
      'Handoff state',
      'Runs',
      [
        { label: 'Package v03', meta: 'draft -> ready', tone: 'flow' },
        { label: 'manifest.json', meta: 'relative paths', tone: 'source' },
        { label: 'Reference files', meta: '8 / 8 present', tone: 'app' },
        { label: 'External destination', meta: 'confirmation required', tone: 'risk' },
      ],
      [
        { label: 'Shot gates', meta: 'package_ready after manifest ok', tone: 'app' },
        { label: 'Profile', meta: 'manual video handoff', tone: 'flow' },
        { label: 'Portability', meta: 'copy-check enabled', tone: 'source' },
      ],
      [
        { label: 'manifest validation', meta: 'running', tone: 'flow' },
        { label: 'audit event', meta: 'package.export.requested', tone: 'source' },
      ],
    ),
  },
  {
    id: 'wf-result-review',
    slug: 'result-review',
    title: 'Result Review',
    navTitle: 'Result Review',
    summary:
      '结果回收与评审页让外部生成结果回到本地项目，绑定 Shot 或 Package，形成 take、review 状态和修订路径。',
    sourceBasis: [
      'details/04-script-shot-package-workflow/result-ingestion-and-review.md',
      'details/02-creative-graph-domain-model/graph-state-machine.md',
      'details/09-delivery-acceptance-and-test-plan/acceptance-matrix.md',
    ],
    userActions: [
      '导入结果文件并选择对应 Shot、Package 或待处理队列。',
      '对 take 标记 pending_review、approved、rejected 或 needs_revision。',
      '从 needs_revision 回到 Shot 上下文修订路径。',
    ],
    systemWrites: [
      '写 VideoResult、take、reviewStatus、filePath、packageId、shotId 和 audit。',
      'Package 推进到 result_received，Shot 推进到 generated 或回到修订路径。',
      '错误绑定和评审变更保留历史记录。',
    ],
    blockers: [
      '结果绑定不明确、文件缺失或 digest 不匹配。',
      '导入路径不安全或包含私密路径。',
      'review 状态跳转缺少用户确认或 audit 不可写。',
    ],
    recoveryActions: [
      '把结果保留在待处理区，稍后重新绑定。',
      '解绑、废弃、恢复 pending_review 或重新导入。',
      'needs_revision 保留评审原因并触发 Shot 修订。',
    ],
    moduleRefs: ['script-package', 'creative-graph', 'asset-continuity', 'security-observability', 'delivery-acceptance'],
    sketch: sketch(
      'Result Review Desk',
      'Take review',
      'Graph',
      [
        { label: 'VideoResult take 02', meta: 'pending_review', tone: 'flow' },
        { label: 'Bound Shot 012', meta: 'generated', tone: 'app' },
        { label: 'Package v03', meta: 'result_received', tone: 'source' },
        { label: 'Revision note', meta: 'needs continuity fix', tone: 'risk' },
      ],
      [
        { label: 'Review action', meta: 'approve / reject / needs_revision', tone: 'flow' },
        { label: 'Lineage', meta: 'package -> result -> take', tone: 'source' },
        { label: 'Audit', meta: 'review.status.changed', tone: 'app' },
      ],
      [
        { label: 'result import', meta: 'complete', tone: 'app' },
        { label: 'revision task', meta: 'created', tone: 'risk' },
      ],
    ),
  },
] satisfies WorkflowPage[]

export const workflowPageMap = new Map(workflowPages.map((page) => [page.slug, page]))
