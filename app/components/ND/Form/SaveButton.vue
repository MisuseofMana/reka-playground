<template>
  <button class="nd-form-save-button" type="submit">
    Save
  </button>
</template>

<style scoped>
@reference "tailwindcss";

.nd-form-save-button {
  @apply w-fit rounded-full bg-rose-500 px-6 py-2 font-semibold tracking-wide text-white shadow-md shadow-rose-200 transition hover:-translate-y-0.5 hover:bg-rose-400 hover:shadow-lg hover:shadow-rose-200 active:translate-y-0 active:scale-95;
}
</style>
