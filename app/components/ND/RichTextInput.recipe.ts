import { tv } from "tailwind-variants";

export const richTextInputRecipe = tv({
  slots: {
    root: "overflow-hidden rounded-xl border-2 border-brand-200 bg-white",
    toolbar:
      "flex flex-wrap items-center gap-1 border-b border-brand-100 bg-brand-50/60 px-2 py-1.5",
    button:
      "rounded-md px-2 py-1 font-mono text-xs font-medium text-brand-700 transition hover:bg-brand-100 active:bg-brand-200",
    editor: "prose-content min-h-40 px-4 py-3 text-sm outline-none",
  },
});
