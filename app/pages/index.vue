<script setup lang="ts">
const router = useRouter();

useHead({ title: "Reka Playground" });

/* Slugs whose automatic Title Case would come out wrong — acronyms, mostly.
   Anything not listed falls through to `titleize` below, so a new page needs an
   entry here only if its name has unusual casing. */
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

/* Read from the router instead of a hand-kept array: dropping a file into
   pages/ puts it on this index with no second edit, and deleting one cannot
   leave a dead link behind. Routes are static after build, so this needs no
   reactivity. */
const entries: Entry[] = router
  .getRoutes()
  .filter(
    (route) =>
      // This page itself.
      route.path !== "/" &&
      // Dynamic and catch-all routes: not destinations you can link to.
      !route.path.includes(":") &&
      !route.path.includes("*") &&
      // Routes injected by modules rather than files in pages/. Compodium
      // registers /__compodium__/renderer, and Nuxt reserves the `__` prefix
      // for internals generally, so this covers devtools too.
      !route.path.startsWith("/__"),
  )
  .map((route) => {
    const segments = route.path.split("/").filter(Boolean);
    const last = segments[segments.length - 1]!;
    return {
      path: route.path,
      title: titleize(last),
      // A page nested in a directory groups under it; top-level pages fall
      // into a catch-all bucket.
      group: segments.length > 1 ? titleize(segments[0]!) : "Other",
    };
  })
  .sort((a, b) => a.path.localeCompare(b.path));

const groups: { name: string; entries: Entry[] }[] = [];
for (const entry of entries) {
  const existing = groups.find((group) => group.name === entry.group);
  if (existing) existing.entries.push(entry);
  else groups.push({ name: entry.group, entries: [entry] });
}
/* "Other" last — it reads as leftovers rather than a topic. */
groups.sort((a, b) =>
  a.name === "Other"
    ? 1
    : b.name === "Other"
      ? -1
      : a.name.localeCompare(b.name),
);
</script>

<template>
  <div class="flex w-full max-w-3xl flex-col gap-8 p-6">
    <header class="flex flex-col gap-2">
      <h1 class="text-4xl font-bold text-violet-700">Reka Playground</h1>
      <p class="text-lg text-violet-900/80">
        Experiments in component composition and styling strategy — Reka UI, CSS
        Modules, Tailwind, and CVA.
      </p>
      <p class="text-xs text-violet-900/50">
        This list is generated from the Nuxt router, so it always matches what
        is actually in <code class="font-mono">app/pages/</code>.
      </p>
    </header>

    <section
      v-for="group in groups"
      :key="group.name"
      class="flex flex-col gap-3"
    >
      <h2
        class="text-base font-semibold tracking-wide text-violet-700 uppercase"
      >
        {{ group.name }}
      </h2>

      <ul class="flex flex-col gap-2">
        <li v-for="entry in group.entries" :key="entry.path">
          <NuxtLink
            :to="entry.path"
            class="group flex items-baseline justify-between gap-4 rounded-xl border border-violet-200 bg-white px-4 py-3 transition-colors hover:border-violet-400 hover:bg-violet-50"
          >
            <span class="font-semibold text-violet-800">{{ entry.title }}</span>
            <span
              class="font-mono text-xs text-violet-900/45 group-hover:text-violet-700"
            >
              {{ entry.path }}
            </span>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <p v-if="!groups.length" class="text-sm text-violet-900/70">
      No pages found besides this one.
    </p>
  </div>
</template>
