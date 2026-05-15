<script setup lang="ts">
import type { DesignModule } from '../types'
import { zhSourcePath, zhText } from '../utils/zhText'
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
      <h2>来源文档</h2>
      <StatusChip :label="`${module.subdocuments.length + 1} 个标记文档锚点`" tone="source" />
    </div>

    <div class="source-readme" :id="`${module.slug}-readme`">
      <div>
        <strong>模块说明</strong>
        <code>{{ zhSourcePath(module.readmeSourcePath) }}</code>
      </div>
      <StatusChip label="总览来源" tone="source" />
    </div>

    <div class="doc-card-grid">
      <article
        v-for="subdocument in module.subdocuments"
        :id="subdocument.id"
        :key="subdocument.id"
        class="doc-card"
      >
        <div class="doc-card-head">
          <h3>{{ zhText(subdocument.title) }}</h3>
          <button type="button" class="anchor-button" @click="scrollToAnchor(subdocument.id)">#</button>
        </div>
        <code>{{ zhSourcePath(subdocument.sourcePath) }}</code>
        <p>{{ zhText(subdocument.responsibility) }}</p>

        <div class="doc-card-section">
          <strong>关键规则</strong>
          <ul>
            <li v-for="rule in subdocument.keyRules" :key="rule">{{ zhText(rule) }}</li>
          </ul>
        </div>

        <div class="doc-card-section two-col">
          <div>
            <strong>错误</strong>
            <ul>
              <li v-for="error in subdocument.errors" :key="error">{{ zhText(error) }}</li>
            </ul>
          </div>
          <div>
            <strong>恢复</strong>
            <ul>
              <li v-for="recovery in subdocument.recovery" :key="recovery">{{ zhText(recovery) }}</li>
            </ul>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
