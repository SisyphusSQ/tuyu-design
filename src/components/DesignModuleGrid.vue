<script setup lang="ts">
import type { DesignModule } from '../types'
import StatusChip from './StatusChip.vue'

defineProps<{
  module: DesignModule
}>()

const scrollToAnchor = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section class="panel">
    <div class="panel-heading">
      <h2>Source Documents</h2>
      <StatusChip :label="`${module.subdocuments.length + 1} markdown anchors`" tone="source" />
    </div>

    <div class="source-readme" :id="`${module.slug}-readme`">
      <div>
        <strong>Module README</strong>
        <code>{{ module.readmeSourcePath }}</code>
      </div>
      <StatusChip label="overview source" tone="source" />
    </div>

    <div class="doc-card-grid">
      <article
        v-for="subdocument in module.subdocuments"
        :id="subdocument.id"
        :key="subdocument.id"
        class="doc-card"
      >
        <div class="doc-card-head">
          <h3>{{ subdocument.title }}</h3>
          <button type="button" class="anchor-button" @click="scrollToAnchor(subdocument.id)">#</button>
        </div>
        <code>{{ subdocument.sourcePath }}</code>
        <p>{{ subdocument.responsibility }}</p>

        <div class="doc-card-section">
          <strong>Key Rules</strong>
          <ul>
            <li v-for="rule in subdocument.keyRules" :key="rule">{{ rule }}</li>
          </ul>
        </div>

        <div class="doc-card-section two-col">
          <div>
            <strong>Errors</strong>
            <ul>
              <li v-for="error in subdocument.errors" :key="error">{{ error }}</li>
            </ul>
          </div>
          <div>
            <strong>Recovery</strong>
            <ul>
              <li v-for="recovery in subdocument.recovery" :key="recovery">{{ recovery }}</li>
            </ul>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
