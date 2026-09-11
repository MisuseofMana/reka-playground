<script setup lang="ts">
import { cardRecipe } from "./Card.recipe";

const classes = cardRecipe();

defineSlots<{
  header?: () => unknown;
  default?: () => unknown;
  footer?: () => unknown;
}>();
</script>

<template>
  <article :class="classes.root()">
    <header v-if="$slots.header" :class="classes.header()">
      <slot name="header"></slot>
    </header>

    <div v-if="$slots.default" :class="classes.body()">
      <slot></slot>
    </div>

    <footer v-if="$slots.footer" :class="classes.footer()">
      <slot name="footer"></slot>
    </footer>
  </article>
</template>
