import { tv } from "tailwind-variants";

export type NDButtonLooksLike =
  | "primary"
  | "secondary"
  | "ghost"
  | "success"
  | "danger";

export type NDButtonSize = "sm" | "md" | "lg";

/**
 * The recipe lives here rather than inside ND/Button.vue on purpose. `tv()`
 * returns a plain `(options) => string` function, so anything that needs the
 * button's look can borrow it — an `<a>`, a Reka `asChild` trigger, or this
 * page, which calls it directly to print the strings it generates. A recipe
 * sealed inside a component can only ever style that component.
 *
 * WHICH AXIS OWNS WHICH PROPERTY
 *
 * Two Tailwind utilities from the same family (`px-3`/`px-5`, `ring-1`/`ring-2`)
 * have equal specificity, so when both land in the class list the winner is
 * decided by their order in the generated stylesheet — not by the order the
 * recipe concatenated them. `tv()` wraps `tailwind-merge`, so a collision
 * *inside* the recipe is resolved for you: the later value wins and the earlier
 * one is dropped from the string entirely.
 *
 * That safety net does not extend to classes Vue appends via attribute
 * fallthrough, which are added after this function has returned, so the recipe
 * still gives each property family exactly one owner and a collision never
 * arises:
 *
 *   base       → display, alignment, radius, weight, tracking, cursor,
 *                outline, transition, hover lift, focus ring, disabled
 *   looksLike  → background, text colour, resting ring, hover background
 *   size       → padding, font-size/line-height, gap
 *   fullWidth  → width
 *   compound   → box-shadow, text-transform  (families no one above touches)
 *
 * That discipline is the same idea as TailwindButton's grouped recipe, just
 * enforced by convention instead of by object keys.
 */
export const buttonRecipe = tv({
  base: [
    "inline-flex items-center justify-center",
    "rounded-full font-semibold tracking-wide",
    "cursor-pointer outline-none",
    "transition-[filter,box-shadow,translate] duration-150 ease-in-out",
    "hover:brightness-110 hover:-translate-y-px",
    // Lives in the `focus-visible:` scope, so it never competes with ghost's
    // resting `ring-1` — different modifier, different selector, and
    // `:focus-visible` outranks it on focus regardless of source order.
    "focus-visible:ring-3 focus-visible:ring-violet-200",
    "disabled:opacity-50 disabled:pointer-events-none",
  ],

  variants: {
    looksLike: {
      primary: "bg-violet-600 text-white",
      secondary: "bg-slate-200 text-slate-700",
      ghost:
        "bg-transparent text-violet-700 ring-1 ring-inset ring-violet-300 hover:bg-violet-50",
      success: "bg-emerald-500 text-emerald-50",
      danger: "bg-rose-500 text-white",
    } satisfies Record<NDButtonLooksLike, string>,

    size: {
      sm: "gap-1.5 px-3 py-1 text-xs/5",
      md: "gap-2 px-5 py-2 text-sm/5",
      lg: "gap-2.5 px-7 py-3 text-base/6",
    } satisfies Record<NDButtonSize, string>,

    // A boolean axis is just an axis whose keys are `true`/`false`. The empty
    // string is deliberate — it keeps the axis exhaustive and documents that
    // `false` adds nothing, rather than leaving a reader to wonder.
    fullWidth: {
      true: "w-full",
      false: "",
    },
  },

  /**
   * The part a flat `Record<variant, string>` lookup cannot express: rules
   * that depend on more than one axis at once. Each entry here adds only
   * box-shadow or text-transform, families nothing above sets.
   */
  compoundVariants: [
    // A large filled primary is the page's main call to action, so it earns a
    // shadow the small one would look bloated wearing.
    {
      looksLike: "primary",
      size: "lg",
      class: "shadow-lg shadow-violet-600/30",
    },
    // Arrays match any listed value — one entry covers both loud looks.
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
