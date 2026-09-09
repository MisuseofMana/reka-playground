import { tv } from "tailwind-variants";

export const formInputRecipe = tv({
  slots: {
    root: "flex flex-col gap-1.5",
    label: "text-sm font-semibold tracking-wide text-violet-700",
    field: "flex items-center overflow-hidden rounded-2xl border-2 border-violet-200 bg-violet-50/50 shadow-sm transition hover:border-violet-300 focus-within:border-violet-500 focus-within:bg-white focus-within:shadow-md focus-within:ring-4 focus-within:ring-violet-200",
    control: "min-w-0 flex-1 bg-transparent px-3 py-2 outline-none",
    error: "m-0 text-sm font-medium text-rose-500",
  },
  variants: {
    invalid: {
      true: {
        field: "border-rose-400 bg-rose-50 focus-within:ring-rose-200",
      },
    },
  },
});
