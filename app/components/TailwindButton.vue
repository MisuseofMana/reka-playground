<script setup lang="ts">
import { computed } from "vue";

/**
 * The Tailwind counterpart to <ComposedButton>. Same DOM, same variants, but
 * the styling lives in class *strings* instead of a CSS Module, which means the
 * parent can reach in and swap them.
 *
 * The trick is not to hand the parent one big class string to append to. Two
 * Tailwind utilities from the same family — `bg-slate-200` and `bg-violet-600` —
 * have identical specificity, so which one wins is decided by their order in
 * the generated stylesheet, not by their order in the class attribute. Naive
 * appending is a coin flip.
 *
 * So the recipe is split into named groups and an override *replaces* a whole
 * group rather than appending to it. Exactly one `bg-*` reaches the DOM, so
 * there is nothing to resolve. That is the same guarantee `composes: base`
 * gives in the CSS Module version — and it is why no tailwind-merge is needed.
 */

/** The parts of the button a parent can address independently. */
export type TailwindButtonSlot =
  | "layout"
  | "shape"
  | "typography"
  | "surface"
  | "states";

export type TailwindButtonRecipe = Partial<Record<TailwindButtonSlot, string>>;

export type TailwindButtonVariant =
  | "base"
  | "brand"
  | "success"
  | "warning"
  | "danger";

/* Everything that makes it a button, grouped so each group owns one concern and
   can be replaced without disturbing the others. Compare ComposedButton.module.css
   `.base` — same declarations, one layer of indirection added. */
const recipe: Required<TailwindButtonRecipe> = {
  layout: "inline-flex items-center justify-center px-5 py-2",
  shape: "rounded-full border-0",
  typography: "text-sm/5 font-semibold tracking-wide",
  surface: "bg-slate-200 text-slate-700",
  // `hover:` in Tailwind v4 already compiles to an `@media (hover: hover)`
  // block, so the module's manual media query has no equivalent here.
  states:
    "cursor-pointer outline-none transition-[filter,box-shadow,translate] duration-150 ease-in-out hover:brightness-110 hover:-translate-y-px focus-visible:ring-3 focus-visible:ring-violet-200 disabled:opacity-50 disabled:pointer-events-none",
};

/* The variants touch `surface` and nothing else — the Tailwind reading of "two
   properties plus `composes: base`". */
const variants: Record<TailwindButtonVariant, TailwindButtonRecipe> = {
  base: {},
  brand: { surface: "bg-violet-600 text-white" },
  success: { surface: "bg-emerald-500 text-emerald-50" },
  warning: { surface: "bg-amber-300 text-amber-950" },
  danger: { surface: "bg-rose-500 text-white" },
};

const props = withDefaults(
  defineProps<{
    variant?: TailwindButtonVariant;
    /**
     * Per-group overrides from the parent. Each key replaces that group
     * outright, so `{ shape: 'rounded-md' }` squares the corners and leaves
     * layout, type, surface, and states untouched. A partial object is a
     * partial restyle — the same deal as <NDCard>'s `styles` prop.
     */
    classes?: TailwindButtonRecipe;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
  }>(),
  {
    variant: "base",
    classes: undefined,
    type: "button",
    disabled: false,
  },
);

/**
 * Three layers, last writer per group wins: recipe → variant → parent.
 *
 * Tailwind v4 scans source files for literal class strings, and every candidate
 * here is a literal — in this file for the defaults and variants, in the
 * parent's template for the overrides. Nothing is assembled from fragments, so
 * the compiler sees all of it.
 */
const classes = computed(() =>
  Object.values({ ...recipe, ...variants[props.variant], ...props.classes })
    .filter(Boolean)
    .join(" "),
);

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <!-- Single root, so a `class` written on the tag falls through and Vue merges
       it in. That path is plain appending, so it is only safe for utilities
       that do not collide with a group above — use `classes` for anything that
       does. -->
  <button :class="classes" :type="type" :disabled="disabled">
    <slot />
  </button>
</template>
