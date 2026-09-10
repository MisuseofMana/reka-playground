<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: string;
  }>(),
  { as: "section" },
);
</script>

<template>
  <component :is="as" class="flex flex-col gap-3">
    <slot />
  </component>
</template>
