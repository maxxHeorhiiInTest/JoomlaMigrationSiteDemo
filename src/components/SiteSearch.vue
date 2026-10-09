<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLanguage } from '@/composables/useLanguage'
import { kindLabel, searchContent } from '@/data/search'

const route = useRoute()
const router = useRouter()
const { t, locale, localePath } = useLanguage()
const query = ref('')
const open = ref(false)

watch(
  () => route.fullPath,
  () => {
    open.value = false
    const value = route.query.q
    const onSearch = route.path === localePath('/search')
    query.value = onSearch && typeof value === 'string' ? value : query.value
  },
  { immediate: true },
)

const suggestions = computed(() => (open.value ? searchContent(query.value).slice(0, 6) : []))
const ready = computed(() => query.value.trim().length >= 2)

function submit() {
  const q = query.value.trim()
  open.value = false
  void router.push({ path: localePath('/search'), query: q ? { q } : {} })
}

function go(to: string) {
  open.value = false
  void router.push(localePath(to))
}
</script>

<template>
  <form class="search" role="search" @submit.prevent="submit">
    <label class="sr" for="site-search">
      {{ locale === 'uk' ? 'Пошук по сайту' : 'Search the site' }}
    </label>
    <div class="field">
    <input
      id="site-search"
      v-model="query"
      type="search"
      autocomplete="off"
      :placeholder="locale === 'uk' ? 'Пошук' : 'Search'"
      @focus="open = true"
      @input="open = true"
      @keydown.esc="open = false"
    />
    <button type="submit">{{ locale === 'uk' ? 'Знайти' : 'Search' }}</button>
    </div>
    <ul v-if="open && ready" @mousedown.prevent>
      <li v-for="hit in suggestions" :key="hit.id">
        <button type="button" @click="go(hit.to)">
          <span>{{ t(kindLabel[hit.kind]) }}</span>
          {{ t(hit.title) }}
        </button>
      </li>
      <li>
        <button type="submit" class="all">
          {{ locale === 'uk' ? 'Усі результати' : 'All results' }}
        </button>
      </li>
    </ul>
  </form>
</template>

<style scoped lang="scss">
.search { position: relative; flex: 0 0 220px; width: 220px; margin-left: auto; }
.field { display: flex; }

input {
  width: 100%;
  min-width: 0;
  height: 34px;
  padding: 0 12px;
  border: 0;
  border-radius: 999px 0 0 999px;
  background: var(--white);
  color: var(--navy);
  font: inherit;
  font-size: 14px;
  font-weight: 600;
}

input::placeholder { color: var(--navy); opacity: 0.72; }
input:focus { outline: 2px solid var(--blue); outline-offset: 2px; }

.field > button {
  height: 34px;
  padding: 0 12px;
  border: 0;
  border-radius: 0 999px 999px 0;
  background: var(--blue);
  color: var(--white);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

ul {
  position: absolute;
  z-index: 30;
  top: calc(100% + 8px);
  right: 0;
  width: 320px;
  margin: 0;
  padding: 8px;
  list-style: none;
  background: var(--white);
  border-radius: 16px;
  box-shadow: var(--shadow);
}

li button {
  width: 100%;
  display: grid;
  gap: 2px;
  padding: 8px 10px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: var(--navy);
  text-align: left;
  font-weight: 700;
  cursor: pointer;
}

li button:hover { background: var(--soft); }

span {
  color: var(--blue);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.all { color: var(--blue); }

.sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

@media (max-width: 1100px) {
  .search { order: 3; margin-left: 0; }
  ul { right: auto; left: 0; width: min(320px, calc(100vw - 32px)); }
}
</style>
