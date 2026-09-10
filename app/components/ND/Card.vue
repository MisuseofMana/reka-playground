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
      <slot name="header"></slot>
    </header>
    <header :class="classes.header()" v-else>New Dawn Card Header</header>

    <div v-if="$slots.default" :class="classes.body()">
      <slot></slot>
    </div>
    <div :class="classes.body()" v-else>New Dawn Card Body</div>

    <footer v-if="$slots.footer" :class="classes.footer()">
      <slot name="footer"></slot>
    </footer>
    <span v-else> New Dawn Card Footer </span>
  </article>
</template>
