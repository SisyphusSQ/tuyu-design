<script setup lang="ts">
import { computed } from 'vue'
import type { StudioCanvasModel, StudioCanvasNode } from '../types'
import { zhText } from '../utils/zhText'
import StatusChip from './StatusChip.vue'

const props = defineProps<{
  model: StudioCanvasModel
}>()

const fallbackNode: StudioCanvasNode = {
  id: 'empty',
  title: '未选择节点',
  subtitle: '请选择画布对象',
  category: 'organizer',
  status: 'ready',
  source: 'system',
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  badges: [],
  meta: 'empty selection',
}

const selected = computed<StudioCanvasNode>(
  () => props.model.nodes.find((node) => node.id === props.model.selectedNodeId) ?? props.model.nodes[0] ?? fallbackNode,
)
</script>

<template>
  <aside class="studio-inspector" aria-label="Inspector">
    <div class="studio-panel-head">
      <div>
        <span>Inspector</span>
        <h3>{{ zhText(selected.title) }}</h3>
      </div>
      <StatusChip :label="zhText(selected.status)" tone="flow" />
    </div>

    <div class="studio-inspector-tabs">
      <button class="active" type="button">属性</button>
      <button type="button">任务</button>
      <button type="button">Review</button>
      <button type="button">审计</button>
    </div>

    <dl class="studio-inspector-list">
      <div>
        <dt>来源</dt>
        <dd>{{ selected.source }} / {{ zhText(selected.meta) }}</dd>
      </div>
      <div>
        <dt>ProviderMode</dt>
        <dd>{{ model.providerMode }}</dd>
      </div>
      <div>
        <dt>输出契约</dt>
        <dd>ShotPromptSchema v1，确认后写入 PromptObject</dd>
      </div>
      <div>
        <dt>恢复语义</dt>
        <dd>失败保留候选，不覆盖锁定对象；用户可接管或拒绝。</dd>
      </div>
    </dl>

    <section class="studio-health-card">
      <h3>任务 / 健康</h3>
      <ul>
        <li v-for="item in model.healthItems" :key="item.label">
          <span>{{ zhText(item.label) }}</span>
          <small>{{ zhText(item.meta) }}</small>
        </li>
      </ul>
    </section>
  </aside>
</template>
