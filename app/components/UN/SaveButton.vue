<script setup lang="ts">
import { formSaveButtonRecipe } from "./SaveButton.recipe";

const classes = formSaveButtonRecipe();
</script>

<template>
  <button :class="classes" type="submit">
    Save
  </button>
</template>
