<script setup lang="ts">
const route = useRoute();

const href = computed(
  () =>
    `https://github.com/MisuseofMana/reka-playground/blob/main/app/pages${route.path === "/" ? "/index" : route.path}.vue`,
);
</script>

<template>
  <a
    :href="href"
    target="_blank"
    class="self-start rounded-lg bg-brand-100 px-2.5 py-1 font-mono text-xs text-brand-600 transition hover:bg-brand-200"
  >
    View source on GitHub &nearr;
  </a>
</template>
