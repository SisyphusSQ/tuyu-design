<script setup lang="ts">
import { zhSourcePath, zhText } from '../utils/zhText'
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
      <p class="eyebrow">{{ zhText(eyebrow) }}</p>
      <h1>{{ zhText(title) }}</h1>
      <p class="page-summary">{{ zhText(summary) }}</p>
    </div>
    <div v-if="chips?.length" class="header-chips">
      <StatusChip v-for="chip in chips" :key="chip" :label="zhSourcePath(chip)" tone="source" />
    </div>
  </header>
</template>
