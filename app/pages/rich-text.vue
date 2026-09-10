<script setup lang="ts">
import { ref } from "vue";

useHead({ title: "Rich Text" });

const html = ref(`
  <h2>Course overview</h2>
  <p>This block was typed in the editor above. No template exists for it.</p>
  <ul>
    <li>Preflight removes list markers</li>
    <li>and link colour</li>
    <li>and block margins</li>
  </ul>
  <p>
    Editor copy needs all three back, but only here. See the
    <a href="https://reka-ui.com">Reka docs</a>.
  </p>
  <blockquote>The markup arrives as a string at runtime.</blockquote>
`);
</script>

<template>
  <div class="flex w-full max-w-3xl flex-col gap-10 p-6">
    <DocsSection as="header">
      <DocsSourceLink />
      <DocsHeading as="h1">Rich Text</DocsHeading>
      <DocsParagraph>
        A WYSIWYG field, and the one case where a Tailwind utility beats a
        component.
      </DocsParagraph>
    </DocsSection>

    <DocsSection as="main">
      <DocsHeading as="h2">Editing</DocsHeading>
      <DocsNote>
        The editor writes an HTML string. Everything below renders that same
        string.
      </DocsNote>
      <DocsCard>
        <NDRichTextInput v-model="html" />
      </DocsCard>

      <DocsHeading as="h2">Why this needs a utility</DocsHeading>
      <DocsNote>
        Both panels render the identical string. The left one has no class on
        the wrapper. There is no template to add one to the tags inside, because
        the editor made them at runtime.
      </DocsNote>

      <div class="grid gap-4 md:grid-cols-2">
        <DocsCard>
          <DocsHeading as="h3">Plain v-html</DocsHeading>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="text-sm" v-html="html" />
        </DocsCard>

        <DocsCard>
          <DocsHeading as="h3">NDRichText</DocsHeading>
          <NDRichText :html="html" />
        </DocsCard>
      </div>

      <DocsNote>
        One class on the wrapper, descendant rules underneath. The same
        prose-content utility styles the editor body too, so what you type
        matches what ships.
      </DocsNote>
    </DocsSection>
  </div>
</template>
