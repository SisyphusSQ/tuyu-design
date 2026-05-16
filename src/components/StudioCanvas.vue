<script setup lang="ts">
import { computed, ref } from 'vue'
import type { StudioCanvasModel } from '../types'
import { zhText } from '../utils/zhText'
import StatusChip from './StatusChip.vue'
import StudioBottomBar from './StudioBottomBar.vue'
import StudioCanvasNode from './StudioCanvasNode.vue'
import StudioInspector from './StudioInspector.vue'
import StudioLeftRail from './StudioLeftRail.vue'
import StudioThemeToggle from './StudioThemeToggle.vue'

const props = defineProps<{
  model: StudioCanvasModel
}>()

const activeTheme = ref(props.model.theme)

const edgePaths = computed(() =>
  props.model.edges.map((edge) => {
    const source = props.model.nodes.find((node) => node.id === edge.source)
    const target = props.model.nodes.find((node) => node.id === edge.target)
    const sourceX = (source?.x ?? 0) + (source?.width ?? 160)
    const sourceY = (source?.y ?? 0) + (source?.height ?? 96) / 2
    const targetX = target?.x ?? 0
    const targetY = (target?.y ?? 0) + (target?.height ?? 96) / 2
    const midX = (sourceX + targetX) / 2

    return {
      ...edge,
      d: `M ${sourceX} ${sourceY} C ${midX} ${sourceY}, ${midX} ${targetY}, ${targetX} ${targetY}`,
    }
  }),
)
</script>

<template>
  <section class="studio-workbench" :class="`studio-theme-${activeTheme}`" aria-label="图屿 Studio Project Canvas">
    <header class="studio-topbar">
      <div>
        <span>图屿 Studio</span>
        <h2>{{ zhText(model.projectName) }}</h2>
      </div>
      <div class="studio-topbar-actions">
        <StatusChip label="source: docs/design" tone="source" />
        <StatusChip :label="`ProviderMode ${model.providerMode}`" tone="flow" />
        <StatusChip label="Saved 10:23" tone="app" />
        <StudioThemeToggle :mode="activeTheme" :grid-opacity="model.grid.opacity" @select="activeTheme = $event" />
      </div>
    </header>

    <div class="studio-body">
      <StudioLeftRail :model="model" />

      <div class="studio-canvas-shell">
        <div class="studio-canvas-toolbar">
          <div>
            <strong>{{ model.title }}</strong>
            <span>无限画布 / Blueprint / Studio Command / Run/Event/Audit</span>
          </div>
          <div class="studio-toolset">
            <button type="button">Blueprint</button>
            <button type="button">Run</button>
            <button type="button">Review</button>
          </div>
        </div>

        <div
          class="studio-canvas-plane"
          :style="{
            '--studio-grid-size': `${model.grid.size}px`,
            '--studio-grid-opacity': `${model.grid.opacity / 100}`,
          }"
        >
          <svg class="studio-edges" viewBox="0 0 1220 820" aria-hidden="true">
            <defs>
              <marker id="studio-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" />
              </marker>
            </defs>
            <path
              v-for="edge in edgePaths"
              :key="edge.id"
              class="studio-edge"
              :class="edge.status ? `studio-edge-${edge.status}` : undefined"
              :d="edge.d"
              marker-end="url(#studio-arrow)"
            />
          </svg>

          <div
            v-for="frame in model.frames"
            :key="frame.id"
            class="studio-frame"
            :class="`studio-frame-${frame.status}`"
            :style="{
              left: `${frame.x}px`,
              top: `${frame.y}px`,
              width: `${frame.width}px`,
              height: `${frame.height}px`,
            }"
          >
            <strong>{{ zhText(frame.title) }}</strong>
            <span>{{ zhText(frame.subtitle) }}</span>
          </div>

          <StudioCanvasNode
            v-for="node in model.nodes"
            :key="node.id"
            :node="node"
            :selected="node.id === model.selectedNodeId"
          />
        </div>
      </div>

      <StudioInspector :model="model" />
    </div>

    <StudioBottomBar :model="model" />
  </section>
</template>
