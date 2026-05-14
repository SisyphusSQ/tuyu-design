<script setup lang="ts">
import type { WorkbenchSketch } from '../types'
import StatusChip from './StatusChip.vue'

defineProps<{
  sketch: WorkbenchSketch
}>()
</script>

<template>
  <section class="workbench-frame" aria-label="Semi-real workbench sketch">
    <div class="workbench-topline">
      <div>
        <p class="eyebrow">{{ sketch.eyebrow }}</p>
        <h2>{{ sketch.title }}</h2>
      </div>
      <div class="workbench-tabs">
        <span
          v-for="tab in sketch.tabs"
          :key="tab"
          class="workbench-tab"
          :class="{ active: tab === sketch.activeTab }"
        >
          {{ tab }}
        </span>
      </div>
    </div>

    <div class="workbench-body">
      <div class="workbench-board">
        <div class="panel-heading compact">
          <h3>{{ sketch.boardTitle }}</h3>
          <StatusChip label="canvas draft" tone="app" />
        </div>
        <div class="sketch-grid">
          <article
            v-for="item in sketch.boardItems"
            :key="`${item.label}-${item.meta}`"
            class="sketch-node"
            :class="`tone-border-${item.tone ?? 'neutral'}`"
          >
            <strong>{{ item.label }}</strong>
            <span>{{ item.meta }}</span>
          </article>
        </div>
      </div>

      <aside class="workbench-inspector">
        <div class="panel-heading compact">
          <h3>{{ sketch.inspectorTitle }}</h3>
          <StatusChip label="selected" tone="source" />
        </div>
        <ul class="inspector-list">
          <li v-for="item in sketch.inspectorItems" :key="`${item.label}-${item.meta}`">
            <span>{{ item.label }}</span>
            <StatusChip :label="item.meta ?? 'open'" :tone="item.tone ?? 'neutral'" />
          </li>
        </ul>
      </aside>

      <aside class="workbench-queue">
        <div class="panel-heading compact">
          <h3>{{ sketch.queueTitle }}</h3>
          <StatusChip label="live" tone="flow" />
        </div>
        <ul class="queue-list">
          <li v-for="item in sketch.queueItems" :key="`${item.label}-${item.meta}`">
            <span>{{ item.label }}</span>
            <small>{{ item.meta }}</small>
          </li>
        </ul>
      </aside>
    </div>

    <footer class="workbench-footer">
      <StatusChip
        v-for="item in sketch.footerItems"
        :key="item.label"
        :label="item.label"
        :tone="item.tone ?? 'neutral'"
      />
    </footer>
  </section>
</template>
