<script setup lang="ts">
import type { StudioThemeMode } from '../types'

defineProps<{
  mode: StudioThemeMode
  gridOpacity: number
}>()

const emit = defineEmits<{
  select: [mode: StudioThemeMode]
}>()
</script>

<template>
  <div class="studio-theme-toggle" aria-label="画布视觉模式">
    <button :class="{ active: mode === 'dark' }" type="button" @click="emit('select', 'dark')">Dark</button>
    <button :class="{ active: mode === 'warm-light' }" type="button" @click="emit('select', 'warm-light')">
      Warm Light
    </button>
    <span>Grid {{ gridOpacity }}%</span>
  </div>
</template>
