<script setup lang="ts">
useHead({ title: "Slots" });

const section = "flex flex-col gap-3";
const sectionTitle = "text-base font-semibold tracking-wide text-violet-700";
const note =
  "text-sm leading-relaxed text-violet-900/70 [&_code]:rounded-md [&_code]:bg-violet-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.8125rem] [&_code]:text-violet-700";
const demo =
  "flex flex-col gap-4 rounded-2xl border border-violet-200 bg-violet-50/30 px-5 py-6";
const heading = "font-semibold text-violet-800";
const muted = "text-xs text-violet-900/50";
const badge =
  "rounded-full bg-violet-100 px-2 py-0.5 font-mono text-[0.6875rem] text-violet-700";
</script>

<template>
  <div class="flex w-full max-w-3xl flex-col gap-10 p-6">
    <header :class="section">
      <a
        href="https://github.com/MisuseofMana/reka-playground/blob/main/app/pages/slots-example.vue"
        target="_blank"
        class="self-start rounded-lg bg-violet-100 px-2.5 py-1 font-mono text-xs text-violet-600 transition hover:bg-violet-200"
      >
        View source on GitHub &nearr;
      </a>
      <h1 class="text-4xl font-bold text-violet-700">Slots</h1>
      <p class="text-lg text-violet-900/80">
        <code class="font-mono">NDCard</code> provides three content areas:
        a header, a body, and a footer. The card owns the layout — the caller
        owns the content.
      </p>
    </header>

    <section :class="section">
      <h2 :class="sectionTitle">Body only</h2>
      <p :class="note">
        Content between the tags becomes the body. No slots needed.
      </p>
      <div :class="demo">
        <NDCard>A card with nothing but body content.</NDCard>
      </div>
    </section>

    <section :class="section">
      <h2 :class="sectionTitle">Header + body</h2>
      <p :class="note">
        The header is a flex row with <code>space-between</code>, so two
        children split to opposite ends automatically.
      </p>
      <div :class="demo">
        <NDCard>
          <template #header>
            <span :class="heading">Weekly digest</span>
            <span :class="muted">Sep 4</span>
          </template>
          Two children in the header sit at opposite ends without extra layout.
        </NDCard>
      </div>
    </section>

    <section :class="section">
      <h2 :class="sectionTitle">Body + footer</h2>
      <p :class="note">
        The footer right-aligns and spaces its children — ready for action
        buttons.
      </p>
      <div :class="demo">
        <NDCard>
          Footer buttons are right-aligned for you.
          <template #footer>
            <NDButton looksLike="ghost" size="sm">Dismiss</NDButton>
            <NDButton size="sm">Save</NDButton>
          </template>
        </NDCard>
      </div>
    </section>

    <section :class="section">
      <h2 :class="sectionTitle">All three</h2>
      <div :class="demo">
        <NDCard>
          <template #header>
            <span :class="heading">Deploy to production</span>
            <span :class="badge">pending</span>
          </template>
          The card owns the shell and spacing. The caller owns the content.
          <template #footer>
            <NDButton looksLike="ghost" size="sm">Cancel</NDButton>
            <NDButton looksLike="success" size="sm">Approve</NDButton>
          </template>
        </NDCard>
      </div>
    </section>

    <section :class="section">
      <h2 :class="sectionTitle">Unfilled slots leave no trace</h2>
      <p :class="note">
        If you skip the header or footer, the element isn't rendered at all —
        no empty wrapper, no extra gap.
      </p>
      <div :class="demo">
        <NDCard>
          <template #header>
            <span :class="heading">Has a header</span>
          </template>
          Body
          <template #footer>
            <NDButton size="sm">Act</NDButton>
          </template>
        </NDCard>

        <NDCard>Body only — no header or footer in the DOM.</NDCard>
      </div>
    </section>

    <section :class="section">
      <h2 :class="sectionTitle">Composing on top of slots</h2>
      <p :class="note">
        <code>NDUserCard</code> wraps <code>NDCard</code> — it fills the
        header with an identity block and re-exposes the footer as an
        <code>#actions</code> slot. The scoped slot hands back the user object
        so the caller can reference it.
      </p>
      <div :class="demo">
        <NDUserCard name="Ada Lovelace" role="Analytical Engine, Note G">
          Wrote the first algorithm intended to be carried out by a machine.

          <template #actions="{ user }">
            <NDButton looksLike="ghost" size="sm">
              Message {{ user.name }}
            </NDButton>
            <NDButton size="sm">Follow</NDButton>
          </template>
        </NDUserCard>
      </div>
    </section>

    <section :class="section">
      <h2 :class="sectionTitle">Slot reference</h2>
      <div class="overflow-x-auto rounded-2xl border border-violet-200">
        <table class="w-full border-collapse text-left text-sm">
          <thead class="bg-violet-100/70 text-violet-800">
            <tr>
              <th class="px-4 py-2 font-semibold">Slot</th>
              <th class="px-4 py-2 font-semibold">Renders</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-t border-violet-100">
              <td class="px-4 py-3 font-mono text-[0.8125rem] text-violet-700">#header</td>
              <td class="px-4 py-3 text-violet-900/70">Only when filled</td>
            </tr>
            <tr class="border-t border-violet-100">
              <td class="px-4 py-3 font-mono text-[0.8125rem] text-violet-700">default</td>
              <td class="px-4 py-3 text-violet-900/70">Always</td>
            </tr>
            <tr class="border-t border-violet-100">
              <td class="px-4 py-3 font-mono text-[0.8125rem] text-violet-700">#footer</td>
              <td class="px-4 py-3 text-violet-900/70">Only when filled</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
