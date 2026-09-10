<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    layout?: "row" | "stack";
  }>(),
  { layout: "row" },
);
</script>

<template>
  <div
    :class="[
      'rounded-2xl border border-brand-200 px-5 py-6',
      props.layout === 'stack'
        ? 'flex flex-col gap-4 bg-brand-50/30'
        : 'flex flex-wrap items-center gap-3 bg-white',
    ]"
  >
    <slot />
  </div>
</template>
