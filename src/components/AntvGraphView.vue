<script setup lang="ts">
import { Graph } from '@antv/g6'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { creativeGraphEdges, creativeGraphNodes } from '../data/mockProject'

const container = ref<HTMLDivElement | null>(null)
const renderError = ref('')
let graphInstance: { destroy?: () => void; resize?: (width: number, height: number) => void } | null = null
let observer: ResizeObserver | null = null

const toneFill: Record<string, string> = {
  source: '#eaf2ff',
  app: '#eaf8f0',
  flow: '#fff5db',
  risk: '#fff0f4',
  neutral: '#f8fafc',
}

const toneStroke: Record<string, string> = {
  source: '#2f6fce',
  app: '#2e9d64',
  flow: '#bd7a12',
  risk: '#cb2d5b',
  neutral: '#94a3b8',
}

const renderGraph = async () => {
  await nextTick()
  if (!container.value) return

  const width = Math.max(container.value.clientWidth, 720)
  const height = Math.max(container.value.clientHeight, 360)

  graphInstance?.destroy?.()
  renderError.value = ''

  try {
    graphInstance = new Graph({
      container: container.value,
      width,
      height,
      data: {
        nodes: creativeGraphNodes.map((node) => ({
          id: node.id,
          data: node,
        })),
        edges: creativeGraphEdges.map((edge) => ({
          source: edge.source,
          target: edge.target,
          data: edge,
        })),
      },
      node: {
        type: 'rect',
        style: {
          size: [138, 48],
          radius: 7,
          fill: (datum: { data?: { tone?: string } }) => toneFill[datum.data?.tone ?? 'neutral'],
          stroke: (datum: { data?: { tone?: string } }) => toneStroke[datum.data?.tone ?? 'neutral'],
          lineWidth: 1.4,
          labelText: (datum: { data?: { label?: string } }) => datum.data?.label ?? '',
          labelFill: '#0f172a',
          labelFontSize: 14,
          labelFontWeight: 700,
          badge: true,
          badgeText: (datum: { data?: { status?: string } }) => datum.data?.status ?? '',
          badgePlacement: 'bottom',
          badgeFill: '#ffffff',
          badgeStroke: '#cbd5e1',
          badgeFontSize: 11,
        },
      },
      edge: {
        type: 'line',
        style: {
          stroke: '#94a3b8',
          lineWidth: 1.2,
          endArrow: true,
          labelText: (datum: { data?: { label?: string } }) => datum.data?.label ?? '',
          labelFill: '#475569',
          labelFontSize: 12,
          labelBackground: true,
          labelBackgroundFill: '#ffffff',
        },
      },
      layout: {
        type: 'dagre',
        rankdir: 'LR',
        nodesep: 24,
        ranksep: 56,
      },
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'click-select'],
    } as never)

    await (graphInstance as { render: () => Promise<void> }).render()
  } catch (error) {
    renderError.value = error instanceof Error ? error.message : 'G6 render failed'
  }
}

onMounted(() => {
  void renderGraph()
  if (container.value) {
    observer = new ResizeObserver(([entry]) => {
      if (!entry || !graphInstance?.resize) return
      graphInstance.resize(Math.max(entry.contentRect.width, 720), Math.max(entry.contentRect.height, 360))
    })
    observer.observe(container.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
  graphInstance?.destroy?.()
})
</script>

<template>
  <section class="panel antv-panel">
    <div class="panel-heading">
      <h2>Creative Graph Example</h2>
      <span class="chart-note">Rendered with @antv/g6</span>
    </div>
    <div ref="container" class="g6-canvas" />
    <p v-if="renderError" class="render-error">{{ renderError }}</p>
  </section>
</template>
