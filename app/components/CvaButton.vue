<script setup lang="ts">
import { computed } from "vue";
import {
  cvaButton,
  type CvaButtonLooksLike,
  type CvaButtonSize,
} from "./CvaButton.recipe";

const props = withDefaults(
  defineProps<{
    looksLike?: CvaButtonLooksLike;
    size?: CvaButtonSize;
    fullWidth?: boolean;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
  }>(),
  {
    // Left undefined so cva's own `defaultVariants` decide. Repeating the
    // defaults here would mean two places to change them, and they would
    // silently drift.
    looksLike: undefined,
    size: undefined,
    fullWidth: undefined,
    type: "button",
    disabled: false,
  },
);

const classes = computed(() =>
  cvaButton({
    looksLike: props.looksLike,
    size: props.size,
    fullWidth: props.fullWidth,
  }),
);

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <!-- Single root, so a `class` written on the tag falls through and Vue
       appends it to this list. Appending is not the same as overriding — see
       the last section of the page for where that bites. -->
  <button :class="classes" :type="type" :disabled="disabled">
    <slot />
  </button>
</template>
