<script setup lang="ts">
import {
  buttonRecipe,
  type NDButtonLooksLike,
  type NDButtonSize,
} from "~/components/ND/Button.recipe";
/* `?raw` hands us the file's actual text at build time, so every definition
   printed on this page is the one that shipped. Retyping the recipe into a
   template literal would work until someone edited the recipe and not the
   docs. */
import recipeSource from "~/components/ND/Button.recipe.ts?raw";
import componentSource from "~/components/ND/Button.vue?raw";

useHead({ title: "Tailwind Variants" });

/* ---------------------------------------------------------------- styling */

const section = "flex flex-col gap-3";
const sectionTitle = "text-base font-semibold tracking-wide text-violet-700";
const note =
  "text-sm leading-relaxed text-violet-900/70 [&_code]:rounded-md [&_code]:bg-violet-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.8125rem] [&_code]:text-violet-700";
const infoBox =
  "rounded-xl border border-sky-200 border-l-4 border-l-sky-500 bg-sky-50 px-4 py-3 text-sm leading-relaxed text-sky-950 before:mb-1 before:block before:text-xs before:font-semibold before:uppercase before:tracking-wide before:text-sky-700 before:content-['Note'] [&_code]:rounded-md [&_code]:bg-sky-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.8125rem] [&_code]:text-sky-800";

/* The documentation unit this page is built from: one card holding a live
   render on top and the source that produced it underneath, so the two can
   never be read apart. */
const example = "overflow-hidden rounded-2xl border border-violet-200 bg-white";
const stage = "flex flex-wrap items-center gap-3 px-5 py-6";
const codeBar =
  "overflow-x-auto border-t border-violet-100 bg-violet-50/70 px-4 py-3 font-mono text-[0.8125rem] leading-relaxed whitespace-pre text-violet-800";
/* A filename strip above a block, the way a docs site labels a snippet. */
const fileName =
  "flex items-center gap-2 rounded-t-2xl border border-b-0 border-violet-200 bg-violet-100/70 px-4 py-2 font-mono text-xs text-violet-700";
const fileBody =
  "overflow-x-auto rounded-b-2xl border border-violet-200 bg-violet-50/50 p-4 font-mono text-[0.8125rem] leading-relaxed whitespace-pre text-violet-800";
/* Output rather than input: the string a call returns. */
const pre =
  "overflow-x-auto rounded-2xl border-2 border-violet-200 bg-violet-50/50 p-4 font-mono text-[0.8125rem] leading-relaxed whitespace-pre-wrap text-violet-700";
const badge =
  "rounded-full bg-violet-100 px-2 py-0.5 font-mono text-[0.6875rem] text-violet-700";

/* ------------------------------------------------------------ source text */

/** The `tv()` call itself, with the file's explanatory header comment left off. */
const recipeDefinition = recipeSource
  .slice(recipeSource.indexOf("export const buttonRecipe"))
  .trimEnd();

/**
 * Pull one region out of the recipe by its delimiters and strip the two spaces
 * of indentation it carries inside `tv({ ... })`. Falls back to the empty
 * string if the markers ever move, which shows up as a missing block rather
 * than as a stale one.
 */
function region(from: string, to: string) {
  const start = recipeSource.indexOf(from);
  const end = recipeSource.indexOf(to, start);
  if (start === -1 || end === -1) return "";
  return recipeSource
    .slice(start, end)
    .trimEnd()
    .replace(/,$/, "")
    .split("\n")
    .map((line) => line.replace(/^ {2}/, ""))
    .join("\n");
}

const variantsRegion = region("variants: {", "\n\n  /**");
const compoundRegion = region("compoundVariants: [", "\n\n  defaultVariants");
const defaultsRegion = region("defaultVariants: {", "\n});");

/* ------------------------------------------------------------------ demos */

type ButtonProps = {
  looksLike?: NDButtonLooksLike;
  size?: NDButtonSize;
  fullWidth?: boolean;
};

type Example = {
  /** The markup a reader would write to get the render above it. */
  code: string;
  label: string;
  props: ButtonProps;
  /** For compound examples: what the combination adds that neither axis does. */
  adds?: string;
};

const variantExamples: Example[] = [
  {
    label: "No Props Set",
    props: {},
    code: "<NDButton>No Props Set</NDButton>",
  },
  {
    label: "Danger, Default Size",
    props: { looksLike: "danger" },
    code: '<NDButton looksLike="danger">Danger, Default Size</NDButton>',
  },
  {
    label: "Small Default",
    props: { size: "sm" },
    code: '<NDButton size="sm">Small Default</NDButton>',
  },
  {
    label: "Large Ghost",
    props: { looksLike: "ghost", size: "lg" },
    code: '<NDButton looksLike="ghost" size="lg">Large Ghost</NDButton>',
  },
  {
    label: "Full Width",
    props: { fullWidth: true },
    code: "<NDButton fullWidth>Full Width</NDButton>",
  },
];

