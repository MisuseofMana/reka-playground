<script setup lang="ts">
import { cardRecipe } from "./Card.recipe";

const classes = cardRecipe();

defineSlots<{
  /** Sits above the body, laid out as a row. */
  header?: () => unknown;
  /** The card's main content. */
  default?: () => unknown;
  /** Action row, right-aligned. Omitted entirely when unused. */
  footer?: () => unknown;
}>();
</script>

<template>
  <article :class="classes.root()">
    <header v-if="$slots.header" :class="classes.header()">
      <slot name="header" />
    </header>

    <div :class="classes.body()">
      <slot />
    </div>

    <footer v-if="$slots.footer" :class="classes.footer()">
      <slot name="footer" />
    </footer>
  </article>
</template>
