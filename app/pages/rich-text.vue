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
      <NDHeading as="h1">Rich Text</NDHeading>
      <NDParagraph>
        A WYSIWYG field, and the one case where a Tailwind utility beats a
        component.
      </NDParagraph>
    </DocsSection>

    <DocsSection as="main">
      <NDHeading as="h2">Editing</NDHeading>
      <NDParagraph>
        The editor writes an HTML string. Everything below renders that same
        string.
      </NDParagraph>
      <NDCard>
        <NDRichTextInput v-model="html" />
      </NDCard>

      <NDHeading as="h2">Why this needs a utility</NDHeading>
      <NDParagraph>
        Both panels render the identical string into a div. The only difference
        is one class on the wrapper. There is no template to add classes to the
        tags inside, because the editor made them at runtime.
      </NDParagraph>

      <div class="grid gap-4 md:grid-cols-2">
        <NDCard>
          <DocsSection as="div">
            <NDHeading as="h3">Plain v-html</NDHeading>
            <p class="font-mono text-xs text-brand-900/55">
              &lt;div v-html="html" /&gt;
            </p>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="text-sm" v-html="html" />
          </DocsSection>
        </NDCard>

        <NDCard>
          <DocsSection as="div">
            <NDHeading as="h3">NDRichText</NDHeading>
            <p class="font-mono text-xs text-brand-900/55">
              &lt;div class="prose-content" v-html="html" /&gt;
            </p>
            <NDRichText :html="html" />
          </DocsSection>
        </NDCard>
      </div>

      <NDParagraph>
        One class on the wrapper, descendant rules underneath. The same
        prose-content utility styles the editor body too, so what you type
        matches what ships.
      </NDParagraph>
    </DocsSection>
  </div>
</template>
