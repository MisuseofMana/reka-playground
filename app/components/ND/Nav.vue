<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const TITLES: Record<string, string> = {
  "css-modules": "CSS Modules",
  "class-variance-authority": "CVA",
  "vee-validate": "Vee Validate",
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

const isDev = import.meta.dev;

const links = router
  .getRoutes()
  .filter(
    (r) =>
      r.path !== "/" &&
      !r.path.includes(":") &&
      !r.path.includes("*") &&
      !r.path.startsWith("/__"),
  )
  .map((r) => {
    const segments = r.path.split("/").filter(Boolean);
    return {
      path: r.path,
      title: titleize(segments[segments.length - 1]!),
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title));
</script>

<template>
  <nav class="flex w-full items-center gap-1.5 overflow-x-auto px-4 py-2">
    <NuxtLink
      to="/"
      class="shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors"
      :class="
        route.path === '/'
          ? 'bg-brand-600 text-white'
          : 'text-brand-600 hover:bg-brand-100'
      "
    >
      Home
    </NuxtLink>
    <NuxtLink
      v-for="link in links"
      :key="link.path"
      :to="link.path"
      class="shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors"
      :class="
        route.path === link.path
          ? 'bg-brand-600 text-white'
          : 'text-brand-600 hover:bg-brand-100'
      "
    >
      {{ link.title }}
    </NuxtLink>
    <div v-if="isDev" class="ml-auto border-l border-brand-200 pl-3">
      <a
        href="/__compodium__/devtools/components"
        class="shrink-0 rounded-lg border border-dashed border-brand-300 px-2.5 py-1 text-xs font-semibold tracking-wide text-brand-400 transition-colors hover:border-brand-400 hover:text-brand-600"
      >
        Compodium
      </a>
    </div>
  </nav>
</template>
