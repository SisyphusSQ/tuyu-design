<script setup lang="ts">
import { Chart } from '@antv/g2'
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { StatusDatum } from '../types'

const props = withDefaults(
  defineProps<{
    data: StatusDatum[]
    title?: string
  }>(),
  {
    title: 'Coverage / State Distribution',
  },
)

const container = ref<HTMLDivElement | null>(null)
const renderError = ref('')
type ChartApi = {
  destroy?: () => void
  interval: () => {
    data: (data: StatusDatum[]) => ChartMarkApi
  }
  render: () => Promise<unknown> | unknown
}

type ChartMarkApi = {
  encode: (channel: string, field: string) => ChartMarkApi
  style: (key: string, value: string | number) => ChartMarkApi
  axis: (channel: string, options: Record<string, unknown>) => ChartMarkApi
  legend: (channel: string, options: Record<string, unknown>) => ChartMarkApi
  tooltip: (options: Record<string, unknown>) => ChartMarkApi
}

let chart: ChartApi | null = null

const renderChart = async () => {
  await nextTick()
  if (!container.value) return

  chart?.destroy?.()
  renderError.value = ''

  try {
    chart = new Chart({
      container: container.value,
      autoFit: true,
      height: 260,
      padding: [24, 18, 52, 56],
    } as never) as unknown as ChartApi

    chart
      .interval()
      .data(props.data)
      .encode('x', 'category')
      .encode('y', 'value')
      .encode('color', 'type')
      .style('radiusTopLeft', 4)
      .style('radiusTopRight', 4)
      .axis('x', { title: false, labelTransform: 'rotate(0)' })
      .axis('y', { title: false })
      .legend('color', { position: 'top', itemLabelFill: '#475569' })
      .tooltip({ title: 'category' })

    await chart.render()
  } catch (error) {
    renderError.value = error instanceof Error ? error.message : 'G2 render failed'
  }
}

onMounted(() => {
  void renderChart()
})

watch(
  () => props.data,
  () => {
    void renderChart()
  },
)

onBeforeUnmount(() => {
  chart?.destroy?.()
})
</script>

<template>
  <section class="panel antv-panel">
    <div class="panel-heading">
      <h2>{{ title }}</h2>
      <span class="chart-note">Rendered with @antv/g2</span>
    </div>
    <div ref="container" class="g2-chart" />
    <p v-if="renderError" class="render-error">{{ renderError }}</p>
  </section>
</template>