const compoundExamples: Example[] = [
  {
    label: "Primary + Large",
    props: { looksLike: "primary", size: "lg" },
    adds: "shadow-lg shadow-violet-600/30",
    code: '<NDButton looksLike="primary" size="lg">Primary + Large</NDButton>',
  },
  {
    label: "Success + Large",
    props: { looksLike: "success", size: "lg" },
    adds: "uppercase",
    code: '<NDButton looksLike="success" size="lg">Success + Large</NDButton>',
  },
  {
    label: "Danger + Large",
    props: { looksLike: "danger", size: "lg" },
    adds: "uppercase",
    code: '<NDButton looksLike="danger" size="lg">Danger + Large</NDButton>',
  },
];

/* The recipe is an ordinary function, so the page can call it to show exactly
   what it produces. Nothing is reaching into the component to find this out. */
const defaults = buttonRecipe({});
const ghostSm = buttonRecipe({ looksLike: "ghost", size: "sm" });
const primaryLg = buttonRecipe({ looksLike: "primary", size: "lg" });

/* ---------------------------------------------------------- api reference */

const api: { prop: string; type: string; default: string; notes: string }[] = [
  {
    prop: "looksLike",
    type: '"primary" | "secondary" | "ghost" | "success" | "danger"',
    default: '"primary"',
    notes: "Background, text colour, resting ring, hover background.",
  },
  {
    prop: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    notes: "Padding, font size, gap.",
  },
  {
    prop: "fullWidth",
    type: "boolean",
    default: "false",
    notes: "Stretches to the container width.",
  },
  {
    prop: "type",
    type: '"button" | "submit" | "reset"',
    default: '"button"',
    notes: "Passed straight to the underlying element.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    notes: "Dims and removes pointer events via the base styles.",
  },
];
</script>

<template>
  <div class="flex w-full max-w-3xl flex-col gap-10 p-6">
    <header :class="section">
      <h1 class="text-4xl font-bold text-violet-700">Tailwind Variants</h1>
      <p class="text-lg text-violet-900/80">
        <code class="font-mono">tv()</code> organizes styles into a recipe file
        rather than many inlined classes and logical conditionals. Every snippet
        below is read from the real source at build time, so the page cannot
        drift from the component it documents.
      </p>
      <div>
        <div :class="fileName">app/pages/example.vue</div>
        <pre
          :class="fileBody"
        >&lt;NDButton looksLike="ghost" size="lg"&gt;Save&lt;/NDButton&gt;</pre>
      </div>
    </header>

    <section :class="section">
      <h2 :class="sectionTitle">1 · The recipe</h2>
      <p :class="note">
        One <code>tv()</code> call describes the whole button: a
        <code>base</code> every instance gets, one entry per
        <code>variants</code> axis, the combinations that behave differently,
        and the values assumed when a prop is left off.
      </p>
      <div>
        <div :class="fileName">app/components/ND/Button.recipe.ts</div>
        <pre :class="fileBody">{{ recipeDefinition }}</pre>
      </div>
      <p :class="infoBox">
        Each property family has exactly one owner —
        <code>size</code> alone sets padding, <code>looksLike</code> alone sets
        background — so two variants can never emit competing utilities in the
        first place.
      </p>
    </section>

    <section :class="section">
      <h2 :class="sectionTitle">2 · Variant props</h2>
      <p :class="note">
        Each axis in <code>variants</code> becomes a prop. Leave one off and
        <code>defaultVariants</code> fills it in, which is why the first example
        is a styled button with no props at all.
      </p>
      <div>
        <div :class="fileName">variants</div>
        <pre :class="fileBody">{{ variantsRegion }}</pre>
      </div>

      <figure
        v-for="item in variantExamples"
        :key="item.code"
        :class="example"
      >
        <div :class="stage">
          <NDButton v-bind="item.props">{{ item.label }}</NDButton>
        </div>
        <figcaption :class="codeBar">{{ item.code }}</figcaption>
      </figure>

      <div>
        <div :class="fileName">defaultVariants</div>
        <pre :class="fileBody">{{ defaultsRegion }}</pre>
      </div>
    </section>

    <section :class="section">
      <h2 :class="sectionTitle">3 · Compound variants</h2>
      <p :class="note">
        This is the <code>tv()</code> feature a lookup map cannot reproduce:
        rules that fire only on a <em>combination</em> of inputs. A large
        primary gets a shadow; a large <code>danger</code> or
        <code>success</code> gets uppercased. At <code>md</code> none of it
        applies, and no single axis is touched.
      </p>
      <div>
        <div :class="fileName">compoundVariants</div>
        <pre :class="fileBody">{{ compoundRegion }}</pre>
      </div>

      <figure
        v-for="item in compoundExamples"
        :key="item.code"
        :class="example"
      >
        <div :class="stage">
          <NDButton v-bind="item.props">{{ item.label }}</NDButton>
          <span :class="badge">adds {{ item.adds }}</span>
        </div>
        <figcaption :class="codeBar">{{ item.code }}</figcaption>
      </figure>

      <p :class="note">
        The array form matches any listed value, so
        <code>looksLike: ["danger", "success"]</code> is one entry covering both
        rather than two near-identical ones.
      </p>
      <p :class="note">
        This could improve the DX of our component variance management. We've
        discussed this in the Dev Days recently. "How do we maintain a component
        that has slight visual differences in different places?"
        <code>tailwind-variants</code> lets us define those variations elegantly
        through Tailwind utilities and custom style configurations.
      </p>
    </section>

    <section :class="section">
      <h2 :class="sectionTitle">4 · The recipe is just a function</h2>
      <p :class="note">
        Because <code>buttonRecipe()</code> lives in
        <code>ND/Button.recipe.ts</code> — beside the component rather than
        inside it — it can dress markup the component does not own: an anchor, a
        Reka <code>asChild</code> trigger, or this block of text printing its
        own output. Colocated, but not sealed in.
      </p>
      <div>
        <div :class="fileName">calling the recipe directly</div>
        <pre
          :class="fileBody"
        >import { buttonRecipe } from "~/components/ND/Button.recipe";

