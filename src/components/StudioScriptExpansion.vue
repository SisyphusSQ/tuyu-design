<script setup lang="ts">
import type { ScriptExpansionModel, ScriptExpansionStatus, Tone } from '../types'
import { zhText } from '../utils/zhText'
import StatusChip from './StatusChip.vue'

defineProps<{
  model: ScriptExpansionModel
}>()

const statusTone: Record<ScriptExpansionStatus, Tone> = {
  candidate: 'flow',
  ready: 'app',
  stale: 'risk',
  blocked: 'risk',
}

const statusLabel: Record<ScriptExpansionStatus, string> = {
  candidate: '候选',
  ready: '可生成',
  stale: '已过期',
  blocked: '阻断',
}
</script>

<template>
  <section class="script-expansion-workbench" aria-label="脚本展开画布视图">
    <header class="script-expansion-header">
      <div>
        <p class="eyebrow">Canvas Table View</p>
        <h2>脚本展开与分镜候选</h2>
        <span>把 ScriptScene 展开成画布内宽表，逐行确认后才写入正式 ShotCard。</span>
      </div>
      <div class="script-expansion-actions">
        <button
          v-for="action in model.actions"
          :key="action.label"
          type="button"
          :class="`script-action-${action.tone ?? 'neutral'}`"
        >
          <strong>{{ zhText(action.label) }}</strong>
          <small>{{ zhText(action.meta) }}</small>
        </button>
      </div>
    </header>

    <div class="script-expansion-canvas">
      <aside class="script-side-tools" aria-label="画布工具栏">
        <button type="button">+</button>
        <button type="button">BG</button>
        <button type="button">AI</button>
        <button type="button">H</button>
        <button type="button">?</button>
      </aside>

      <div class="script-table-stage">
        <article class="script-table-frame">
          <div class="script-table-topline">
            <div>
              <h3>{{ zhText(model.title) }}</h3>
              <span>{{ zhText(model.subtitle) }}</span>
            </div>
            <div class="script-view-controls">
              <StatusChip :label="model.viewMode" tone="source" />
              <button type="button">全屏展开</button>
            </div>
          </div>

          <div class="script-table-scroll">
            <table class="script-expansion-table">
              <thead>
                <tr>
                  <th>镜号</th>
                  <th>时长</th>
                  <th>画面描述</th>
                  <th>角色 1</th>
                  <th>角色描述 1</th>
                  <th>角色图 1</th>
                  <th>角色 2</th>
                  <th>状态</th>
                  <th>动作</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in model.rows"
                  :key="row.id"
                  :class="{
                    selected: row.id === model.selectedRowId,
                    blocked: row.status === 'blocked',
                  }"
                >
                  <td>
                    <strong>{{ row.index }}</strong>
                    <small>{{ zhText(row.sourceRange) }}</small>
                  </td>
                  <td>{{ row.durationSeconds }}s</td>
                  <td class="script-description">{{ zhText(row.visualDescription) }}</td>
                  <td>{{ zhText(row.roles[0]?.name ?? '-') }}</td>
                  <td class="script-role-copy">
                    {{ zhText(row.roles[0]?.description ?? '-') }}
                  </td>
                  <td>
                    <span
                      v-if="row.roles[0]"
                      class="script-role-thumb"
                      :class="`script-role-thumb-${row.roles[0].tone}`"
                    >
                      {{ zhText(row.roles[0].referenceLabel) }}
                    </span>
                  </td>
                  <td>
                    <strong>{{ zhText(row.roles[1]?.name ?? '-') }}</strong>
                    <small>{{ zhText(row.roles[1]?.description ?? '') }}</small>
                  </td>
                  <td>
                    <StatusChip :label="statusLabel[row.status]" :tone="statusTone[row.status]" />
                  </td>
                  <td>
                    <button type="button" class="script-row-action">{{ zhText(row.action) }}</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        <div class="script-canvas-trail">
          <div class="script-zoom-pill">
            <button type="button">-</button>
            <strong>{{ model.zoom }}%</strong>
            <button type="button">+</button>
          </div>
          <div class="script-thumb-strip">
            <span
              v-for="thumb in model.thumbnails"
              :key="thumb.label"
              :class="`script-mini-thumb tone-border-${thumb.tone ?? 'neutral'}`"
            >
              {{ zhText(thumb.label) }}
            </span>
          </div>
        </div>
      </div>

      <aside class="script-health-rail" aria-label="脚本展开健康状态">
        <div class="panel-heading compact">
          <h3>行级门禁</h3>
          <StatusChip label="确认后写入" tone="app" />
        </div>
        <ul>
          <li v-for="item in model.healthItems" :key="item.label" :class="`tone-border-${item.tone ?? 'neutral'}`">
            <strong>{{ zhText(item.label) }}</strong>
            <span>{{ zhText(item.meta) }}</span>
          </li>
        </ul>
      </aside>
    </div>
  </section>
</template>
