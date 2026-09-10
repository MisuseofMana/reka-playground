<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  }>(),
  { as: "h1" },
);
</script>

<template>
  <component :is="as">
    <slot v-if="$slots.default"></slot>
    <span v-else> New Dawn Heading </span>
  </component>
</template>
