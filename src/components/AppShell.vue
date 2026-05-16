<script setup lang="ts">
import { designModules } from '../data/designModules'
import { prototypeRoot, prototypeStats, sourceRoot } from '../data/mockProject'
import { workflowPages } from '../data/workflowPages'
import { zhSourcePath, zhText } from '../utils/zhText'
import StatusChip from './StatusChip.vue'

defineProps<{
  activeKind: 'workflow' | 'module' | 'not-found'
  activeSlug: string
}>()
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand-block">
        <div class="brand-mark">屿</div>
        <div>
          <strong>图屿工作室</strong>
          <span>Studio Canvas</span>
        </div>
      </div>

      <nav class="nav-section" aria-label="Studio 页面">
        <p>Studio 页面</p>
        <a
          v-for="page in workflowPages"
          :key="page.slug"
          :href="`#/workflow/${page.slug}`"
          :class="{ active: activeKind === 'workflow' && activeSlug === page.slug }"
        >
          {{ zhText(page.navTitle) }}
        </a>
      </nav>

      <nav class="nav-section" aria-label="设计模块">
        <p>设计模块</p>
        <a
          v-for="module in designModules"
          :key="module.slug"
          :href="`#/module/${module.slug}`"
          :class="{ active: activeKind === 'module' && activeSlug === module.slug }"
        >
          {{ zhText(module.navTitle) }}
        </a>
      </nav>
    </aside>

    <div class="main-frame">
      <header class="topbar">
        <div>
          <strong>图屿 Studio 视觉原型</strong>
          <span>{{ zhSourcePath(prototypeRoot) }}</span>
        </div>
        <div class="topbar-status">
          <StatusChip label="来源：仅 docs/design" tone="source" />
          <StatusChip label="Project Canvas" tone="flow" />
          <StatusChip label="静态评审" tone="app" />
        </div>
      </header>

      <main class="content-shell">
        <section class="source-strip">
          <div>
            <span>来源标识</span>
            <code>{{ zhSourcePath(sourceRoot) }}</code>
          </div>
          <div class="stats-row">
            <div v-for="stat in prototypeStats" :key="stat.label" class="stat-pill">
              <strong>{{ stat.value }}</strong>
              <span>{{ zhText(stat.label) }}</span>
            </div>
          </div>
        </section>
        <slot />
      </main>
    </div>
  </div>
</template>
