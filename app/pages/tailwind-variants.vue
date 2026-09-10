<script setup lang="ts">
import {
  buttonRecipe,
  type NDButtonLooksLike,
  type NDButtonSize,
} from "~/components/ND/Button.recipe";

useHead({ title: "Tailwind Variants" });

const badge =
  "rounded-full bg-brand-100 px-2 py-0.5 font-mono text-[0.6875rem] text-brand-700";

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
    adds: "shadow-lg shadow-brand-600/30",
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
    <DocsSection as="header">
      <DocsSourceLink />
      <h1 class="text-4xl font-bold text-brand-700">Tailwind Variants</h1>
      <NDParagraph>
        <strong>tv()</strong> organizes styles into a recipe file rather than
        many inlined classes and logical conditionals.
      </NDParagraph>
    </DocsSection>

    <DocsSection>
      <NDHeading>1 · The recipe</NDHeading>
      <NDParagraph>
        One <strong>tv()</strong> call describes the whole button: a
        <em>base</em> every instance gets, one entry per <em>variants</em> axis,
        the combinations that behave differently, and the values assumed when a
        prop is left off.
      </NDParagraph>
      <DocsInfoBox>
        Each property family has exactly one owner —
        <em>size</em> alone sets padding, <em>looksLike</em> alone sets
        background — so two variants can never emit competing utilities in the
        first place.
      </DocsInfoBox>
    </DocsSection>

    <DocsSection>
      <NDHeading>2 · Variant props</NDHeading>
      <NDParagraph>
        Each axis in <em>variants</em> becomes a prop. Leave one off and
        <em>defaultVariants</em> fills it in, which is why the first example is
        a styled button with no props at all.
      </NDParagraph>
      <NDCard v-for="item in variantExamples" :key="item.label">
        <NDButton v-bind="item.props">{{ item.label }}</NDButton>
      </NDCard>
    </DocsSection>

    <DocsSection>
      <NDHeading>3 · Compound variants</NDHeading>
      <NDParagraph>
        This is the <strong>tv()</strong> feature a lookup map cannot reproduce:
        rules that fire only on a <em>combination</em> of inputs. A large
        primary gets a shadow; a large <em>danger</em> or <em>success</em> gets
        uppercased. At <em>md</em> none of it applies, and no single axis is
        touched.
      </NDParagraph>
      <NDCard v-for="item in compoundExamples" :key="item.label">
        <NDButton v-bind="item.props">{{ item.label }}</NDButton>
        <span :class="badge">adds {{ item.adds }}</span>
      </NDCard>
      <NDParagraph>
        The array form matches any listed value, so
        <em>looksLike: ["danger", "success"]</em> is one entry covering both
        rather than two near-identical ones.
      </NDParagraph>
      <NDParagraph>
        This could improve the DX of our component variance management. We've
        discussed this in the Dev Days recently. "How do we maintain a component
        that has slight visual differences in different places?"
        <strong>tailwind-variants</strong> lets us define those variations
        elegantly through Tailwind utilities and custom style configurations.
      </NDParagraph>
    </DocsSection>

    <DocsSection>
      <NDHeading>4 · The recipe is just a function</NDHeading>
      <NDParagraph>
        Because <strong>buttonRecipe()</strong> lives in
        <strong>ND/Button.recipe.ts</strong> — beside the component rather than
        inside it — it can dress markup the component does not own: an anchor, a
        Reka <em>asChild</em> trigger, or any other element.
      </NDParagraph>
      <NDCard>
        <a href="#" :class="buttonRecipe({ looksLike: 'secondary' })">
          An anchor, same recipe
        </a>
      </NDCard>
    </DocsSection>

    <DocsSection>
      <NDHeading>5 · Props</NDHeading>
      <div class="overflow-x-auto rounded-2xl border border-brand-200">
        <table class="w-full border-collapse text-left text-sm">
          <thead class="bg-brand-100/70 text-brand-800">
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
              class="border-t border-brand-100 align-top"
            >
              <td class="px-4 py-3 font-mono text-[0.8125rem] text-brand-700">
                {{ row.prop }}
              </td>
              <td class="px-4 py-3">
                <span class="font-mono text-[0.8125rem] text-brand-900/75">
                  {{ row.type }}
                </span>
                <span class="mt-1 block text-xs text-brand-900/55">
                  {{ row.notes }}
                </span>
              </td>
              <td
                class="px-4 py-3 font-mono text-[0.8125rem] text-brand-900/75"
              >
                {{ row.default }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DocsSection>
  </div>
</template>
