import type { DiagramItem, DiagramKind, DiagramLane, DiagramSpec } from '../types'

const source = (path: string) => `/Users/suqing/Coding/golang/00_self/tuyu-studio/docs/design/${path}`

const item = (label: string, meta: string, tone: DiagramItem['tone'] = 'neutral'): DiagramItem => ({
  label,
  meta,
  tone,
})

const lane = (label: string, items: DiagramItem[], tone: DiagramLane['tone'] = 'neutral'): DiagramLane => ({
  label,
  items,
  tone,
})

const diagram = (
  id: string,
  kind: DiagramKind,
  title: string,
  question: string,
  sourcePaths: string[],
  items: DiagramItem[],
  acceptance: string[],
  lanes?: DiagramLane[],
): DiagramSpec => ({
  id,
  kind,
  title,
  question,
  sourcePaths: sourcePaths.map(source),
  items,
  acceptance,
  lanes,
})

export const workflowDiagrams = new Map<string, DiagramSpec>([
  [
    'overview',
    diagram(
      'workflow-overview',
      'coverage',
      '生产闭环与设计覆盖图',
      '这张图回答：7 个生产页面如何覆盖 10 个设计模块和 39 个子文档？',
      ['README.md', 'details/README.md', 'details/00-product-scope-and-glossary/user-workflows.md'],
      [
        item('7 个流程页', 'Overview -> Result Review', 'flow'),
        item('10 个模块页', '00 Product Scope -> 09 Delivery', 'source'),
        item('39 个子文档', '以模块页卡片和锚点覆盖', 'app'),
        item('错误与恢复', '每条路径都有 failure path', 'risk'),
      ],
      ['能从总览跳到任意生产页和模块页。', '每个模块至少关联一个生产流程。', '子文档不拆独立页但必须可追溯。'],
    ),
  ],
  [
    'project-setup',
    diagram(
      'workflow-project-setup',
      'flow',
      '本地项目创建流程',
      '这张图回答：用户创建项目后，哪些文件、锁和健康状态会落地？',
      ['details/01-local-project-storage/README.md', 'details/01-local-project-storage/directory-layout.md', 'details/01-local-project-storage/save-lock-recovery.md'],
      [
        item('选择 Studio Root', '确认本地项目根', 'flow'),
        item('写入项目骨架', 'project.json / graph.json', 'source'),
        item('建立保存锁', '防止并发写入', 'app'),
        item('健康检查', 'schema、路径、权限', 'risk'),
      ],
      ['目录不可写时拒绝创建。', 'schema 不支持时只读打开或迁移。', '崩溃恢复不覆盖上一版有效文件。'],
    ),
  ],
  [
    'asset-library',
    diagram(
      'workflow-asset-library',
      'lineage',
      '资产导入与连续性血缘',
      '这张图回答：参考资产如何从导入进入 Shot 上下文并影响 Package？',
      ['details/03-asset-library-and-continuity/asset-ingestion-and-indexing.md', 'details/03-asset-library-and-continuity/asset-binding-and-lineage.md', 'details/03-asset-library-and-continuity/continuity-rules.md'],
      [
        item('Asset', 'digest + source + relative path', 'source'),
        item('Binding', 'Character / Scene / Prop / Shot', 'app'),
        item('Context Digest', '参与 Prompt 和 Package 校验', 'flow'),
        item('Impact', 'asset change -> dirty / stale', 'risk'),
      ],
      ['缺失 locked asset 阻断正式导出。', '连续性变更要标记关联 Shot dirty。', '解绑不删除源文件。'],
    ),
  ],
  [
    'creative-graph',
    diagram(
      'workflow-creative-graph',
      'graph',
      'Creative Graph 节点关系',
      '这张图回答：图谱节点如何通过 refId、边和状态徽标承接生产关系？',
      ['details/02-creative-graph-domain-model/nodes-and-edges.md', 'details/02-creative-graph-domain-model/context-resolution.md', 'details/07-frontend-workbench-experience/canvas-interactions.md'],
      [
        item('Script / Scene', 'source and grouping', 'source'),
        item('Character / Asset', 'context inputs', 'app'),
        item('Shot / Prompt', 'compiled production unit', 'flow'),
        item('Package / Result', 'handoff and review evidence', 'risk'),
      ],
      ['非法关系不写入图谱。', 'GraphNode.refId 指向领域对象。', 'PromptRun 不作为图谱端点。'],
    ),
  ],
  [
    'shot-prompt',
    diagram(
      'workflow-shot-prompt',
      'state',
      'Shot 与 PromptRun 状态推进',
      '这张图回答：Shot 如何从 draft 进入 prompt_ready，运行失败如何恢复？',
      ['details/04-script-shot-package-workflow/shot-card-lifecycle.md', 'details/02-creative-graph-domain-model/graph-state-machine.md', 'details/06-ai-runtime-and-provider-adapters/runtime-errors-and-retry.md'],
      [
        item('draft', '字段补齐前', 'neutral'),
        item('context_ready', '上下文检查通过', 'app'),
        item('prompt_ready', 'Prompt 与 digest 一致', 'flow'),
        item('failed / waiting_user', '运行失败或需补充', 'risk'),
      ],
      ['必填字段缺失不能进入 context_ready。', '输出契约失败不写正式对象。', '重试创建新 PromptRun。'],
    ),
  ],
  [
    'package-export',
    diagram(
      'workflow-package-export',
      'swimlane',
      '交接包导出泳道',
      '这张图回答：用户、工作台、项目文件和审计如何协作生成 Package？',
      ['details/04-script-shot-package-workflow/package-export.md', 'details/06-ai-runtime-and-provider-adapters/provider-handoff-adapter.md', 'details/08-security-privacy-observability/path-guard-and-permissions.md'],
      [
        item('draft', '收集 Shot、Prompt、Assets', 'flow'),
        item('ready', 'manifest 校验通过', 'app'),
        item('handed_off', '用户显式标记', 'source'),
        item('invalid / stale', '引用损坏或上游变化', 'risk'),
      ],
      ['Package 不含绝对路径。', 'blocking 检查失败拒绝导出。', '重新导出创建新版本。'],
      [
        lane('User', [item('选择 Shot', '批量导出', 'flow'), item('确认 handoff', '手动外部生成', 'source')], 'flow'),
        lane('Workbench', [item('运行校验', 'manifest + digest', 'app'), item('推进状态', 'draft -> ready', 'app')], 'app'),
        lane('Project Files', [item('写 Package', 'manifest / prompts / assets', 'source'), item('写 Audit', 'package.export.*', 'risk')], 'source'),
      ],
    ),
  ],
  [
    'result-review',
    diagram(
      'workflow-result-review',
      'lineage',
      '结果回收追溯图',
      '这张图回答：外部结果如何绑定回 Shot、Package、PromptRun 并进入评审？',
      ['details/04-script-shot-package-workflow/result-ingestion-and-review.md', 'details/02-creative-graph-domain-model/graph-state-machine.md', 'details/09-delivery-acceptance-and-test-plan/acceptance-matrix.md'],
      [
        item('Package v03', 'handoff evidence', 'source'),
        item('VideoResult', 'digest + metadata', 'app'),
        item('Take', 'pending_review', 'flow'),
        item('needs_revision', '回到 Shot 修订路径', 'risk'),
      ],
      ['无法匹配结果进入未绑定区。', '评审结论不覆盖历史 Take。', 'needs_revision 必须记录原因。'],
    ),
  ],
])

