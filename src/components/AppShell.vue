<script setup lang="ts">
import { designModules } from '../data/designModules'
import { prototypeRoot, prototypeStats, sourceRoot } from '../data/mockProject'
import { workflowPages } from '../data/workflowPages'
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
          <strong>图屿 Studio</strong>
          <span>Design Prototype</span>
        </div>
      </div>

      <nav class="nav-section" aria-label="Production Flow">
        <p>Production Flow</p>
        <a
          v-for="page in workflowPages"
          :key="page.slug"
          :href="`#/workflow/${page.slug}`"
          :class="{ active: activeKind === 'workflow' && activeSlug === page.slug }"
        >
          {{ page.navTitle }}
        </a>
      </nav>

      <nav class="nav-section" aria-label="Design Modules">
        <p>Design Modules</p>
        <a
          v-for="module in designModules"
          :key="module.slug"
          :href="`#/module/${module.slug}`"
          :class="{ active: activeKind === 'module' && activeSlug === module.slug }"
        >
          {{ module.navTitle }}
        </a>
      </nav>
    </aside>

    <div class="main-frame">
      <header class="topbar">
        <div>
          <strong>Tuyu Studio Design Visualization</strong>
          <span>{{ prototypeRoot }}</span>
        </div>
        <div class="topbar-status">
          <StatusChip label="source: docs/design only" tone="source" />
          <StatusChip label="prototype: review server" tone="flow" />
          <StatusChip label="no backend" tone="app" />
        </div>
      </header>

      <main class="content-shell">
        <section class="source-strip">
          <div>
            <span>Source Label</span>
            <code>{{ sourceRoot }}</code>
          </div>
          <div class="stats-row">
            <div v-for="stat in prototypeStats" :key="stat.label" class="stat-pill">
              <strong>{{ stat.value }}</strong>
              <span>{{ stat.label }}</span>
            </div>
          </div>
        </section>
        <slot />
      </main>
    </div>
  </div>
</template>
