<script setup lang="ts">
import { Chart } from '@antv/g2'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { StatusDatum } from '../types'
import { zhText } from '../utils/zhText'

const props = withDefaults(
  defineProps<{
    data: StatusDatum[]
    title?: string
  }>(),
  {
    title: '覆盖与状态分布',
  },
)

const container = ref<HTMLDivElement | null>(null)
const renderError = ref('')
const chartData = computed(() =>
  props.data.map((item) => ({
    ...item,
    category: zhText(item.category),
    type: zhText(item.type),
  })),
)
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
      .data(chartData.value)
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
    renderError.value = error instanceof Error ? error.message : 'G2 渲染失败'
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
      <h2>{{ zhText(title) }}</h2>
      <span class="chart-note">由 @antv/g2 渲染</span>
    </div>
    <div ref="container" class="g2-chart" />
    <p v-if="renderError" class="render-error">{{ renderError }}</p>
  </section>
</template>
