import type { WorkbenchSketch, WorkflowPage } from '../types'

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
      '项目创建页展示本地项目目录、schema、默认 provider profile、保存状态和健康检查，把未来 App 的第一步固定在可迁移项目根上。',
    sourceBasis: [
      'details/01-local-project-storage/README.md',
      'details/01-local-project-storage/directory-layout.md',
      'details/08-security-privacy-observability/path-guard-and-permissions.md',
    ],
    userActions: [
      '选择 studio root 并创建项目。',
      '设置项目名称、默认 profile、style bible 和初始 graph。',
      '打开已有项目时确认恢复检查、锁状态和 schema 支持范围。',
    ],
    systemWrites: [
      '创建 project.json、graph.json、principles.md、style_bible.md 和目录骨架。',
      '记录 project.create/open、lock takeover、migration 和 health audit。',
      '保存项目相对路径，不把机器私有路径写入 manifest 或 graph。',
    ],
    blockers: [
      '目标目录不可写、project.json 缺失或 schema 不受支持。',
      'active lock 未确认接管。',
      '路径穿越、符号链接逃逸或外部目录写入未确认。',
    ],
    recoveryActions: [
      '只读打开或另存项目。',
      '从 backups 恢复 graph.json，或进入诊断模式。',
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
        { label: 'Schema', meta: 'supported write', tone: 'app' },
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
      '创作图谱页展示未来 App 的主要工作面：以节点、边、状态徽标和 Inspector 把剧本、角色、场景、Shot、Prompt、Package 与 Result 串起来。',
    sourceBasis: [
      'details/02-creative-graph-domain-model/README.md',
      'details/02-creative-graph-domain-model/nodes-and-edges.md',
      'details/07-frontend-workbench-experience/canvas-interactions.md',
    ],
    userActions: [
      '创建节点、连接合法关系、移动布局并选择对象查看 Inspector。',
      '从 Shot 展开上下文预览，查看资产、连续性、Prompt 和 Package。',
      '删除或修改高影响对象前查看 ImpactReport。',
    ],
    systemWrites: [
      '保存 GraphDocument 的 nodes、edges、viewport、layout 和 version。',
      '通过 refId 关联领域对象，Graph 不保存完整领域数据。',
      '非法关系、断链、dirty 和 stale 状态进入健康检查和 audit。',
    ],
    blockers: [
      'unsupported node kind、invalid relation、cycle detected。',
      'stale graph version 或 missing required ref。',
      '删除领域对象前 ImpactReport 生成失败。',
    ],
    recoveryActions: [
      '保留 broken reference placeholder 并重新选择领域对象。',
      '只合并纯布局变化；关系和 ref 变化要求用户确认。',
      '取消删除时不留下半删除边或状态变化。',
    ],
    moduleRefs: ['creative-graph', 'asset-continuity', 'script-package', 'instruction-stack', 'workbench-ux'],
    sketch: sketch(
      'Creative Graph Workbench',
      'Main canvas',
      'Graph',
      [
        { label: 'Script', meta: 'source data', tone: 'source' },
        { label: 'Scene 03', meta: 'confirmed', tone: 'app' },
        { label: 'Shot 012', meta: 'context_ready', tone: 'flow' },
        { label: 'Package v03', meta: 'stale after asset change', tone: 'risk' },
      ],
      [
        { label: 'Selected node', meta: 'Shot 012', tone: 'app' },
        { label: 'Valid relations', meta: 'belongs_to / uses / produces', tone: 'source' },
        { label: 'Impact report', meta: '2 packages affected', tone: 'risk' },
      ],
      [
        { label: 'layout autosave', meta: 'version 28', tone: 'app' },
        { label: 'context resolver', meta: 'ready', tone: 'flow' },
      ],
    ),
  },
  {
    id: 'wf-shot-prompt',
    slug: 'shot-prompt',
    title: 'Shot & Prompt',
    navTitle: 'Shot & Prompt',
    summary:
      '分镜与提示词页展示 ShotCard 字段、上下文解析、指令栈预览、输出契约和 PromptRun 队列，强调运行前的可解释确认。',
    sourceBasis: [
      'details/04-script-shot-package-workflow/shot-card-lifecycle.md',
      'details/05-instruction-stack-and-skills/instruction-compile-order.md',
      'details/06-ai-runtime-and-provider-adapters/runtime-gateway.md',
    ],
    userActions: [
      '补齐 ShotCard 的场景、角色、镜头、动作、时长和参考资产。',
      '预览 ContextBundle、能力包、输出契约和外部能力范围。',
      '确认后运行结构化文本或图像任务，查看输出预览。',
    ],
    systemWrites: [
      '保存 Shot 字段、ContextBundle digest、compile request 和 PromptRun。',
      '输出校验通过后才写正式 Prompt、Asset 或 Shot 派生字段。',
      '失败写错误记录，不污染正式对象。',
    ],
    blockers: [
      '必填字段缺失、上下文冲突、context too large。',
      'schema missing、run_output_invalid、provider error。',
      '外部请求缺少用户确认。',
    ],
    recoveryActions: [
      '补字段、裁剪上下文、选择冲突优先级或替换能力包。',
      '从同一上下文创建新 PromptRun 重试。',
      '输出无效时保留原始摘要并回到预览状态。',
    ],
    moduleRefs: ['creative-graph', 'script-package', 'instruction-stack', 'runtime-adapters', 'security-observability'],
    sketch: sketch(
      'Shot Prompt Console',
      'Pre-run preview',
      'Runs',
      [
        { label: 'Shot 012 card', meta: 'duration 4s / camera dolly', tone: 'app' },
        { label: 'Context bundle', meta: 'scene + 2 characters + 4 refs', tone: 'source' },
        { label: 'Output contract', meta: 'shot_prompt.v2', tone: 'flow' },
        { label: 'Conflict check', meta: 'needs rule choice', tone: 'risk' },
      ],
      [
        { label: 'Compile order', meta: 'principles > context > skill > schema', tone: 'source' },
        { label: 'External data range', meta: 'preview before submit', tone: 'risk' },
        { label: 'Run state', meta: 'waiting_user', tone: 'flow' },
      ],
      [
        { label: 'PromptRun', meta: 'not created until confirm', tone: 'flow' },
        { label: 'schema validation', meta: 'ready', tone: 'app' },
      ],
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
