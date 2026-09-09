<script setup lang="ts">
import { ref, computed } from "vue";

useHead({ title: "Search Bar Example" });

const section = "flex flex-col gap-3";
const sectionTitle = "text-base font-semibold tracking-wide text-violet-700";
const note =
  "text-sm leading-relaxed text-violet-900/70 [&_code]:rounded-md [&_code]:bg-violet-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.8125rem] [&_code]:text-violet-700";

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
  <div class="flex w-full max-w-3xl flex-col gap-10 p-6">
    <header class="flex flex-col gap-3">
      <a
        href="https://github.com/MisuseofMana/reka-playground/blob/main/app/pages/example-search-bar.vue"
        target="_blank"
        class="self-start rounded-lg bg-violet-100 px-2.5 py-1 font-mono text-xs text-violet-600 transition hover:bg-violet-200"
      >
        View source on GitHub &nearr;
      </a>
      <h1 class="text-4xl font-bold text-violet-700">Search Bar</h1>
      <p class="text-lg text-violet-900/80">
        <code class="font-mono">NDFormInput</code> with an
        <code class="font-mono">NDButton</code> in its trailing slot, used as a
        search filter without <code class="font-mono">useForm</code>.
      </p>
    </header>

    <section :class="section">
      <h2 :class="sectionTitle">Filter</h2>
      <p :class="note">
        The button lives inside the input via the
        <code>#trailing</code> slot. Pressing Enter or clicking Search applies
        the filter.
      </p>
      <form @submit.prevent="applyFilter">
        <NDFormInput
          v-model="searchTerm"
          name="search"
          label="Search frameworks"
        >
          <template #trailing>
            <button
              type="submit"
              class="self-stretch bg-violet-600 px-5 font-semibold tracking-wide text-white transition hover:bg-violet-500 active:bg-violet-700"
            >
              Search
            </button>
          </template>
        </NDFormInput>
      </form>
    </section>

    <section :class="section">
      <h2 :class="sectionTitle">
        Results
        <span
          v-if="activeFilter"
          class="ml-2 rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-normal text-violet-700"
        >
          "{{ activeFilter }}"
        </span>
      </h2>
      <ul class="flex flex-col gap-1.5">
        <li
          v-for="item in filteredItems"
          :key="item"
          class="rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-sm font-medium text-violet-800"
        >
          {{ item }}
        </li>
      </ul>
      <p v-if="!filteredItems.length" class="text-sm italic text-violet-900/50">
        No results match "{{ activeFilter }}".
      </p>
    </section>
  </div>
</template>
