<script setup lang="ts">
import type { StudioCanvasModel } from '../types'
import { zhText } from '../utils/zhText'
import StatusChip from './StatusChip.vue'

defineProps<{
  model: StudioCanvasModel
}>()
</script>

<template>
  <aside class="studio-left-rail" aria-label="Studio 画布入口">
    <div class="studio-rail-brand">
      <strong>Canvas Core</strong>
      <span>UI / Agent 同一入口</span>
    </div>

    <section class="studio-rail-section">
      <h3>入口</h3>
      <button
        v-for="item in model.leftRail"
        :key="item.label"
        class="studio-rail-button"
        type="button"
      >
        <span>{{ zhText(item.label) }}</span>
        <small>{{ zhText(item.meta) }}</small>
      </button>
    </section>

    <section class="studio-rail-section">
      <h3>资产</h3>
      <article v-for="asset in model.assets" :key="asset.label" class="studio-asset-row">
        <span>{{ zhText(asset.label) }}</span>
        <StatusChip :label="zhText(asset.meta ?? 'ready')" :tone="asset.tone ?? 'neutral'" />
      </article>
    </section>
  </aside>
</template>
