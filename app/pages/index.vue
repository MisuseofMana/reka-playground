<script setup lang="ts">
const router = useRouter();

useHead({ title: "Reka Playground" });

const TITLES: Record<string, string> = {
  "css-modules": "CSS Modules",
  "class-variance-authority": "Class Variance Authority (CVA)",
};

function titleize(slug: string) {
  return (
    TITLES[slug] ??
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

type Entry = { path: string; title: string; group: string };

const entries: Entry[] = router
  .getRoutes()
  .filter(
    (route) =>
      route.path !== "/" &&
      !route.path.includes(":") &&
      !route.path.includes("*") &&
      !route.path.startsWith("/__"),
  )
  .map((route) => {
    const segments = route.path.split("/").filter(Boolean);
    const last = segments[segments.length - 1]!;
    return {
      path: route.path,
      title: titleize(last),
      group: segments.length > 1 ? titleize(segments[0]!) : "Root",
    };
  })
  .sort((a, b) => a.path.localeCompare(b.path));

const groups: { name: string; entries: Entry[] }[] = [];
for (const entry of entries) {
  const existing = groups.find((group) => group.name === entry.group);
  if (existing) existing.entries.push(entry);
  else groups.push({ name: entry.group, entries: [entry] });
}
groups.sort((a, b) =>
  a.name === "Root" ? 1 : b.name === "Root" ? -1 : a.name.localeCompare(b.name),
);
</script>

<template>
  <div class="flex w-full max-w-3xl flex-col gap-8 p-6">
    <header class="flex flex-col gap-2">
      <h1 class="text-4xl font-bold text-brand-700">Reka Playground</h1>
      <NDParagraph>
        Experiments in component composition and styling strategy — Reka UI, CSS
        Modules, Tailwind, and CVA.
      </NDParagraph>
      <p class="text-xs text-brand-900/50">
        This list is generated from the Nuxt router, so it always matches what
        is actually in <strong>app/pages/</strong>.
      </p>
    </header>

    <section
      v-for="group in groups"
      :key="group.name"
      class="flex flex-col gap-3"
    >
      <h2
        class="text-base font-semibold tracking-wide text-brand-700 uppercase"
      >
        {{ group.name }}
      </h2>

      <ul class="flex flex-col gap-2">
        <li v-for="entry in group.entries" :key="entry.path">
          <NuxtLink
            :to="entry.path"
            class="group flex items-baseline justify-between gap-4 rounded-xl border border-brand-200 bg-white px-4 py-3 transition-colors hover:border-brand-400 hover:bg-brand-50"
          >
            <span class="font-semibold text-brand-800">{{ entry.title }}</span>
            <span
              class="font-mono text-xs text-brand-900/45 group-hover:text-brand-700"
            >
              {{ entry.path }}
            </span>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <p v-if="!groups.length" class="text-sm text-brand-900/70">
      No pages found besides this one.
    </p>
  </div>
</template>
