import { tv } from "tailwind-variants";

export const avatarRecipe = tv({
  slots: {
    root: "inline-flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-violet-200 text-sm font-bold tracking-wide text-violet-600",
    image: "size-full object-cover",
  },
});
