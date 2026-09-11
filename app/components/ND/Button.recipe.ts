import { tv } from "tailwind-variants";

export type NDButtonLooksLike =
  | "primary"
  | "secondary"
  | "ghost"
  | "success"
  | "danger";

export type NDButtonSize = "sm" | "md" | "lg";

export const buttonRecipe = tv({
  base: [
    "inline-flex items-center justify-center",
    "rounded-full font-semibold tracking-wide",
    "cursor-pointer outline-none",
    "transition-[filter,box-shadow,translate] duration-150 ease-in-out",
    "hover:brightness-110 hover:-translate-y-px",
    "focus-visible:ring-3 focus-visible:ring-brand-200",
    "disabled:opacity-50 disabled:pointer-events-none",
  ],

  variants: {
    looksLike: {
      primary: "bg-brand-600 text-white",
      secondary: "bg-slate-200 text-slate-700",
      ghost:
        "bg-transparent text-brand-700 ring-1 ring-inset ring-brand-300 hover:bg-brand-50",
      success: "bg-emerald-500 text-emerald-50",
      danger: "bg-rose-500 text-white",
    } satisfies Record<NDButtonLooksLike, string>,

    size: {
      sm: "gap-1.5 px-3 py-1 text-xs/5",
      md: "gap-2 px-5 py-2 text-sm/5",
      lg: "gap-2.5 px-7 py-3 text-base/6",
    } satisfies Record<NDButtonSize, string>,

    fullWidth: {
      true: "w-full",
      false: "",
    },
  },

  compoundVariants: [
    {
      looksLike: "primary",
      size: "lg",
      class: "shadow-lg shadow-brand-600/30",
    },
    {
      looksLike: ["danger", "success"],
      size: "lg",
      class: "uppercase",
    },
  ],

  defaultVariants: {
    looksLike: "primary",
    size: "md",
    fullWidth: false,
  },
});
