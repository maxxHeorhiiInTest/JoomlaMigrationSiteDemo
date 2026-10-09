<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

const props = defineProps<{ page: number; pages: number }>()
const emit = defineEmits<{ go: [page: number] }>()
const { locale } = useLanguage()

const numbers = computed(() => Array.from({ length: props.pages }, (_, index) => index + 1))
const prev = computed(() => (locale.value === 'uk' ? 'Назад' : 'Previous'))
const next = computed(() => (locale.value === 'uk' ? 'Далі' : 'Next'))
</script>

<template>
  <nav v-if="pages > 1" class="pager" :aria-label="locale === 'uk' ? 'Сторінки' : 'Pages'">
    <button type="button" :disabled="page === 1" @click="emit('go', page - 1)">{{ prev }}</button>
    <button
      v-for="number in numbers"
      :key="number"
      type="button"
      :class="{ current: number === page }"
      :aria-current="number === page ? 'page' : undefined"
      @click="emit('go', number)"
    >
      {{ number }}
    </button>
    <button type="button" :disabled="page === pages" @click="emit('go', page + 1)">{{ next }}</button>
  </nav>
</template>

<style scoped lang="scss">
.pager {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 28px;
}

button {
  min-width: 44px;
  height: 44px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--white);
  color: var(--navy);
  font-weight: 600;
  cursor: pointer;
}

button:disabled { opacity: 0.4; cursor: default; }
.current { background: var(--navy); color: var(--white); border-color: var(--navy); }
</style>
