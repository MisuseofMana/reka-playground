<template>
  <p class="text-sm text-brand-900/80">
    <slot v-if="$slots.default"></slot>
    <span v-else> New Dawn Paragraph </span>
  </p>
</template>
