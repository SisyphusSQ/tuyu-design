<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import AppShell from './components/AppShell.vue'
import { designModuleMap } from './data/designModules'
import { workflowPageMap } from './data/workflowPages'
import DesignModulePage from './pages/DesignModulePage.vue'
import NotFoundPage from './pages/NotFoundPage.vue'
import WorkflowPage from './pages/WorkflowPage.vue'

type RouteKind = 'workflow' | 'module' | 'not-found'

interface RouteState {
  kind: RouteKind
  slug: string
}

const normalizeHash = (): RouteState => {
  const raw = window.location.hash.replace(/^#\/?/, '')
  const [kind, slug] = raw.split('/')

  if (!raw) {
    return { kind: 'workflow', slug: 'overview' }
  }

  if (kind === 'workflow' && slug && workflowPageMap.has(slug)) {
    return { kind: 'workflow', slug }
  }

  if (kind === 'module' && slug && designModuleMap.has(slug)) {
    return { kind: 'module', slug }
  }

  return { kind: 'not-found', slug: raw }
}

const route = ref<RouteState>(normalizeHash())

const currentWorkflow = computed(() =>
  route.value.kind === 'workflow' ? workflowPageMap.get(route.value.slug) : undefined,
)

const currentModule = computed(() =>
  route.value.kind === 'module' ? designModuleMap.get(route.value.slug) : undefined,
)

const handleHashChange = () => {
  route.value = normalizeHash()
  window.scrollTo({ top: 0, behavior: 'auto' })
}

onMounted(() => {
  if (!window.location.hash) {
    window.location.hash = '#/workflow/overview'
  }
  window.addEventListener('hashchange', handleHashChange)
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', handleHashChange)
})
</script>

<template>
  <AppShell :active-kind="route.kind" :active-slug="route.slug">
    <WorkflowPage v-if="currentWorkflow" :page="currentWorkflow" />
    <DesignModulePage v-else-if="currentModule" :module="currentModule" />
    <NotFoundPage v-else />
  </AppShell>
</template>
