<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import { useLanguage } from '@/composables/useLanguage'

const { locale } = useLanguage()
</script>

<template>
  <div class="shell">
    <a class="skip" href="#content">{{ locale === 'uk' ? 'До змісту' : 'Skip to content' }}</a>
    <AppHeader />
    <main id="content">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped lang="scss">
.shell { min-height: 100vh; display: flex; flex-direction: column; }
main { flex: 1; }
</style>
