<script setup lang="ts">
import type { TraceTarget } from '../types'
import { zhText } from '../utils/zhText'
import StatusChip from './StatusChip.vue'

defineProps<{
  title: string
  targets: TraceTarget[]
}>()
</script>

<template>
  <section class="panel trace-panel">
    <div class="panel-heading">
      <h2>{{ zhText(title) }}</h2>
      <StatusChip :label="`${targets.length} 个链接`" tone="source" />
    </div>
    <div class="trace-links">
      <a
        v-for="target in targets"
        :key="target.id"
        class="trace-link"
        :class="`tone-${target.tone ?? 'source'}`"
        :href="target.href"
      >
        {{ zhText(target.title) }}
      </a>
    </div>
  </section>
</template>
