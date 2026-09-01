<script setup lang="ts">
import styles from "./ComposedButton.module.css";

export type ComposedButtonVariant =
  | "base"
  | "brand"
  | "success"
  | "warning"
  | "danger";

withDefaults(
  defineProps<{
    /**
     * Picks the class out of the module. Every value except `base` is a class
     * that `composes: base`, so the lookup returns two class names at once —
     * the variant's colours and the shared button rule.
     */
    variant?: ComposedButtonVariant;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
  }>(),
  {
    variant: "base",
    type: "button",
    disabled: false,
  },
);

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <button :class="styles[variant]" :type="type" :disabled="disabled">
    <slot />
  </button>
</template>