const classes = buttonRecipe({ looksLike: "ghost", size: "sm" });</pre>
      </div>
      <p :class="note">And what those calls return:</p>
      <pre :class="pre">
buttonRecipe({})
  {{ defaults }}

buttonRecipe({ looksLike: "ghost", size: "sm" })
  {{ ghostSm }}

buttonRecipe({ looksLike: "primary", size: "lg" })
  {{ primaryLg }}</pre
      >

      <figure :class="example">
        <div :class="stage">
          <a href="#" :class="buttonRecipe({ looksLike: 'secondary' })">
            An anchor, same recipe
          </a>
        </div>
        <figcaption
          :class="codeBar"
        >&lt;a href="#" :class="buttonRecipe({ looksLike: 'secondary' })"&gt;
  An anchor, same recipe
&lt;/a&gt;</figcaption>
      </figure>
    </section>

    <section :class="section">
      <h2 :class="sectionTitle">5 · Props</h2>
      <div class="overflow-x-auto rounded-2xl border border-violet-200">
        <table class="w-full border-collapse text-left text-sm">
          <thead class="bg-violet-100/70 text-violet-800">
            <tr>
              <th class="px-4 py-2 font-semibold">Prop</th>
              <th class="px-4 py-2 font-semibold">Type</th>
              <th class="px-4 py-2 font-semibold">Default</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in api"
              :key="row.prop"
              class="border-t border-violet-100 align-top"
            >
              <td class="px-4 py-3 font-mono text-[0.8125rem] text-violet-700">
                {{ row.prop }}
              </td>
              <td class="px-4 py-3">
                <span class="font-mono text-[0.8125rem] text-violet-900/75">
                  {{ row.type }}
                </span>
                <span class="mt-1 block text-xs text-violet-900/55">
                  {{ row.notes }}
                </span>
              </td>
              <td class="px-4 py-3 font-mono text-[0.8125rem] text-violet-900/75">
                {{ row.default }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section :class="section">
      <h2 :class="sectionTitle">6 · Full source</h2>
      <p :class="note">
        Both files in full, straight off disk. The component is thin on purpose
        — it forwards props to the recipe and renders a button.
      </p>

      <details class="rounded-2xl border border-violet-200 bg-white">
        <summary
          class="cursor-pointer px-4 py-3 font-mono text-xs text-violet-700"
        >
          app/components/ND/Button.recipe.ts
        </summary>
        <pre
          class="overflow-x-auto border-t border-violet-100 bg-violet-50/50 p-4 font-mono text-[0.8125rem] leading-relaxed whitespace-pre text-violet-800"
          >{{ recipeSource.trimEnd() }}</pre
        >
      </details>

      <details class="rounded-2xl border border-violet-200 bg-white">
        <summary
          class="cursor-pointer px-4 py-3 font-mono text-xs text-violet-700"
        >
          app/components/ND/Button.vue
        </summary>
        <pre
          class="overflow-x-auto border-t border-violet-100 bg-violet-50/50 p-4 font-mono text-[0.8125rem] leading-relaxed whitespace-pre text-violet-800"
          >{{ componentSource.trimEnd() }}</pre
        >
      </details>
    </section>
  </div>
</template>
