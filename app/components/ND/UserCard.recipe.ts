import { tv } from "tailwind-variants";

export const userCardRecipe = tv({
  slots: {
    identity: "flex items-center gap-3",
    meta: "flex flex-col gap-0.5",
    name: "m-0 text-base font-semibold tracking-tight text-violet-600",
    role: "m-0 text-[0.8125rem]/5 text-violet-950/60",
  },
});
