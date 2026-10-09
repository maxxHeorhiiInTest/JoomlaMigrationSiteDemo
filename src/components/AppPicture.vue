<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string
  alt: string
  width: number
  height: number
  eager?: boolean
  sizes?: string
}>(), {
  eager: false,
  sizes: '(min-width: 1024px) 640px, 100vw',
})

const base = `/media/${props.name}`
</script>

<template>
  <picture class="picture">
    <source
      type="image/avif"
      :srcset="`${base}-800.avif 800w, ${base}-1600.avif 1600w`"
      :sizes="sizes"
    />
    <source
      type="image/webp"
      :srcset="`${base}-800.webp 800w, ${base}-1600.webp 1600w`"
      :sizes="sizes"
    />
    <img
      :src="`${base}-800.jpg`"
      :srcset="`${base}-800.jpg 800w, ${base}-1600.jpg 1600w`"
      :sizes="sizes"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
    />
  </picture>
</template>

<style scoped lang="scss">
.picture,
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.picture { display: block; }
</style>
