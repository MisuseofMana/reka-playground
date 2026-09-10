<script setup lang="ts">
import { computed } from "vue";
import {
  buttonRecipe,
  type NDButtonLooksLike,
  type NDButtonSize,
} from "./Button.recipe";

const props = withDefaults(
  defineProps<{
    looksLike?: NDButtonLooksLike;
    size?: NDButtonSize;
    fullWidth?: boolean;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
  }>(),
  {
    looksLike: "primary",
    size: "md",
    fullWidth: false,
    type: "button",
    disabled: false,
  },
);

const classes = computed(() =>
  buttonRecipe({
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
  <button :class="classes" :type="type" :disabled="disabled">
    <slot v-if="$slots.default"></slot>
    <span v-else> New Dawn Button </span>
  </button>
</template>
