<script setup lang="ts">
import { workflowPages } from '../data/workflowPages'
import { zhText } from '../utils/zhText'
import StatusChip from './StatusChip.vue'

const steps = workflowPages.map((page, index) => ({
  ...page,
  step: index + 1,
}))
</script>

<template>
  <section class="panel workflow-map">
    <div class="panel-heading">
      <h2>生产流程地图</h2>
      <StatusChip label="7 个评审页面" tone="flow" />
    </div>
    <div class="flow-steps">
      <a v-for="step in steps" :key="step.slug" class="flow-step" :href="`#/workflow/${step.slug}`">
        <span class="flow-index">{{ step.step }}</span>
        <strong>{{ zhText(step.navTitle) }}</strong>
        <small>{{ zhText(step.systemWrites[0]) }}</small>
      </a>
    </div>
  </section>
</template>
