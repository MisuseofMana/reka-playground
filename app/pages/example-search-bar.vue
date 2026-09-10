<script setup lang="ts">
import { ref, computed } from "vue";

useHead({ title: "Search Bar Example" });

const items = [
  "Vue",
  "React",
  "Angular",
  "Svelte",
  "Solid",
  "Nuxt",
  "Next.js",
  "Remix",
  "Astro",
  "Qwik",
  "TypeScript",
  "JavaScript",
  "Python",
  "Rust",
  "Go",
];

const searchTerm = ref("");
const activeFilter = ref("");

function applyFilter() {
  activeFilter.value = searchTerm.value;
}

const filteredItems = computed(() => {
  if (!activeFilter.value.trim()) return items;
  const term = activeFilter.value.toLowerCase();
  return items.filter((item) => item.toLowerCase().includes(term));
});
</script>

<template>
  <div class="flex w-full max-w-3xl min-w-3xl flex-col gap-10 p-6">
    <DocsSection as="header">
      <DocsSourceLink />
      <DocsHeading as="h1">Search Bar</DocsHeading>
      <DocsParagraph>
        <strong>NDInput</strong> with an <strong>NDButton</strong> in its
        trailing slot, used as a search filter without <em>useForm</em>.
      </DocsParagraph>
    </DocsSection>

    <DocsSection>
      <DocsHeading>Filter</DocsHeading>
      <DocsParagraph>
        The button lives inside the input via the
        <em>#trailing</em> slot. Pressing Enter or clicking Search applies the
        filter.
      </DocsParagraph>
      <form @submit.prevent="applyFilter">
        <NDInput v-model="searchTerm" validationName="search" label="Search frameworks">
          <template #trailing>
            <button
              type="submit"
              class="self-stretch bg-brand-600 px-5 font-semibold tracking-wide text-white transition hover:bg-brand-500 active:bg-brand-700"
            >
              Search
            </button>
          </template>
        </NDInput>
      </form>
    </DocsSection>

    <DocsSection>
      <DocsHeading as="h3"> Results </DocsHeading>
      <span
        v-if="activeFilter"
        class="ml-2 rounded-full max-w-sm bg-brand-100 px-2.5 py-0.5 text-xs font-normal text-brand-700"
      >
        Searching for: "{{ activeFilter }}"
      </span>
      <ul class="flex flex-wrap gap-2">
        <li
          v-for="item in filteredItems"
          :key="item"
          class="rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-medium text-brand-800"
        >
          {{ item }}
        </li>
      </ul>
      <p v-if="!filteredItems.length" class="text-sm italic text-brand-900/50">
        No results match "{{ activeFilter }}".
      </p>
    </DocsSection>
  </div>
</template>
