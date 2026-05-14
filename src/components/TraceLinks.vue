<script setup lang="ts">
import type { TraceTarget } from '../types'
import StatusChip from './StatusChip.vue'

defineProps<{
  title: string
  targets: TraceTarget[]
}>()
</script>

<template>
  <section class="panel trace-panel">
    <div class="panel-heading">
      <h2>{{ title }}</h2>
      <StatusChip :label="`${targets.length} links`" tone="source" />
    </div>
    <div class="trace-links">
      <a
        v-for="target in targets"
        :key="target.id"
        class="trace-link"
        :class="`tone-${target.tone ?? 'source'}`"
        :href="target.href"
      >
        {{ target.title }}
      </a>
    </div>
  </section>
</template>