export const moduleDiagrams = new Map<string, DiagramSpec>([
  [
    'product-scope',
    diagram(
      'module-product-scope',
      'flow',
      '产品边界判断流',
      '这张图回答：一个能力是否应该进入图屿核心产品范围？',
      ['details/00-product-scope-and-glossary/product-boundary.md', 'details/00-product-scope-and-glossary/user-workflows.md'],
      [
        item('是否服务镜头级闭环', '否则不进入核心', 'flow'),
        item('是否能本地追溯', 'Project / Graph / Audit', 'source'),
        item('是否需外部能力', 'adapter/profile 表达', 'app'),
        item('是否隐式外发', '必须阻断确认', 'risk'),
      ],
      ['外部生成是显式交接步骤。', '所有正式产物可追溯。', '非核心能力不污染主模型。'],
    ),
  ],
  [
    'local-storage',
    diagram(
      'module-local-storage',
      'flow',
      '保存、锁和恢复流程',
      '这张图回答：本地项目如何避免半写、并发写和不可恢复损坏？',
      ['details/01-local-project-storage/save-lock-recovery.md', 'details/01-local-project-storage/health-check.md'],
      [
        item('validate', '写前校验', 'source'),
        item('tmp write', '临时文件', 'flow'),
        item('atomic rename', '替换正式文件', 'app'),
        item('recover / rollback', '失败保留旧版本', 'risk'),
      ],
      ['写入失败不清空用户输入。', '健康检查能定位文件或对象。', '迁移前必须有可校验备份。'],
    ),
  ],
  [
    'creative-graph',
    diagram(
      'module-creative-graph',
      'graph',
      '图谱对象关系与状态门禁',
      '这张图回答：节点、边、状态、上下文和运行记录如何分层？',
      ['details/02-creative-graph-domain-model/nodes-and-edges.md', 'details/02-creative-graph-domain-model/graph-state-machine.md', 'details/02-creative-graph-domain-model/context-resolution.md'],
      [
        item('GraphNode', 'refId only', 'source'),
        item('Domain Object', 'Shot / Prompt / Package', 'app'),
        item('Run Record', 'PromptRun audit trail', 'flow'),
        item('Health Gate', 'dirty / stale / invalid', 'risk'),
      ],
      ['Graph 不保存完整领域真相。', '状态推进由事件触发。', 'dirty/stale 阻断继续导出或评审。'],
    ),
  ],
  [
    'asset-continuity',
    diagram(
      'module-asset-continuity',
      'lineage',
      '资产绑定、血缘和影响传播',
      '这张图回答：资产变化如何传播到 Shot、Prompt 和 Package？',
      ['details/03-asset-library-and-continuity/asset-binding-and-lineage.md', 'details/03-asset-library-and-continuity/continuity-rules.md', 'details/03-asset-library-and-continuity/deletion-and-recovery.md'],
      [
        item('Imported Asset', 'digest + source', 'source'),
        item('Locked Binding', 'continuity rule', 'app'),
        item('Shot Context', 'context_dirty', 'flow'),
        item('Package', 'stale until re-export', 'risk'),
      ],
      ['locked binding 解绑需确认。', '缺失资产不静默删除引用。', '恢复后重跑健康检查。'],
    ),
  ],
  [
    'script-package',
    diagram(
      'module-script-package',
      'state',
      'Shot / Package / Result 状态链',
      '这张图回答：从 Shot 创建到结果评审，哪些状态是合法推进？',
      ['details/04-script-shot-package-workflow/shot-card-lifecycle.md', 'details/04-script-shot-package-workflow/package-export.md', 'details/04-script-shot-package-workflow/result-ingestion-and-review.md'],
      [
        item('context_ready', '上下文完整', 'app'),
        item('package_ready', 'manifest ok', 'flow'),
        item('result_received', '结果已绑定', 'source'),
        item('needs_revision', '保留原因回到修订', 'risk'),
      ],
      ['package_ready 只能由成功导出进入。', '旧 Package 不被覆盖。', 'review 退回必须记录原因。'],
    ),
  ],
  [
    'instruction-stack',
    diagram(
      'module-instruction-stack',
      'flow',
      '指令编译顺序图',
      '这张图回答：项目原则、上下文、能力包和输出契约如何组合成可运行输入？',
      ['details/05-instruction-stack-and-skills/instruction-compile-order.md', 'details/05-instruction-stack-and-skills/output-contracts.md', 'details/05-instruction-stack-and-skills/conflict-handling.md'],
      [
        item('Project Rules', 'highest priority', 'source'),
        item('Context Bundle', 'Shot data as data', 'app'),
        item('Skill / Template', 'versioned routing', 'flow'),
        item('Output Contract', 'schema gate', 'risk'),
      ],
      ['素材不得覆盖系统规则。', 'schema 缺失阻断运行。', '输出校验通过后才写正式对象。'],
    ),
  ],
  [
    'runtime-adapters',
    diagram(
      'module-runtime-adapters',
      'swimlane',
      '运行时错误和重试泳道',
      '这张图回答：任务失败、取消、超时和重试如何保留证据？',
      ['details/06-ai-runtime-and-provider-adapters/runtime-gateway.md', 'details/06-ai-runtime-and-provider-adapters/runtime-errors-and-retry.md'],
      [
        item('attempt_created', 'new attempt', 'flow'),
        item('running', 'events + progress', 'app'),
        item('failed_retryable', 'user can retry', 'risk'),
        item('completed', 'validated output', 'source'),
      ],
      ['重试创建新 attempt。', '取消后不自动重试。', '不可重试错误说明需修复对象。'],
      [
        lane('User', [item('confirm run', 'submit', 'flow'), item('retry or cancel', 'manual choice', 'risk')], 'flow'),
        lane('Runtime', [item('attempt record', 'running', 'app'), item('error mapping', 'retryable flag', 'risk')], 'app'),
        lane('Audit', [item('request summary', 'input digest', 'source'), item('output / error', 'immutable history', 'source')], 'source'),
      ],
    ),
  ],
  [
    'workbench-ux',
    diagram(
      'module-workbench-ux',
      'swimlane',
      '工作台五区协作图',
      '这张图回答：Top Bar、Left Panel、Canvas、Inspector 和 Bottom Bar 如何分工？',
      ['details/07-frontend-workbench-experience/workspace-layout.md', 'details/07-frontend-workbench-experience/canvas-interactions.md', 'details/07-frontend-workbench-experience/inspector-and-task-panels.md'],
      [
        item('Top Bar', 'project / save / queue', 'source'),
        item('Left Panel', 'assets / scripts / search', 'app'),
        item('Canvas', 'Creative Graph', 'flow'),
        item('Inspector + Bottom', 'validation / tasks / health', 'risk'),
      ],
      ['打开项目后直接进入 Graph View。', '长文本不撑破面板。', '保存、运行、健康、错误都有一致入口。'],
      [
        lane('Navigation', [item('project context', 'top bar', 'source'), item('asset/script source', 'left panel', 'app')], 'source'),
        lane('Creation', [item('graph canvas', 'nodes and edges', 'flow'), item('inspector tabs', 'edit and validate', 'app')], 'flow'),
        lane('Feedback', [item('queue', 'running tasks', 'app'), item('bottom bar', 'health and errors', 'risk')], 'risk'),
      ],
    ),
  ],
  [
    'security-observability',
    diagram(
      'module-security-observability',
      'swimlane',
      '安全、隐私与观测链路',
      '这张图回答：路径守卫、脱敏、审计和恢复如何贯穿生产动作？',
      ['details/08-security-privacy-observability/path-guard-and-permissions.md', 'details/08-security-privacy-observability/privacy-and-redaction.md', 'details/08-security-privacy-observability/audit-events.md'],
      [
        item('Path Guard', 'reject unsafe path', 'risk'),
        item('Redaction', 'no local secret leak', 'source'),
        item('Audit Event', 'who / what / when', 'app'),
        item('Recovery Report', 'diagnostic without secrets', 'flow'),
      ],
      ['路径越界拒绝。', '脱敏报告不含敏感本机痕迹。', '安全类拒绝写入 audit。'],
      [
        lane('User Action', [item('import/export', 'explicit action', 'flow'), item('confirm external write', 'manual gate', 'risk')], 'flow'),
        lane('Guard', [item('path check', 'allow or reject', 'risk'), item('redact', 'safe report', 'source')], 'risk'),
        lane('Observability', [item('audit', 'event jsonl', 'app'), item('support bundle', 'redacted', 'source')], 'app'),
      ],
    ),
  ],
  [
    'delivery-acceptance',
    diagram(
      'module-delivery-acceptance',
      'coverage',
      '交付验收覆盖矩阵',
      '这张图回答：功能、数据、错误、恢复、审计和安全验收如何覆盖首个生产闭环？',
      ['details/09-delivery-acceptance-and-test-plan/delivery-slices.md', 'details/09-delivery-acceptance-and-test-plan/acceptance-matrix.md', 'details/09-delivery-acceptance-and-test-plan/test-strategy.md'],
      [
        item('Functional', '7 production pages', 'flow'),
        item('Data', 'project / graph / package / result', 'source'),
        item('Errors', 'blocking + warning', 'risk'),
        item('Recovery', 'retry / relink / re-export', 'app'),
      ],
      ['每个切片有完成定义。', '验收矩阵覆盖错误和恢复。', '发布前健康、迁移、脱敏和可移植检查通过。'],
    ),
  ],
])

export const getWorkflowDiagram = (slug: string): DiagramSpec => {
  const diagramSpec = workflowDiagrams.get(slug)
  if (!diagramSpec) {
    throw new Error(`Missing workflow diagram for ${slug}`)
  }
  return diagramSpec
}

export const getModuleDiagram = (slug: string): DiagramSpec => {
  const diagramSpec = moduleDiagrams.get(slug)
  if (!diagramSpec) {
    throw new Error(`Missing module diagram for ${slug}`)
  }
  return diagramSpec
}
