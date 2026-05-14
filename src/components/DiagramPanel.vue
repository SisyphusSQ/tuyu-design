<script setup lang="ts">
import type { DiagramItem, DiagramSpec } from '../types'
import StatusChip from './StatusChip.vue'

const props = defineProps<{
  spec: DiagramSpec
}>()

const kindLabels: Record<DiagramSpec['kind'], string> = {
  flow: 'Flow',
  state: 'State',
  graph: 'Graph',
  swimlane: 'Swimlane',
  lineage: 'Lineage',
  coverage: 'Coverage',
}

const itemStyle = (index: number) => ({
  '--item-index': index.toString(),
})

const itemKey = (item: DiagramItem, index: number) => `${props.spec.id}-${item.label}-${index}`
</script>

<template>
  <section class="panel diagram-panel">
    <div class="panel-heading">
      <div>
        <h2>{{ spec.title }}</h2>
        <p class="diagram-question">{{ spec.question }}</p>
      </div>
      <StatusChip :label="kindLabels[spec.kind]" tone="flow" />
    </div>

    <div class="diagram-layout">
      <div class="diagram-visual" :class="`diagram-${spec.kind}`">
        <template v-if="spec.kind === 'swimlane' && spec.lanes">
          <div v-for="lane in spec.lanes" :key="lane.label" class="diagram-lane">
            <div class="lane-title">
              <StatusChip :label="lane.label" :tone="lane.tone ?? 'neutral'" />
            </div>
            <div
              v-for="(item, index) in lane.items"
              :key="itemKey(item, index)"
              class="diagram-node"
              :class="`tone-border-${item.tone ?? 'neutral'}`"
              :style="itemStyle(index)"
            >
              <strong>{{ item.label }}</strong>
              <span>{{ item.meta }}</span>
            </div>
          </div>
        </template>

        <template v-else>
          <div
            v-for="(item, index) in spec.items"
            :key="itemKey(item, index)"
            class="diagram-node"
            :class="`tone-border-${item.tone ?? 'neutral'}`"
            :style="itemStyle(index)"
          >
            <strong>{{ item.label }}</strong>
            <span>{{ item.meta }}</span>
          </div>
        </template>
      </div>

      <aside class="diagram-notes">
        <div class="diagram-note-block">
          <strong>读图说明</strong>
          <p>{{ spec.question }}</p>
        </div>

        <div class="diagram-note-block">
          <strong>来源文档</strong>
          <ul>
            <li v-for="path in spec.sourcePaths" :key="path">
              <code>{{ path }}</code>
            </li>
          </ul>
        </div>

        <div class="diagram-note-block">
          <strong>对应验收点</strong>
          <ul>
            <li v-for="rule in spec.acceptance" :key="rule">{{ rule }}</li>
          </ul>
        </div>
      </aside>
    </div>
  </section>
</template>
