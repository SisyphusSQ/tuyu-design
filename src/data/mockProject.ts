import type { GraphEdge, GraphNode, StatusDatum } from '../types'
import { allDetailSources, designModules } from './designModules'
import { workflowPages } from './workflowPages'

export const sourceRoot = '/Users/suqing/Coding/golang/00_self/tuyu-studio/docs/design'
export const prototypeRoot = '/Users/suqing/Coding/design/tuyu-design'

export const creativeGraphNodes: GraphNode[] = [
  { id: 'project', label: 'Project', kind: 'Project', status: 'schema ok', tone: 'source' },
  { id: 'script', label: 'Script', kind: 'Script', status: 'imported', tone: 'source' },
  { id: 'scene', label: 'Scene 03', kind: 'Scene', status: 'confirmed', tone: 'app' },
  { id: 'character', label: 'Character', kind: 'Character', status: 'locked ref', tone: 'app' },
  { id: 'shot', label: 'Shot 012', kind: 'Shot', status: 'context_ready', tone: 'flow' },
  { id: 'prompt', label: 'Prompt', kind: 'Prompt', status: 'validated', tone: 'flow' },
  { id: 'run', label: 'PromptRun', kind: 'Run record', status: 'completed', tone: 'source' },
  { id: 'package', label: 'Package v03', kind: 'GenerationPackage', status: 'ready', tone: 'flow' },
  { id: 'result', label: 'VideoResult', kind: 'Result', status: 'pending_review', tone: 'risk' },
]

export const creativeGraphEdges: GraphEdge[] = [
  { source: 'project', target: 'script', label: 'contains' },
  { source: 'script', target: 'scene', label: 'splits_to' },
  { source: 'scene', target: 'shot', label: 'contains' },
  { source: 'character', target: 'shot', label: 'used_by' },
  { source: 'shot', target: 'prompt', label: 'compiled_as' },
  { source: 'prompt', target: 'run', label: 'tracked_by' },
  { source: 'shot', target: 'package', label: 'exports' },
  { source: 'package', target: 'result', label: 'receives' },
]

export const moduleCoverageData: StatusDatum[] = [
  { category: 'Product Scope', value: 4, type: 'module readme + docs' },
  { category: 'Storage', value: 5, type: 'module readme + docs' },
  { category: 'Graph', value: 5, type: 'module readme + docs' },
  { category: 'Assets', value: 5, type: 'module readme + docs' },
  { category: 'Packages', value: 5, type: 'module readme + docs' },
  { category: 'Instructions', value: 5, type: 'module readme + docs' },
  { category: 'Runtime', value: 5, type: 'module readme + docs' },
  { category: 'UX', value: 5, type: 'module readme + docs' },
  { category: 'Security', value: 5, type: 'module readme + docs' },
  { category: 'Acceptance', value: 5, type: 'module readme + docs' },
]

export const productionStateData: StatusDatum[] = [
  { category: 'Draft', value: 2, type: 'Shot' },
  { category: 'Context Ready', value: 4, type: 'Shot' },
  { category: 'Prompt Ready', value: 3, type: 'Shot' },
  { category: 'Package Ready', value: 2, type: 'Package' },
  { category: 'Result Review', value: 1, type: 'Result' },
  { category: 'Blocked', value: 2, type: 'Risk' },
]

export const prototypeStats = [
  { label: 'Production flow pages', value: workflowPages.length.toString(), tone: 'flow' },
  { label: 'Design module pages', value: designModules.length.toString(), tone: 'source' },
  { label: 'Detail markdown covered', value: allDetailSources.length.toString(), tone: 'app' },
  { label: 'Child subdocuments', value: designModules.reduce((sum, module) => sum + module.subdocuments.length, 0).toString(), tone: 'risk' },
] as const
