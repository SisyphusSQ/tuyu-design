<script setup lang="ts">
import type { Tone } from '../types'
import { zhText } from '../utils/zhText'

defineProps<{
  label: string
  tone?: Tone
}>()
</script>

<template>
  <span class="status-chip" :class="`tone-${tone ?? 'neutral'}`">{{ zhText(label) }}</span>
</template>
