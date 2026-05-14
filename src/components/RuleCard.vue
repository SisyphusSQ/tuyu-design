<script setup lang="ts">
import type { Tone } from '../types'
import StatusChip from './StatusChip.vue'

defineProps<{
  title: string
  items: string[]
  tone?: Tone
}>()
</script>

<template>
  <section class="panel rule-card" :class="`tone-border-${tone ?? 'neutral'}`">
    <div class="panel-heading compact">
      <h2>{{ title }}</h2>
      <StatusChip :label="`${items.length}`" :tone="tone ?? 'neutral'" />
    </div>
    <ul class="dense-list">
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </section>
</template>
