<script setup lang="ts">
import StatusChip from './StatusChip.vue'

defineProps<{
  eyebrow: string
  title: string
  summary: string
  chips?: string[]
}>()
</script>

<template>
  <header class="page-header">
    <div>
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
      <p class="page-summary">{{ summary }}</p>
    </div>
    <div v-if="chips?.length" class="header-chips">
      <StatusChip v-for="chip in chips" :key="chip" :label="chip" tone="source" />
    </div>
  </header>
</template>
