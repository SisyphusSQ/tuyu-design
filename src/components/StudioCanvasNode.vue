<script setup lang="ts">
import type { StudioCanvasNode } from '../types'
import { zhText } from '../utils/zhText'

defineProps<{
  node: StudioCanvasNode
  selected?: boolean
}>()
</script>

<template>
  <article
    class="studio-node"
    :class="[
      `studio-node-${node.category}`,
      `studio-node-status-${node.status}`,
      { selected },
    ]"
    :style="{
      left: `${node.x}px`,
      top: `${node.y}px`,
      width: `${node.width}px`,
      minHeight: `${node.height}px`,
    }"
  >
    <div class="studio-node-top">
      <span class="studio-node-kind">{{ zhText(node.category) }}</span>
      <span class="studio-node-source">{{ node.source }}</span>
    </div>
    <strong>{{ zhText(node.title) }}</strong>
    <p>{{ zhText(node.subtitle) }}</p>
    <div class="studio-node-badges">
      <span v-for="badge in node.badges" :key="badge">{{ zhText(badge) }}</span>
    </div>
    <small>{{ zhText(node.meta) }}</small>
  </article>
</template>
