<script setup lang="ts">
import { richTextRecipe } from "./RichText.recipe";

const props = defineProps<{
  /** HTML string from the editor. Sanitise this before rendering real user input. */
  html: string;
  class?: string;
}>();

const classes = richTextRecipe();
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div :class="classes.root({ class: props.class })" v-html="props.html" />
</template>
