<script setup lang="ts">
import { computed } from "vue";
import {
  composedButtonRecipe,
  type ComposedButtonVariant,
} from "./ComposedButton.recipe";

const props = withDefaults(
  defineProps<{
    variant?: ComposedButtonVariant;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
  }>(),
  {
    variant: undefined,
    type: "button",
    disabled: false,
  },
);

const classes = computed(() =>
  composedButtonRecipe({ variant: props.variant }),
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
