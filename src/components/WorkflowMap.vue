<script setup lang="ts">
import { workflowPages } from '../data/workflowPages'
import StatusChip from './StatusChip.vue'

const steps = workflowPages.map((page, index) => ({
  ...page,
  step: index + 1,
}))
</script>

<template>
  <section class="panel workflow-map">
    <div class="panel-heading">
      <h2>Production Flow Map</h2>
      <StatusChip label="7 review surfaces" tone="flow" />
    </div>
    <div class="flow-steps">
      <a v-for="step in steps" :key="step.slug" class="flow-step" :href="`#/workflow/${step.slug}`">
        <span class="flow-index">{{ step.step }}</span>
        <strong>{{ step.navTitle }}</strong>
        <small>{{ step.systemWrites[0] }}</small>
      </a>
    </div>
  </section>
</template>
