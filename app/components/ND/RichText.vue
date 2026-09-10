<script setup lang="ts">
import { richTextRecipe } from "./RichText.recipe";

const props = withDefaults(
  defineProps<{
    html?: string;
    class?: string;
  }>(),
  {
    html: "<h2>Heading</h2><p>This is a <strong>rich text</strong> block with <a href='#'>a link</a>.</p><ul><li>First item</li><li>Second item</li></ul>",
  },
);

const classes = richTextRecipe();
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div :class="classes.root({ class: props.class })" v-html="props.html" />
</template>
