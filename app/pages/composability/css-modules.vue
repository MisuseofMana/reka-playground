<script setup lang="ts">
// This page's own styling.
import styles from "./css-modules.module.css";
// A second stylesheet for <NDCard>, imported by this page and used to style the card on demand; the NDCard itself never imports it.
import invert from "./css-modules.invert.module.css";
</script>

<template>
  <div :class="styles.page">
    <section :class="styles.section">
      <h1 class="text-4xl font-bold">Composability With CSS Modules</h1>
      <p class="text-lg">
        Showcasing several versions of stylistic composability with CSS Modules.
        There are a few ways of stylistic composition shown here.
      </p>
      <ul class="list-disc list-inside">
        <li>Using slots for custom content passed into a child component</li>
        <li>Using CSS Modules to style a component externally</li>
        <li>
          Using the composes keyword and prop to style a component internally
        </li>
      </ul>
      <p class="text-lg">
        The idea with composition and composability is to adopt it as a
        development philosophy rather than a technical constraint.
      </p>

      <h2 :class="styles.sectionTitle">1 · A Basic User Card Component</h2>

      <p>
        A card with a header containing a title and subtitle. An avatar is
        included as well as a slot for the content.
      </p>

      <NDUserCard name="Ada Lovelace" role="Analytical Engine, Note G">
        This whole user card component consumes the NDCard and NDAvatar
        components to assemble itself into a more stricly purposed component. It
        does what it does, and that's pretty much it. The title, and subtitle
        are props passed to the component. The avatar text is derived from the
        name, and the content of the card is configured via a default slot.
      </NDUserCard>
    </section>

    <section :class="styles.section">
      <h2 :class="styles.sectionTitle">
        2 · More Composable with A CustomSlot
      </h2>
      <p :class="styles.note">
        By adding custom slots like `#actions`, the page can now control the
        content of the card. We include a paragraph and a list in the slot and
        this makes our component useful beyond just it's own content.
      </p>

      <div :class="styles.row">
        <NDUserCard name="Grace Hopper" role="Compiler pioneer">
          <p :class="styles.paragraph">
            This body is a paragraph plus a list, passed straight through the
            default slot:
          </p>
          <ul :class="styles.list">
            <li>arbitrary markup</li>
            <li>other components</li>
            <li>nothing at all</li>
          </ul>

          <template #actions="{ user }">
            <NDButton variant="secondary">Message {{ user.name }}</NDButton>
            <NDButton>Follow</NDButton>
          </template>
        </NDUserCard>
      </div>
    </section>

    <section :class="styles.section">
      <h2 :class="styles.sectionTitle">3 · One component, two CSS Modules</h2>
      <p :class="styles.note">
        Both cards below are the same <code>NDCard</code> rendering the same
        markup through the same slots — only the class names differ. The second
        one receives <code>composability.invert.module.css</code> through its
        <code>styles</code> prop. Because module class names are just strings,
        the parent can hand a component a whole look — and the merge is partial,
        so a module that only defines <code>.root</code> restyles the surface
        and leaves the rest alone.
      </p>

      <div :class="styles.row">
        <NDCard>
          <template #header>Default NDCard Styling</template>
          Showcasing the NDCard component with it's default styling.
          <template #footer>
            <NDButton variant="secondary">Default</NDButton>
          </template>
        </NDCard>

        <NDCard :styles="invert">
          <template #header>composability.invert.module.css</template>
          The page's module — a two-column grid instead of a column, the header
          turned into a rail, square corners, a solid offset shadow, and
          monospace body copy. Identical DOM.
          <template #footer>
            <NDButton>Inverted</NDButton>
          </template>
        </NDCard>
      </div>
    </section>

    <section :class="styles.section">
      <h2 :class="styles.sectionTitle">
        4 · Using the <strong>composes</strong> keyword in CSS Modules
      </h2>
      <p :class="styles.note">
        <code>ComposedButton</code> defines shape, padding, type, and every
        interactive state once in <code>.base</code>. The four colour variants
        each declare <code>composes: base</code> plus two properties —
        <code>background-color</code> and <code>color</code>. Picking one is a
        single lookup: <code>styles[variant]</code>.
      </p>
      <p :class="styles.note">
        <code>composes</code> references the base rule rather than copying it.
      </p>

      <div :class="styles.swatches">
        <ComposedButton variant="base"> Base Button </ComposedButton>
        <ComposedButton variant="brand"> Brand Button </ComposedButton>
        <ComposedButton variant="success"> Success Button </ComposedButton>
        <ComposedButton variant="warning"> Warning Button </ComposedButton>
        <ComposedButton variant="danger"> Danger Button </ComposedButton>
      </div>

      <p :class="styles.note">
        Because the variants only ever add colour, a change to the base — a
        different radius, a new focus ring — lands on all five at once.
      </p>
    </section>

    <section :class="styles.section">
      <h2 :class="styles.sectionTitle">
        5 · The same button, driven by Tailwind classes
      </h2>
      <p :class="styles.note">
        <code>TailwindButton</code> renders the identical markup and the
        identical five variants, but its styling is class strings rather than a
        module. The catch: <code>bg-slate-200</code> and
        <code>bg-violet-600</code> have the same specificity, so appending one
        after the other does not reliably override — stylesheet order decides,
        not attribute order.
      </p>
      <p :class="styles.note">
        So the recipe is split into named groups —
        <code>layout</code>, <code>shape</code>, <code>typography</code>,
        <code>surface</code>, <code>states</code> — and the
        <code>classes</code> prop <em>replaces</em> a group instead of appending
        to it. Only one <code>bg-*</code> ever reaches the DOM, which is the
        same guarantee <code>composes</code> gives above, and the reason this
        needs no <code>tailwind-merge</code>.
      </p>

      <div :class="styles.swatches">
        <TailwindButton variant="base">Base Button</TailwindButton>
        <TailwindButton variant="brand">Brand Button</TailwindButton>
        <TailwindButton variant="success">Success Button</TailwindButton>
        <TailwindButton variant="warning">Warning Button</TailwindButton>
        <TailwindButton variant="danger">Danger Button</TailwindButton>
      </div>

      <p :class="styles.note">
        Now the parent overriding groups on demand. Each button below is the
        same component with one or two keys handed in — everything not named
        keeps the default.
      </p>

      <div :class="styles.swatches">
        <div :class="styles.swatch">
          <TailwindButton
            variant="brand"
            :classes="{ shape: 'rounded-md border-0' }"
          >
            Squared Off
          </TailwindButton>
          <span :class="styles.swatchClasses">shape: 'rounded-md border-0'</span>
        </div>

        <div :class="styles.swatch">
          <TailwindButton :classes="{ surface: 'bg-teal-700 text-teal-50' }">
            Surface Swap
          </TailwindButton>
          <span :class="styles.swatchClasses">
            surface: 'bg-teal-700 text-teal-50'
          </span>
        </div>

        <div :class="styles.swatch">
          <TailwindButton
            variant="danger"
            :classes="{
              shape: 'rounded-none border-2 border-rose-900',
              typography: 'font-mono text-xs uppercase tracking-widest',
            }"
          >
            Two Groups
          </TailwindButton>
          <span :class="styles.swatchClasses">
            shape + typography, surface still from variant
          </span>
        </div>

        <div :class="styles.swatch">
          <TailwindButton variant="success" class="w-full shadow-lg">
            Fallthrough Class
          </TailwindButton>
          <span :class="styles.swatchClasses">
            plain `class` — appended, safe only when it collides with nothing
          </span>
        </div>
      </div>

      <p :class="styles.note">
        The trade against the module version: overrides are per-group rather
        than per-property, and a group is all-or-nothing — swapping
        <code>surface</code> means restating its text colour too. In exchange
        the parent needs no stylesheet of its own, and the class names it writes
        are the ones it can read in the DOM.
      </p>
    </section>
  </div>
</template>
