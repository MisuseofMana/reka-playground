import { cva } from "class-variance-authority";

export type CvaButtonLooksLike =
  | "primary"
  | "secondary"
  | "ghost"
  | "success"
  | "danger";

export type CvaButtonSize = "sm" | "md" | "lg";

/**
 * The recipe lives here rather than inside CvaButton.vue on purpose. `cva()`
 * returns a plain `(options) => string` function, so anything that needs the
 * button's look can borrow it — an `<a>`, a Reka `asChild` trigger, or this
 * page, which calls it directly to print the strings it generates. A recipe
 * sealed inside a component can only ever style that component.
 *
 * WHICH AXIS OWNS WHICH PROPERTY
 *
 * Two Tailwind utilities from the same family (`px-3`/`px-5`, `ring-1`/`ring-2`)
 * have equal specificity, so when both land in the class list the winner is
 * decided by their order in the generated stylesheet — not by the order cva
 * concatenated them. cva does not resolve that; `tailwind-merge` is the usual
 * companion for when it happens.
 *
 * This recipe avoids needing it by giving each property family exactly one
 * owner, so a collision cannot occur in the first place:
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
export const cvaButton = cva(
  [
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
  {
    variants: {
      looksLike: {
        primary: "bg-violet-600 text-white",
        secondary: "bg-slate-200 text-slate-700",
        ghost:
          "bg-transparent text-violet-700 ring-1 ring-inset ring-violet-300 hover:bg-violet-50",
        success: "bg-emerald-500 text-emerald-50",
        danger: "bg-rose-500 text-white",
      } satisfies Record<CvaButtonLooksLike, string>,

      size: {
        sm: "gap-1.5 px-3 py-1 text-xs/5",
        md: "gap-2 px-5 py-2 text-sm/5",
        lg: "gap-2.5 px-7 py-3 text-base/6",
      } satisfies Record<CvaButtonSize, string>,

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
  },
);
