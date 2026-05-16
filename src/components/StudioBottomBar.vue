<script setup lang="ts">
import type { StudioCanvasModel } from '../types'
import { zhText } from '../utils/zhText'
import StatusChip from './StatusChip.vue'

defineProps<{
  model: StudioCanvasModel
}>()
</script>

<template>
  <footer class="studio-bottom-bar" aria-label="Canvas status">
    <div class="studio-bottom-status">
      <StatusChip :label="`Zoom ${model.viewport.zoom}%`" tone="neutral" />
      <StatusChip :label="`Grid ${model.grid.opacity}%`" tone="source" />
      <StatusChip label="Minimap ready" tone="app" />
      <StatusChip label="No real billing" tone="neutral" />
    </div>
    <div class="studio-event-ticker">
      <span v-for="event in model.events" :key="event.id" :class="`studio-event-${event.tone}`">
        {{ event.time }} {{ event.actor }} {{ zhText(event.action) }} {{ zhText(event.target) }}
      </span>
    </div>
  </footer>
</template>
