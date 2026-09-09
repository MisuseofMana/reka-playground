<script setup lang="ts">
import {
  buttonRecipe,
  type NDButtonLooksLike,
  type NDButtonSize,
} from "~/components/ND/Button.recipe";

useHead({ title: "Tailwind Variants" });

const section = "flex flex-col gap-3";
const sectionTitle = "text-base font-semibold tracking-wide text-violet-700";
const note =
  "text-sm leading-relaxed text-violet-900/70 [&_code]:rounded-md [&_code]:bg-violet-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.8125rem] [&_code]:text-violet-700";
const infoBox =
  "rounded-xl border border-sky-200 border-l-4 border-l-sky-500 bg-sky-50 px-4 py-3 text-sm leading-relaxed text-sky-950 before:mb-1 before:block before:text-xs before:font-semibold before:uppercase before:tracking-wide before:text-sky-700 before:content-['Note'] [&_code]:rounded-md [&_code]:bg-sky-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.8125rem] [&_code]:text-sky-800";
const demo =
  "flex flex-wrap items-center gap-3 rounded-2xl border border-violet-200 bg-white px-5 py-6";
const badge =
  "rounded-full bg-violet-100 px-2 py-0.5 font-mono text-[0.6875rem] text-violet-700";

type ButtonProps = {
  looksLike?: NDButtonLooksLike;
  size?: NDButtonSize;
  fullWidth?: boolean;
};

const variantExamples: { label: string; props: ButtonProps }[] = [
  { label: "No Props Set", props: {} },
  { label: "Danger, Default Size", props: { looksLike: "danger" } },
  { label: "Small Default", props: { size: "sm" } },
  { label: "Large Ghost", props: { looksLike: "ghost", size: "lg" } },
  { label: "Full Width", props: { fullWidth: true } },
];

const compoundExamples: {
  label: string;
  props: ButtonProps;
  adds: string;
}[] = [
  {
    label: "Primary + Large",
    props: { looksLike: "primary", size: "lg" },
    adds: "shadow-lg shadow-violet-600/30",
  },
  {
    label: "Success + Large",
    props: { looksLike: "success", size: "lg" },
    adds: "uppercase",
  },
  {
    label: "Danger + Large",
    props: { looksLike: "danger", size: "lg" },
    adds: "uppercase",
  },
];

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
      <a
        href="https://github.com/MisuseofMana/reka-playground/blob/main/app/pages/tailwind-variants.vue"
        target="_blank"
        class="self-start rounded-lg bg-violet-100 px-2.5 py-1 font-mono text-xs text-violet-600 transition hover:bg-violet-200"
      >
        View source on GitHub &nearr;
      </a>
      <h1 class="text-4xl font-bold text-violet-700">Tailwind Variants</h1>
      <p class="text-lg text-violet-900/80">
        <code class="font-mono">tv()</code> organizes styles into a recipe file
        rather than many inlined classes and logical conditionals.
      </p>
    </header>

    <section :class="section">
      <h2 :class="sectionTitle">1 · The recipe</h2>
      <p :class="note">
        One <code>tv()</code> call describes the whole button: a
        <code>base</code> every instance gets, one entry per
        <code>variants</code> axis, the combinations that behave differently,
        and the values assumed when a prop is left off.
      </p>
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
      <div
        v-for="item in variantExamples"
        :key="item.label"
        :class="demo"
      >
        <NDButton v-bind="item.props">{{ item.label }}</NDButton>
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
      <div
        v-for="item in compoundExamples"
        :key="item.label"
        :class="demo"
      >
        <NDButton v-bind="item.props">{{ item.label }}</NDButton>
        <span :class="badge">adds {{ item.adds }}</span>
      </div>
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
        Reka <code>asChild</code> trigger, or any other element.
      </p>
      <div :class="demo">
        <a href="#" :class="buttonRecipe({ looksLike: 'secondary' })">
          An anchor, same recipe
        </a>
      </div>
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
  </div>
</template>
