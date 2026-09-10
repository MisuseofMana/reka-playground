import { tv } from "tailwind-variants";

export const switchRecipe = tv({
  slots: {
    root: "flex items-center gap-3",
    label: "text-sm font-semibold tracking-wide text-brand-700 cursor-pointer select-none",
    track: [
      "w-[42px] h-[26px] flex shrink-0 cursor-pointer rounded-full relative",
      "border-2 border-brand-200 bg-brand-200 shadow-sm",
      "transition hover:border-brand-300",
      "data-[state=checked]:bg-brand-600 data-[state=checked]:border-brand-500",
      "focus-within:outline-none focus-within:border-brand-500 focus-within:shadow-md focus-within:ring-4 focus-within:ring-brand-200",
    ],
    thumb: [
      "w-3.5 h-3.5 my-auto bg-white rounded-full shadow-sm",
      "transition-transform will-change-transform",
      "translate-x-0.5 data-[state=checked]:translate-x-[22px]",
    ],
  },
});
