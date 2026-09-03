<script setup lang="ts">
import { computed } from "vue";

export type ComplexButtonLooksLike =
  | "primary"
  | "secondary"
  | "ghost"
  | "success"
  | "danger";

export type ComplexButtonSize = "sm" | "md" | "lg";

const props = withDefaults(
  defineProps<{
    looksLike?: ComplexButtonLooksLike;
    size?: ComplexButtonSize;
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

const base =
  "inline-flex items-center justify-center rounded-full font-semibold tracking-wide cursor-pointer outline-none transition-[filter,box-shadow,translate] duration-150 ease-in-out hover:brightness-110 hover:-translate-y-px focus-visible:ring-3 focus-visible:ring-violet-200 disabled:opacity-50 disabled:pointer-events-none";

const looks: Record<ComplexButtonLooksLike, string> = {
  primary: "bg-violet-600 text-white",
  secondary: "bg-slate-200 text-slate-700",
  ghost:
    "bg-transparent text-violet-700 ring-1 ring-inset ring-violet-300 hover:bg-violet-50",
  success: "bg-emerald-500 text-emerald-50",
  danger: "bg-rose-500 text-white",
};

const sizes: Record<ComplexButtonSize, string> = {
  sm: "gap-1.5 px-3 py-1 text-xs/5",
  md: "gap-2 px-5 py-2 text-sm/5",
  lg: "gap-2.5 px-7 py-3 text-base/6",
};

const classes = computed(() => {
  const list = [base, looks[props.looksLike], sizes[props.size]];

  if (props.fullWidth) list.push("w-full");

  if (props.looksLike === "primary" && props.size === "lg") {
    list.push("shadow-lg shadow-violet-600/30");
  }
  if (
    (props.looksLike === "danger" || props.looksLike === "success") &&
    props.size === "lg"
  ) {
    list.push("uppercase");
  }

  return list.join(" ");
});

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <button :class="classes" :type="type" :disabled="disabled">
    <slot />
  </button>
</template>
