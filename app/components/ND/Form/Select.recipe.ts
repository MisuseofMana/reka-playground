import { tv } from "tailwind-variants";

export const formSelectRecipe = tv({
  slots: {
    root: "flex flex-col gap-1.5",
    label: "text-sm font-semibold tracking-wide text-violet-700",
    trigger: [
      "flex w-full items-center justify-between rounded-2xl border-2 border-violet-200 bg-violet-50/50 px-3 py-2 text-left shadow-sm outline-none transition",
      "hover:border-violet-300",
      "focus:border-violet-500 focus:bg-white focus:shadow-md focus:ring-4 focus:ring-violet-200",
      "data-[state=open]:border-violet-500 data-[state=open]:bg-white data-[state=open]:ring-4 data-[state=open]:ring-violet-200",
      "aria-invalid:border-rose-400 aria-invalid:bg-rose-50",
    ],
    error: "m-0 text-sm font-medium text-rose-500",
    content: "z-50 w-[var(--reka-select-trigger-width)] overflow-hidden rounded-2xl border-2 border-violet-200 bg-white shadow-lg",
    viewport: "p-1",
    item: "cursor-pointer rounded-xl px-3 py-2 transition data-[highlighted]:bg-violet-100 data-[highlighted]:text-violet-900",
  },
});
