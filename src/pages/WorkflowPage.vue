<script setup lang="ts">
import { computed } from 'vue'
import AntvGraphView from '../components/AntvGraphView.vue'
import AntvStatusChart from '../components/AntvStatusChart.vue'
import DiagramPanel from '../components/DiagramPanel.vue'
import PageHeader from '../components/PageHeader.vue'
import RuleCard from '../components/RuleCard.vue'
import TraceLinks from '../components/TraceLinks.vue'
import WorkbenchFrame from '../components/WorkbenchFrame.vue'
import WorkflowMap from '../components/WorkflowMap.vue'
import { designModuleMap } from '../data/designModules'
import { getWorkflowDiagram } from '../data/diagrams'
import { productionStateData } from '../data/mockProject'
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
      eyebrow="Production Flow"
      :title="page.title"
      :summary="page.summary"
      :chips="page.sourceBasis"
    />

    <WorkflowMap v-if="page.slug === 'overview'" />

    <DiagramPanel :spec="diagram" />

    <div v-if="page.slug === 'overview'" class="two-panel-grid">
      <AntvStatusChart :data="productionStateData" title="Production State Distribution" />
      <section class="panel">
        <div class="panel-heading">
          <h2>Design Reading</h2>
          <span class="chart-note">from docs/design</span>
        </div>
        <ul class="dense-list">
          <li>本原型把顶层架构、details 索引和 10 个模块目录合并为评审视图。</li>
          <li>页面内容是手工整理的 TypeScript 数据对象，不在运行时解析 Markdown。</li>
          <li>交接、运行和结果视图都保留错误、恢复和关联模块入口。</li>
        </ul>
      </section>
    </div>

    <WorkbenchFrame :sketch="page.sketch" />

    <AntvGraphView v-if="page.slug === 'creative-graph'" />

    <div class="four-card-grid">
      <RuleCard title="User Actions" :items="page.userActions" tone="flow" />
      <RuleCard title="System Writes / State Changes" :items="page.systemWrites" tone="app" />
      <RuleCard title="Blocking / Error Conditions" :items="page.blockers" tone="risk" />
      <RuleCard title="Recovery Actions" :items="page.recoveryActions" tone="source" />
    </div>

    <TraceLinks title="Related Design Modules" :targets="moduleTargets" />
  </div>
</template>
