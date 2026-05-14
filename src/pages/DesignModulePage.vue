<script setup lang="ts">
import { computed } from 'vue'
import AntvGraphView from '../components/AntvGraphView.vue'
import AntvStatusChart from '../components/AntvStatusChart.vue'
import DesignModuleGrid from '../components/DesignModuleGrid.vue'
import DiagramPanel from '../components/DiagramPanel.vue'
import PageHeader from '../components/PageHeader.vue'
import RuleCard from '../components/RuleCard.vue'
import TraceLinks from '../components/TraceLinks.vue'
import WorkbenchFrame from '../components/WorkbenchFrame.vue'
import { getModuleDiagram } from '../data/diagrams'
import { moduleCoverageData } from '../data/mockProject'
import { workflowPageMap } from '../data/workflowPages'
import type { DesignModule, TraceTarget } from '../types'

const props = defineProps<{
  module: DesignModule
}>()

const workflowTargets = computed<TraceTarget[]>(() =>
  props.module.workflowRefs.flatMap((slug) => {
    const page = workflowPageMap.get(slug)
    return page
      ? [
          {
            id: page.slug,
            title: page.navTitle,
            href: `#/workflow/${page.slug}`,
            tone: 'flow' as const,
          },
        ]
      : []
  }),
)

const diagram = computed(() => getModuleDiagram(props.module.slug))
</script>

<template>
  <div class="page-stack">
    <PageHeader
      eyebrow="Design Module"
      :title="`${module.index} ${module.title}`"
      :summary="module.summary"
      :chips="module.sourceTruth"
    />

    <DiagramPanel :spec="diagram" />

    <div class="two-panel-grid">
      <RuleCard title="Key Invariants" :items="module.invariants" tone="source" />
      <RuleCard title="Error Semantics" :items="module.errorSemantics" tone="risk" />
    </div>

    <div class="two-panel-grid">
      <RuleCard title="Recovery Semantics" :items="module.recoverySemantics" tone="app" />
      <TraceLinks title="Related Production Flow" :targets="workflowTargets" />
    </div>

    <WorkbenchFrame :sketch="module.sketch" />

    <AntvGraphView v-if="module.slug === 'creative-graph'" />
    <AntvStatusChart
      v-if="module.slug === 'delivery-acceptance'"
      :data="moduleCoverageData"
      title="Markdown Coverage by Module"
    />

    <DesignModuleGrid :module="module" />
  </div>
</template>
