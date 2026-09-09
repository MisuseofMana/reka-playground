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
          ? 'bg-violet-600 text-white'
          : 'text-violet-600 hover:bg-violet-100'
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
          ? 'bg-violet-600 text-white'
          : 'text-violet-600 hover:bg-violet-100'
      "
    >
      {{ link.title }}
    </NuxtLink>
  </nav>
</template>
