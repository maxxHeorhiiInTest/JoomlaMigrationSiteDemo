<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import wordmark from '@brand/wordmark-white.png'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import SiteSearch from '@/components/SiteSearch.vue'
import { useLanguage } from '@/composables/useLanguage'
import { useMenuStore } from '@/stores/menu'

const route = useRoute()
const menu = useMenuStore()
const { t, locale, localePath } = useLanguage()
const open = ref(false)
const opened = ref('')

watch(() => route.fullPath, () => {
  open.value = false
  opened.value = ''
})

const home = computed(() => localePath('/'))
const erasmusTo = computed(() => localePath('/international#erasmus-page-title'))
const wordmarkAlt = computed(() => (
  locale.value === 'uk'
    ? 'Національний університет фізичного виховання і спорту України'
    : 'National University of Ukraine on Physical Education and Sport'
))

function toggleGroup(id: string) {
  opened.value = opened.value === id ? '' : id
}

function current(to?: string) {
  if (!to) return false
  const target = localePath(to.split('#')[0])
  if (target === localePath('/')) return route.path === target
  return route.path === target || route.path.startsWith(`${target}/`)
}
</script>

<template>
  <header class="header">
    <div class="container bar">
      <RouterLink class="brand" :to="home">
        <img :src="wordmark" :alt="wordmarkAlt" width="2400" height="524" />
      </RouterLink>
      <SiteSearch />
      <div class="tools">
        <LanguageSwitcher />
        <button
          class="burger"
          type="button"
          :aria-expanded="open"
          aria-controls="site-nav"
          @click="open = !open"
        >
          {{ locale === 'uk' ? 'Меню' : 'Menu' }}
        </button>
      </div>
      <nav id="site-nav" class="menu" :class="{ open }">
        <div v-for="item in menu.items" :key="item.id" class="item" :class="{ current: current(item.to) }">
          <RouterLink v-if="item.to" :to="localePath(item.to)">{{ t(item.label) }}</RouterLink>
          <template v-else>
            <button type="button" :aria-expanded="opened === item.id" @click="toggleGroup(item.id)">
              {{ t(item.label) }}
            </button>
            <div class="panel" :class="{ shown: opened === item.id }">
              <div v-for="group in item.groups" :key="t(group.title)" class="group">
                <p>{{ t(group.title) }}</p>
                <RouterLink v-for="link in group.links" :key="link.to" :to="localePath(link.to)">
                  {{ t(link.label) }}
                </RouterLink>
              </div>
            </div>
          </template>
        </div>
        <RouterLink class="erasmus" :to="erasmusTo">Erasmus+</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: var(--navy);
  box-shadow: inset 0 -3px 0 var(--yellow);
}

.bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 16px;
  min-height: var(--header);
  padding: 12px 0 10px;
}

.tools { display: flex; align-items: center; gap: 8px; }

.brand {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
}

.brand img { width: 168px; height: auto; }

.burger {
  display: none;
  height: 40px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.45);
  background: transparent;
  color: var(--white);
  font-weight: 800;
  cursor: pointer;
}

.menu {
  display: flex;
  align-items: center;
  gap: 2px;
  flex: 1 0 100%;
}

.item { position: relative; }

.item > a,
.item > button {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 10px;
  border: 0;
  background: transparent;
  color: var(--white);
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  cursor: pointer;
}

.item.current > a,
.item.current > button,
.item > a:hover,
.item > button:hover {
  color: var(--white);
  box-shadow: inset 0 -2px 0 var(--yellow);
}

.panel {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: min(760px, 72vw);
  padding: 18px;
  background: var(--white);
  border: 1px solid var(--line);
  border-radius: 18px;
  box-shadow: var(--shadow);
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.item:hover > .panel,
.item:focus-within > .panel { display: grid; }

.group { display: grid; align-content: start; gap: 8px; }

.group p {
  margin: 0 0 4px;
  color: var(--muted);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.group a {
  color: var(--navy);
  text-decoration: none;
  font-weight: 600;
  line-height: 1.35;
}

.group a:hover { color: var(--blue); }

.erasmus {
  display: inline-flex;
  align-items: center;
  height: 40px;
  margin-left: 12px;
  padding: 0 14px;
  border-radius: 999px;
  background: var(--blue);
  color: var(--white);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
}

.erasmus:hover { background: var(--white); color: var(--navy); }

@media (max-width: 1100px) {
  .tools { order: 2; margin-left: auto; }
  .burger { display: inline-flex; }

  .menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-height: calc(100vh - var(--header));
    overflow: auto;
    margin: 0;
    padding: 8px 16px 20px;
    background: var(--navy);
    border-bottom: 3px solid var(--yellow);
    flex: none;
    flex-direction: column;
    align-items: stretch;
  }

  .menu.open { display: flex; }

  .item > a,
  .item > button { width: 100%; justify-content: space-between; font-size: 17px; }

  .panel,
  .item:hover > .panel,
  .item:focus-within > .panel {
    position: static;
    display: none;
    width: auto;
    padding: 4px 0 12px 12px;
    border: 0;
    box-shadow: none;
    grid-template-columns: 1fr;
  }

  .panel.shown { display: grid; }
  .group a { color: var(--white); }
  .group p { color: rgba(255, 255, 255, 0.62); }
  .erasmus { align-self: flex-start; margin: 20px 0 4px; }
}
</style>
