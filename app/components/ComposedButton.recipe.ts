import { tv } from "tailwind-variants";

export type ComposedButtonVariant =
  | "base"
  | "brand"
  | "success"
  | "warning"
  | "danger";

export const composedButtonRecipe = tv({
  base: [
    "inline-flex items-center justify-center",
    "rounded-full px-5 py-2 text-sm/5 font-semibold tracking-wide",
    "cursor-pointer outline-none",
    "transition-[filter,box-shadow,translate] duration-150 ease-in-out",
    "hover:brightness-110 hover:-translate-y-px",
    "focus-visible:ring-3 focus-visible:ring-violet-200",
    "disabled:opacity-50 disabled:pointer-events-none",
  ],
  variants: {
    variant: {
      base: "bg-slate-200 text-slate-700",
      brand: "bg-violet-600 text-white",
      success: "bg-emerald-500 text-emerald-50",
      warning: "bg-yellow-300 text-yellow-900",
      danger: "bg-rose-500 text-white",
    } satisfies Record<ComposedButtonVariant, string>,
  },
  defaultVariants: {
    variant: "base",
  },
});
