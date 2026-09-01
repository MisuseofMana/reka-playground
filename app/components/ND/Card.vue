<script setup lang="ts">
import { computed } from "vue";
import defaultStyles from "./Card.module.css";

const props = withDefaults(
  defineProps<{
    /**
     * Hand the card a different CSS Module to restyle it. Merged over the
     * card's own classes, so a module that only defines `.root` restyles the
     * surface and leaves the header, body, and footer alone.
     */
    styles?: Readonly<Record<string, string>>;
  }>(),
  { styles: undefined },
);

const s = computed(() => ({ ...defaultStyles, ...props.styles }));

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
  <article :class="s.root">
    <header v-if="$slots.header" :class="s.header">
      <slot name="header" />
    </header>

    <div :class="s.body">
      <slot />
    </div>

    <footer v-if="$slots.footer" :class="s.footer">
      <slot name="footer" />
    </footer>
  </article>
</template>
