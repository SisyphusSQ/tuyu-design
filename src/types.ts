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

export interface DependencyRow {
  name: string
  stage: string
  purpose: string
  tone?: Tone
}

export interface DependencySection {
  title: string
  description: string
  rows: DependencyRow[]
}

export interface ArchitectureConvention {
  title: string
  summary: string
  bullets: string[]
  tone?: Tone
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
  dependencySections?: DependencySection[]
  architectureConventions?: ArchitectureConvention[]
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

export type StudioThemeMode = 'dark' | 'warm-light'

export type StudioProviderMode = 'internal_provider' | 'external_agent'

export type CanvasNodeCategory =
  | 'source'
  | 'concept'
  | 'continuity'
  | 'production'
  | 'output'
  | 'review'
  | 'organizer'
  | 'handoff'

export type CanvasNodeStatus = 'ready' | 'running' | 'blocked' | 'success' | 'stale' | 'candidate'

export type CanvasNodeSource = 'human' | 'agent' | 'system' | 'imported'

export interface StudioCanvasNode {
  id: string
  title: string
  subtitle: string
  category: CanvasNodeCategory
  status: CanvasNodeStatus
  source: CanvasNodeSource
  x: number
  y: number
  width: number
  height: number
  badges: string[]
  meta: string
}

export interface StudioCanvasEdge {
  id: string
  source: string
  target: string
  label: string
  status?: CanvasNodeStatus
}

export interface StudioCanvasFrame {
  id: string
  title: string
  subtitle: string
  x: number
  y: number
  width: number
  height: number
  status: CanvasNodeStatus
}

export interface StudioCanvasEvent {
  id: string
  actor: 'Human' | 'Agent' | 'System'
  action: string
  target: string
  time: string
  tone: Tone
}

export interface StudioCanvasModel {
  title: string
  projectName: string
  theme: StudioThemeMode
  providerMode: StudioProviderMode
  viewport: {
    zoom: number
    x: number
    y: number
  }
  grid: {
    size: number
    opacity: number
  }
  nodes: StudioCanvasNode[]
  edges: StudioCanvasEdge[]
  frames: StudioCanvasFrame[]
  selectedNodeId: string
  leftRail: SketchItem[]
  healthItems: SketchItem[]
  assets: SketchItem[]
  events: StudioCanvasEvent[]
}

export type ScriptExpansionStatus = 'candidate' | 'ready' | 'stale' | 'blocked'

export interface ScriptExpansionRoleRef {
  name: string
  description: string
  referenceLabel: string
  tone: Tone
}

export interface ScriptExpansionRow {
  id: string
  index: number
  durationSeconds: number
  visualDescription: string
  roles: ScriptExpansionRoleRef[]
  sourceRange: string
  status: ScriptExpansionStatus
  action: string
}

export interface ScriptExpansionModel {
  title: string
  subtitle: string
  viewMode: string
  zoom: number
  actions: SketchItem[]
  rows: ScriptExpansionRow[]
  selectedRowId: string
  healthItems: SketchItem[]
  thumbnails: SketchItem[]
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
