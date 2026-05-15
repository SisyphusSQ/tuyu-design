<script setup lang="ts">
import type { WorkbenchSketch } from '../types'
import { zhText } from '../utils/zhText'
import StatusChip from './StatusChip.vue'

defineProps<{
  sketch: WorkbenchSketch
}>()
</script>

<template>
  <section class="workbench-frame" aria-label="半真实工作台草图">
    <div class="workbench-topline">
      <div>
        <p class="eyebrow">{{ zhText(sketch.eyebrow) }}</p>
        <h2>{{ zhText(sketch.title) }}</h2>
      </div>
      <div class="workbench-tabs">
        <span
          v-for="tab in sketch.tabs"
          :key="tab"
          class="workbench-tab"
          :class="{ active: tab === sketch.activeTab }"
        >
          {{ zhText(tab) }}
        </span>
      </div>
    </div>

    <div v-if="sketch.variant === 'production-frame' && sketch.productionFrame" class="production-frame-body">
      <div class="production-canvas" aria-label="双层生产组草图">
        <div class="production-frame-shell">
          <div class="production-frame-label">
            <strong>{{ zhText(sketch.productionFrame.title) }}</strong>
            <span>{{ zhText(sketch.productionFrame.intent) }}</span>
          </div>

          <div class="reference-group-shell">
            <div class="reference-group-label">
              <strong>{{ zhText(sketch.productionFrame.referenceGroup.title) }}</strong>
              <span>{{ zhText(sketch.productionFrame.referenceGroup.role) }}</span>
            </div>
            <article
              v-for="item in sketch.productionFrame.referenceGroup.inputNodes"
              :key="`${item.label}-${item.meta}`"
              class="reference-node"
              :class="`tone-border-${item.tone ?? 'neutral'}`"
            >
              <strong>{{ zhText(item.label) }}</strong>
              <span>{{ zhText(item.meta) }}</span>
            </article>
          </div>

          <div class="production-edge" />

          <article
            class="output-node"
            :class="`tone-border-${sketch.productionFrame.outputNode.tone ?? 'flow'}`"
          >
            <strong>{{ zhText(sketch.productionFrame.outputNode.label) }}</strong>
            <span>{{ zhText(sketch.productionFrame.outputNode.meta) }}</span>
          </article>

          <aside class="history-rail" aria-label="历史轨">
            <strong>历史</strong>
            <span
              v-for="item in sketch.productionFrame.historySummary"
              :key="`${item.label}-${item.meta}`"
              :class="`tone-border-${item.tone ?? 'neutral'}`"
            >
              {{ zhText(item.label) }}
            </span>
          </aside>
        </div>
      </div>

      <aside class="capability-panel">
        <div class="panel-heading compact">
          <h3>供应商能力</h3>
          <StatusChip label="按能力降级" tone="flow" />
        </div>
        <ul class="queue-list">
          <li
            v-for="item in sketch.productionFrame.taskStates"
            :key="`${item.label}-${item.meta}`"
          >
            <span>{{ zhText(item.label) }}</span>
            <small>{{ zhText(item.meta) }}</small>
          </li>
        </ul>
      </aside>

      <aside class="storyboard-panel">
        <div class="panel-heading compact">
          <h3>分镜表候选</h3>
          <StatusChip label="确认后回写" tone="source" />
        </div>
        <ul class="queue-list">
          <li
            v-for="item in sketch.productionFrame.storyboardRows"
            :key="`${item.label}-${item.meta}`"
          >
            <span>{{ zhText(item.label) }}</span>
            <small>{{ zhText(item.meta) }}</small>
          </li>
        </ul>
      </aside>
    </div>

    <div v-else class="workbench-body">
      <div class="workbench-board">
        <div class="panel-heading compact">
          <h3>{{ zhText(sketch.boardTitle) }}</h3>
          <StatusChip label="画布草图" tone="app" />
        </div>
        <div class="sketch-grid">
          <article
            v-for="item in sketch.boardItems"
            :key="`${item.label}-${item.meta}`"
            class="sketch-node"
            :class="`tone-border-${item.tone ?? 'neutral'}`"
          >
            <strong>{{ zhText(item.label) }}</strong>
            <span>{{ zhText(item.meta) }}</span>
          </article>
        </div>
      </div>

      <aside class="workbench-inspector">
        <div class="panel-heading compact">
          <h3>{{ zhText(sketch.inspectorTitle) }}</h3>
          <StatusChip label="已选择" tone="source" />
        </div>
        <ul class="inspector-list">
          <li v-for="item in sketch.inspectorItems" :key="`${item.label}-${item.meta}`">
            <span>{{ zhText(item.label) }}</span>
            <StatusChip :label="zhText(item.meta ?? '打开')" :tone="item.tone ?? 'neutral'" />
          </li>
        </ul>
      </aside>

      <aside class="workbench-queue">
        <div class="panel-heading compact">
          <h3>{{ zhText(sketch.queueTitle) }}</h3>
          <StatusChip label="实时" tone="flow" />
        </div>
        <ul class="queue-list">
          <li v-for="item in sketch.queueItems" :key="`${item.label}-${item.meta}`">
            <span>{{ zhText(item.label) }}</span>
            <small>{{ zhText(item.meta) }}</small>
          </li>
        </ul>
      </aside>
    </div>

    <footer class="workbench-footer">
      <StatusChip
        v-for="item in sketch.footerItems"
        :key="item.label"
        :label="zhText(item.label)"
        :tone="item.tone ?? 'neutral'"
      />
    </footer>
  </section>
</template>
