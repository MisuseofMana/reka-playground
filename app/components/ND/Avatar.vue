<script setup lang="ts">
import { computed } from "vue";
import styles from "./Avatar.module.css";

const props = withDefaults(
  defineProps<{
    name: string;
    /** Falls back to the name's initials when omitted. */
    src?: string;
  }>(),
  { src: undefined },
);

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
  <span :class="styles.root" role="img" :aria-label="name">
    <img v-if="src" :class="styles.image" :src="src" alt="" />
    <template v-else>{{ initials }}</template>
  </span>
</template>
