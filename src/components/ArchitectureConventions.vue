<script setup lang="ts">
import type { ArchitectureConvention } from '../types'
import { zhText } from '../utils/zhText'
import StatusChip from './StatusChip.vue'

defineProps<{
  sections: ArchitectureConvention[]
}>()
</script>

<template>
  <section class="convention-panel panel">
    <div class="panel-heading">
      <div>
        <h2>架构约定</h2>
        <p class="convention-summary">前后端实现、运行时、凭据、存储和验收的代码边界。</p>
      </div>
      <StatusChip :label="`${sections.length} 组`" tone="source" />
    </div>

    <div class="convention-grid">
      <article
        v-for="section in sections"
        :key="section.title"
        class="convention-card"
        :class="`tone-border-${section.tone ?? 'neutral'}`"
      >
        <div class="convention-card-header">
          <h3>{{ zhText(section.title) }}</h3>
          <StatusChip :label="`${section.bullets.length}`" :tone="section.tone ?? 'neutral'" />
        </div>
        <p>{{ zhText(section.summary) }}</p>
        <ul>
          <li v-for="bullet in section.bullets" :key="bullet">{{ zhText(bullet) }}</li>
        </ul>
      </article>
    </div>
  </section>
</template>
