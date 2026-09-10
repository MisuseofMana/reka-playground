<script setup lang="ts">
import { computed } from "vue";
import { avatarRecipe } from "./Avatar.recipe";

const props = withDefaults(
  defineProps<{
    name?: string;
    src?: string;
  }>(),
  {
    name: "Sean Yager",
    src: undefined,
  },
);

const classes = avatarRecipe();

const initials = computed(() =>
  props.name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase(),
);
</script>

<template>
  <span :class="classes.root()" role="img" :aria-label="name">
    <img v-if="src" :class="classes.image()" :src="src" alt="" />
    <template v-else>{{ initials }}</template>
  </span>
</template>
