export type Tone = 'source' | 'app' | 'flow' | 'risk' | 'neutral'

export interface TraceTarget {
  id: string
  title: string
  href: string
  tone?: Tone
}

export interface SketchItem {
  label: string
  meta?: string
  tone?: Tone
}

export type ProviderCapability =
  | 'textUnderstanding'
  | 'imageUnderstanding'
  | 'videoUnderstanding'
  | 'imageGeneration'
  | 'videoGeneration'
  | 'apiSubmit'
  | 'pollResult'

export interface ReferenceGroup {
  title: string
  role: string
  priority: string
  inputNodes: SketchItem[]
  notes?: string
}

export interface FrameRunSummary {
  label: string
  meta: string
  tone?: Tone
}

export interface ProductionFrame {
  title: string
  intent: string
  referenceGroup: ReferenceGroup
  outputNode: SketchItem
  requiredCapabilities: ProviderCapability[]
  historySummary: FrameRunSummary[]
  taskStates: SketchItem[]
  storyboardRows: SketchItem[]
}

export interface WorkbenchSketch {
  title: string
  eyebrow: string
  activeTab: string
  tabs: string[]
  boardTitle: string
  boardItems: SketchItem[]
  inspectorTitle: string
  inspectorItems: SketchItem[]
  queueTitle: string
  queueItems: SketchItem[]
  footerItems: SketchItem[]
  variant?: 'default' | 'production-frame'
  productionFrame?: ProductionFrame
}

export interface WorkflowPage {
  id: string
  slug: string
  title: string
  navTitle: string
  summary: string
  sourceBasis: string[]
  userActions: string[]
  systemWrites: string[]
  blockers: string[]
  recoveryActions: string[]
  moduleRefs: string[]
  sketch: WorkbenchSketch
}

export interface SubDocument {
  id: string
  title: string
  sourcePath: string
  responsibility: string
  keyRules: string[]
  errors: string[]
  recovery: string[]
}

export interface DesignModule {
  id: string
  slug: string
  index: string
  title: string
  navTitle: string
  readmeSourcePath: string
  summary: string
  sourceTruth: string[]
  subdocuments: SubDocument[]
  invariants: string[]
  errorSemantics: string[]
  recoverySemantics: string[]
  workflowRefs: string[]
  sketch: WorkbenchSketch
}

export interface GraphNode {
  id: string
  label: string
  kind: string
  status: string
  tone: Tone
}

export interface GraphEdge {
  source: string
  target: string
  label: string
}

export interface StatusDatum {
  category: string
  value: number
  type: string
}

export type DiagramKind = 'flow' | 'state' | 'graph' | 'swimlane' | 'lineage' | 'coverage'

export interface DiagramItem {
  label: string
  meta: string
  tone?: Tone
}

export interface DiagramLane {
  label: string
  tone?: Tone
  items: DiagramItem[]
}

export interface DiagramSpec {
  id: string
  kind: DiagramKind
  title: string
  question: string
  sourcePaths: string[]
  acceptance: string[]
  items: DiagramItem[]
  lanes?: DiagramLane[]
}
