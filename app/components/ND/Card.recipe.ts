import { tv } from "tailwind-variants";

export const cardRecipe = tv({
  slots: {
    root: "flex flex-col gap-3 rounded-2xl border-2 border-brand-200 bg-white p-5 shadow",
    header: "flex items-center justify-between gap-4",
    body: "text-sm leading-relaxed text-brand-950/80",
    footer: "mt-1 flex justify-end gap-3",
  },
});
