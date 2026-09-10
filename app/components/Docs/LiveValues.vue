<script setup lang="ts">
defineProps<{
  entries: Record<string, unknown>;
}>();
</script>

<template>
  <div class="rounded-xl border border-brand-100 bg-brand-50/50 p-4">
    <p
      class="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-500"
    >
      Live form values
    </p>
    <dl
      class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 font-mono text-sm text-brand-800"
    >
      <template v-for="(value, key) in entries" :key="key">
        <dt class="text-brand-500">{{ key }}:</dt>
        <dd>{{ value ?? "—" }}</dd>
      </template>
    </dl>
  </div>
</template>
