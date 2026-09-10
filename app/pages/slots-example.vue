<script setup lang="ts">
useHead({ title: "Slots" });

const heading = "font-semibold text-brand-800";
const muted = "text-xs text-brand-900/50";
const badge =
  "rounded-full bg-brand-100 px-2 py-0.5 font-mono text-[0.6875rem] text-brand-700";
</script>

<template>
  <div class="flex w-full max-w-3xl flex-col gap-10 p-6">
    <DocsSection as="header">
      <DocsSourceLink />
      <DocsHeading as="h1">Slots</DocsHeading>
      <DocsParagraph>
        <strong>NDCard</strong> provides three content areas: a header, a body,
        and a footer. The card owns the layout — the caller owns the content.
      </DocsParagraph>
    </DocsSection>

    <DocsSection>
      <DocsHeading>Body only</DocsHeading>
      <DocsParagraph>
        Content between the tags becomes the body. No slots needed.
      </DocsParagraph>
      <NDCard>A card with nothing but body content.</NDCard>
    </DocsSection>

    <DocsSection>
      <DocsHeading>Header + body</DocsHeading>
      <DocsParagraph>
        The header is a flex row with <em>space-between</em>, so two children
        split to opposite ends automatically.
      </DocsParagraph>
      <NDCard>
        <template #header>
          <span :class="heading">Weekly digest</span>
          <span :class="muted">Sep 4</span>
        </template>
        Two children in the header sit at opposite ends without extra layout.
      </NDCard>
    </DocsSection>

    <DocsSection>
      <DocsHeading>Body + footer</DocsHeading>
      <DocsParagraph>
        The footer right-aligns and spaces its children — ready for action
        buttons.
      </DocsParagraph>
      <NDCard>
        Footer buttons are right-aligned for you.
        <template #footer>
          <NDButton looksLike="ghost" size="sm">Dismiss</NDButton>
          <NDButton size="sm">Save</NDButton>
        </template>
      </NDCard>
    </DocsSection>

    <DocsSection>
      <DocsHeading>All three</DocsHeading>
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
    </DocsSection>

    <DocsSection>
      <DocsHeading>Unfilled slots leave no trace</DocsHeading>
      <DocsParagraph>
        If you skip the header or footer, the element isn't rendered at all — no
        empty wrapper, no extra gap.
      </DocsParagraph>
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
    </DocsSection>

    <DocsSection>
      <DocsHeading>Composing on top of slots</DocsHeading>
      <DocsParagraph>
        <strong>NDUserCard</strong> wraps <strong>NDCard</strong> — it fills the
        header with an identity block and re-exposes the footer as an
        <em>#actions</em> slot. The scoped slot hands back the user object so
        the caller can reference it.
      </DocsParagraph>
      <NDUserCard name="Ada Lovelace" role="Analytical Engine, Note G">
        Wrote the first algorithm intended to be carried out by a machine.

        <template #actions="{ user }">
          <NDButton looksLike="ghost" size="sm">
            Message {{ user.name }}
          </NDButton>
          <NDButton size="sm">Follow</NDButton>
        </template>
      </NDUserCard>
    </DocsSection>

    <DocsSection>
      <DocsHeading>Slot reference</DocsHeading>
      <div class="overflow-x-auto rounded-2xl border border-brand-200">
        <table class="w-full border-collapse text-left text-sm">
          <thead class="bg-brand-100/70 text-brand-800">
            <tr>
              <th class="px-4 py-2 font-semibold">Slot</th>
              <th class="px-4 py-2 font-semibold">Renders</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-t border-brand-100">
              <td class="px-4 py-3 font-mono text-[0.8125rem] text-brand-700">
                #header
              </td>
              <td class="px-4 py-3 text-brand-900/70">Only when filled</td>
            </tr>
            <tr class="border-t border-brand-100">
              <td class="px-4 py-3 font-mono text-[0.8125rem] text-brand-700">
                default
              </td>
              <td class="px-4 py-3 text-brand-900/70">Always</td>
            </tr>
            <tr class="border-t border-brand-100">
              <td class="px-4 py-3 font-mono text-[0.8125rem] text-brand-700">
                #footer
              </td>
              <td class="px-4 py-3 text-brand-900/70">Only when filled</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DocsSection>
  </div>
</template>
