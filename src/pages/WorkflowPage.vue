<script setup lang="ts">
import { computed } from 'vue'
import AntvGraphView from '../components/AntvGraphView.vue'
import AntvStatusChart from '../components/AntvStatusChart.vue'
import ArchitectureConventions from '../components/ArchitectureConventions.vue'
import DependencyMatrix from '../components/DependencyMatrix.vue'
import DiagramPanel from '../components/DiagramPanel.vue'
import PageHeader from '../components/PageHeader.vue'
import RuleCard from '../components/RuleCard.vue'
import StudioCanvas from '../components/StudioCanvas.vue'
import StudioScriptExpansion from '../components/StudioScriptExpansion.vue'
import TraceLinks from '../components/TraceLinks.vue'
import WorkbenchFrame from '../components/WorkbenchFrame.vue'
import WorkflowMap from '../components/WorkflowMap.vue'
import { designModuleMap } from '../data/designModules'
import { getWorkflowDiagram } from '../data/diagrams'
import { productionStateData, scriptExpansionModel, studioCanvasModel } from '../data/mockProject'
import type { TraceTarget, WorkflowPage } from '../types'

const props = defineProps<{
  page: WorkflowPage
}>()

const moduleTargets = computed<TraceTarget[]>(() =>
  props.page.moduleRefs.flatMap((slug) => {
    const module = designModuleMap.get(slug)
    return module
      ? [
          {
            id: module.slug,
            title: module.navTitle,
            href: `#/module/${module.slug}`,
            tone: 'source' as const,
          },
        ]
      : []
  }),
)

const diagram = computed(() => getWorkflowDiagram(props.page.slug))
</script>

<template>
  <div class="page-stack">
    <PageHeader
      eyebrow="生产流程"
      :title="page.title"
      :summary="page.summary"
      :chips="page.sourceBasis"
    />

    <StudioCanvas v-if="page.slug === 'overview'" :model="studioCanvasModel" />

    <WorkflowMap v-if="page.slug === 'overview'" />

    <DiagramPanel :spec="diagram" />

    <StudioScriptExpansion v-if="page.slug === 'shot-prompt'" :model="scriptExpansionModel" />

    <ArchitectureConventions
      v-if="page.architectureConventions?.length"
      :sections="page.architectureConventions"
    />

    <DependencyMatrix
      v-if="page.dependencySections?.length"
      :sections="page.dependencySections"
    />

    <div v-if="page.slug === 'overview'" class="two-panel-grid">
      <AntvStatusChart :data="productionStateData" title="生产状态分布" />
      <section class="panel">
        <div class="panel-heading">
          <h2>设计阅读</h2>
          <span class="chart-note">来自 docs/design</span>
        </div>
        <ul class="dense-list">
          <li>本原型把顶层架构、details 索引和 10 个模块目录合并为评审视图。</li>
          <li>页面内容是手工整理的 TypeScript 数据对象，不在运行时解析标记文档。</li>
          <li>交接、运行和结果视图都保留错误、恢复和关联模块入口。</li>
        </ul>
      </section>
    </div>

    <WorkbenchFrame v-if="page.slug !== 'overview'" :sketch="page.sketch" />

    <AntvGraphView v-if="page.slug === 'creative-graph'" />

    <div class="four-card-grid">
      <RuleCard title="用户动作" :items="page.userActions" tone="flow" />
      <RuleCard title="系统写入与状态变化" :items="page.systemWrites" tone="app" />
      <RuleCard title="阻断与错误条件" :items="page.blockers" tone="risk" />
      <RuleCard title="恢复动作" :items="page.recoveryActions" tone="source" />
    </div>

    <TraceLinks title="关联设计模块" :targets="moduleTargets" />
  </div>
</template>
