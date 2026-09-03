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
    looksLike: undefined,
    size: undefined,
    fullWidth: undefined,
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
    <slot />
  </button>
</template>
