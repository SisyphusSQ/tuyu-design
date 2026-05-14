<script setup lang="ts">
import type { Tone } from '../types'

defineProps<{
  label: string
  tone?: Tone
}>()
</script>

<template>
  <span class="status-chip" :class="`tone-${tone ?? 'neutral'}`">{{ label }}</span>
</template>
