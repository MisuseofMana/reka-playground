<script setup lang="ts">
import { cvaButton } from "~/components/CvaButton.recipe";

const note =
  "text-sm leading-relaxed text-violet-900/70 [&_code]:rounded-md [&_code]:bg-violet-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.8125rem] [&_code]:text-violet-700";
const sectionTitle = "text-base font-semibold tracking-wide text-violet-700";
const section = "flex flex-col gap-3";
const infoBox =
  "rounded-xl border border-sky-200 border-l-4 border-l-sky-500 bg-sky-50 px-4 py-3 text-sm leading-relaxed text-sky-950 before:mb-1 before:block before:text-xs before:font-semibold before:uppercase before:tracking-wide before:text-sky-700 before:content-['Note'] [&_code]:rounded-md [&_code]:bg-sky-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.8125rem] [&_code]:text-sky-800";
const pre =
  "overflow-x-auto rounded-2xl border-2 border-violet-200 bg-violet-50/50 p-4 font-mono text-[0.8125rem] leading-relaxed text-violet-700";
/* Caption under a demo button, listing the props actually set on it. */
const mono = "font-mono text-xs leading-relaxed text-violet-900/55";
/* Button plus its caption. `items-start` keeps the button at content width —
   without it the button is a stretched flex item in the section's column and
   spans the full page. */
const demo = "flex flex-row items-center justify-start gap-1.5 mb-2";

/* The recipe is an ordinary function, so the page can call it to show exactly
   what it produces. Nothing is reaching into the component to find this out. */
const ghostSm = cvaButton({ looksLike: "ghost", size: "sm" });
const primaryLg = cvaButton({ looksLike: "primary", size: "lg" });
const defaults = cvaButton({});
</script>

<template>
  <div class="flex w-full max-w-3xl flex-col gap-8 p-6">
    <section :class="section">
      <h1 class="text-4xl font-bold text-violet-700">
        Class Variance Authority (CVA)
      </h1>
      <p class="text-lg text-violet-900/80">
        <code class="font-mono">cva()</code> is typescripts way of organizing
        styles into a recipe file rather than many inlined components and
        conditionals.
      </p>
    </section>

    <section :class="section">
      <h2 :class="sectionTitle">1 · Prop Based Variations, Supports Default</h2>

      <p :class="note">
        All the styles for the following buttons are defined in a recipie file
        rather than a dynamic class list contained within the component. This
        first button is the default button with no props.
      </p>

      <div :class="demo">
        <CvaButton>No Props Set</CvaButton>
        <span :class="mono"> no props provided to button </span>
      </div>

      <div :class="demo">
        <CvaButton looksLike="danger">Danger Default Size</CvaButton>
        <span :class="mono">looksLike="danger"</span>
      </div>

      <div :class="demo">
        <CvaButton size="sm">Small Default</CvaButton>
        <span :class="mono">size="sm"</span>
      </div>

      <div :class="demo">
        <CvaButton looksLike="ghost" size="lg">Large Ghost</CvaButton>
        <span :class="mono">looksLike="ghost" size="lg"</span>
      </div>
    </section>

    <section :class="section">
      <h2 :class="sectionTitle">
        2 · Compound Variations, Combinations That Behave Differently
      </h2>
      <p :class="note">
        This is the CVA feature a lookup map cannot reproduce: rules that fire
        only on a <em>combination</em> of inputs. A large primary gets a shadow;
        a large <code>danger</code> or <code>success</code> gets uppercased. At
        <code>md</code> neither applies, and no other size or looksLike is
        touched.
      </p>
      <p :class="note">
        This could improve the DX of our component variance management. We've
        discussed this in the Dev Days recently. "How do we maintain a component
        that has slight visual differences in different places?" CVA allows us
        to define those variations elegantly through Tailwind utilities and
        custom style configurations.
      </p>
      <p :class="infoBox">
        Look at the CvaButton.recipie.ts file to see how the variations are
        defined.
      </p>

      <div :class="demo">
        <CvaButton looksLike="primary" size="lg"
          >Adds Shadow to Primary Large</CvaButton
        >
        <span :class="mono">looksLike="primary" size="lg"</span>
      </div>

      <div :class="demo">
        <CvaButton looksLike="success" size="lg"
          >Adds Uppercase to Success Large</CvaButton
        >
        <span :class="mono">looksLike="success" size="lg"</span>
      </div>

      <div :class="demo">
        <CvaButton looksLike="danger" size="lg"
          >Adds Uppercase to Danger Large as well</CvaButton
        >
        <span :class="mono">looksLike="danger" size="lg"</span>
      </div>

      <p :class="note">
        The array form matches any listed value, so
        <code>looksLike: ["danger", "success"]</code> is one entry covering both
        rather than two near-identical ones.
      </p>
    </section>

    <section :class="section">
      <h2 :class="sectionTitle">3 · The recipe is just a function</h2>
      <p :class="note">
        Because <code>cvaButton()</code> lives in
        <code>CvaButton.recipe.ts</code> — beside the component rather than
        inside it — it can dress markup the component does not own: an anchor, a
        Reka <code>asChild</code> trigger, or this block of text printing its
        own output. Colocated, but not sealed in.
      </p>
      <pre :class="pre">
cvaButton({})
  {{ defaults }}

cvaButton({ looksLike: "ghost", size: "sm" })
  {{ ghostSm }}

cvaButton({ looksLike: "primary", size: "lg" })
  {{ primaryLg }}</pre
      >
      <div class="flex flex-wrap items-center gap-3">
        <a href="#" :class="cvaButton({ looksLike: 'secondary' })">
          An anchor, same recipe
        </a>
      </div>
    </section>

    <section :class="section">
      <h2 :class="sectionTitle">4 · Where cva stops helping</h2>
      <p :class="note">
        cva concatenates; it does not deduplicate. Passing
        <code>class="bg-amber-300"</code> to a primary button leaves both
        <code>bg-violet-600</code> and <code>bg-amber-300</code> in the list,
        and since single-class selectors have equal specificity the winner is
        whichever Tailwind emitted later — not whichever you wrote last.
      </p>
      <p :class="infoBox">
        <p class="mb-2 font-bold">
          This isn't really a problem if we standardize usage of CVA and use it
          consistently where appropriate. Knowing this caveate is more important than the actual issue.
          We can avoid the issue by being aware of it.
        </p>
        <p>
          We should also be careful not to overuse CVA. It's a
          powerful tool, but it's not a silver bullet. We should use it when it's
          appropriate and not just because we can. The downsides of CVA can be
          mitigated by using CLSX and tailwind-merge to deduplicate classes. It's
          also worth noting that with AI we can just ask it to dedupe classes for
          us. The logical overhead of deduplicating classes is trivial with AI.
        </p>
      </p>
      <div class="flex flex-wrap items-center gap-3">
        <CvaButton looksLike="primary" class="bg-amber-300 text-amber-950">
          Trying to override
        </CvaButton>
        <CvaButton looksLike="primary" class="shadow-lg ring-2 ring-violet-900">
          Adding, not overriding
        </CvaButton>
      </div>
      <p :class="note">
        The first button is the demonstration, and it <strong>fails</strong>: it
        is still violet. Tailwind emits <code>.bg-amber-300</code> before
        <code>.bg-violet-600</code> in this build — amber sorts ahead of violet
        — so the recipe wins and the override is silently discarded. Writing it
        last in the attribute bought nothing. Its
        <code>text-amber-950</code> does land, because no other
        <code>text-*</code> colour competes, which is how you end up with a
        half-applied override rather than an obvious break.
      </p>
    </section>
  </div>
</template>
