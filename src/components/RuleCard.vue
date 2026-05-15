<script setup lang="ts">
import type { Tone } from '../types'
import { zhText } from '../utils/zhText'
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
      <h2>{{ zhText(title) }}</h2>
      <StatusChip :label="`${items.length}`" :tone="tone ?? 'neutral'" />
    </div>
    <ul class="dense-list">
      <li v-for="item in items" :key="item">{{ zhText(item) }}</li>
    </ul>
  </section>
</template>
