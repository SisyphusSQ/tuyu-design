import type { GraphEdge, GraphNode, StatusDatum } from '../types'
import { allDetailSources, designModules } from './designModules'
import { workflowPages } from './workflowPages'

export const sourceRoot = '/Users/suqing/Coding/golang/00_self/tuyu-studio/docs/design'
export const prototypeRoot = '/Users/suqing/Coding/design/tuyu-design'

export const creativeGraphNodes: GraphNode[] = [
  { id: 'project', label: '项目', kind: '项目', status: '结构正常', tone: 'source' },
  { id: 'script', label: '剧本', kind: '剧本', status: '已导入', tone: 'source' },
  { id: 'scene', label: '场次 03', kind: '场次', status: '已确认', tone: 'app' },
  { id: 'character', label: '角色', kind: '角色', status: '引用已锁定', tone: 'app' },
  { id: 'shot', label: '镜头 012', kind: '镜头', status: '上下文就绪', tone: 'flow' },
  { id: 'prompt', label: '提示词', kind: '提示词', status: '已校验', tone: 'flow' },
  { id: 'run', label: '运行记录', kind: '运行记录', status: '已完成', tone: 'source' },
  { id: 'package', label: '交接包 v03', kind: '生成包', status: '就绪', tone: 'flow' },
  { id: 'result', label: '视频结果', kind: '结果', status: '待评审', tone: 'risk' },
]

export const creativeGraphEdges: GraphEdge[] = [
  { source: 'project', target: 'script', label: '包含' },
  { source: 'script', target: 'scene', label: '拆分为' },
  { source: 'scene', target: 'shot', label: '包含' },
  { source: 'character', target: 'shot', label: '被使用' },
  { source: 'shot', target: 'prompt', label: '编译为' },
  { source: 'prompt', target: 'run', label: '记录为' },
  { source: 'shot', target: 'package', label: '导出' },
  { source: 'package', target: 'result', label: '回收' },
]

export const moduleCoverageData: StatusDatum[] = [
  { category: '产品边界', value: 4, type: '模块说明与文档' },
  { category: '本地存储', value: 5, type: '模块说明与文档' },
  { category: '创作图谱', value: 5, type: '模块说明与文档' },
  { category: '资产连续性', value: 5, type: '模块说明与文档' },
  { category: '生成包', value: 5, type: '模块说明与文档' },
  { category: '指令栈', value: 5, type: '模块说明与文档' },
  { category: '运行适配', value: 5, type: '模块说明与文档' },
  { category: '工作台体验', value: 5, type: '模块说明与文档' },
  { category: '安全观测', value: 5, type: '模块说明与文档' },
  { category: '交付验收', value: 5, type: '模块说明与文档' },
]

export const productionStateData: StatusDatum[] = [
  { category: '草稿', value: 2, type: '镜头' },
  { category: '上下文就绪', value: 4, type: '镜头' },
  { category: '提示词就绪', value: 3, type: '镜头' },
  { category: '交接包就绪', value: 2, type: '交接包' },
  { category: '结果评审', value: 1, type: '结果' },
  { category: '已阻断', value: 2, type: '风险' },
]

export const prototypeStats = [
  { label: '生产流程页', value: workflowPages.length.toString(), tone: 'flow' },
  { label: '设计模块页', value: designModules.length.toString(), tone: 'source' },
  { label: '已覆盖标记文档', value: allDetailSources.length.toString(), tone: 'app' },
  { label: '子文档数量', value: designModules.reduce((sum, module) => sum + module.subdocuments.length, 0).toString(), tone: 'risk' },
] as const
