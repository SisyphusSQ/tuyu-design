<script setup lang="ts">
import type { DependencySection } from '../types'
import { zhText } from '../utils/zhText'
import StatusChip from './StatusChip.vue'

defineProps<{
  sections: DependencySection[]
}>()
</script>

<template>
  <section class="dependency-matrix">
    <article
      v-for="section in sections"
      :key="section.title"
      class="panel dependency-section"
    >
      <div class="panel-heading">
        <div>
          <h2>{{ zhText(section.title) }}</h2>
          <p class="dependency-summary">{{ zhText(section.description) }}</p>
        </div>
        <StatusChip :label="`${section.rows.length} 项`" tone="flow" />
      </div>

      <div class="dependency-table" role="table" :aria-label="zhText(section.title)">
        <div class="dependency-row dependency-head" role="row">
          <span role="columnheader">依赖 / SDK</span>
          <span role="columnheader">阶段</span>
          <span role="columnheader">用途</span>
        </div>
        <div
          v-for="row in section.rows"
          :key="`${section.title}-${row.name}`"
          class="dependency-row"
          :class="`tone-border-${row.tone ?? 'neutral'}`"
          role="row"
        >
          <strong role="cell"><code>{{ row.name }}</code></strong>
          <span role="cell">
            <StatusChip :label="zhText(row.stage)" :tone="row.tone ?? 'neutral'" />
          </span>
          <span role="cell">{{ zhText(row.purpose) }}</span>
        </div>
      </div>
    </article>
  </section>
</template>
