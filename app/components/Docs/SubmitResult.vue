<script setup lang="ts">
defineProps<{
  result: Record<string, unknown> | null;
}>();
</script>

<template>
  <div
    v-if="result"
    class="rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 p-4 font-mono text-sm text-emerald-800"
  >
    {{ JSON.stringify(result, null, 2) }}
  </div>
</template>
