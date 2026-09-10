<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from "reka-ui";
import { useId } from "vue";
import { switchRecipe } from "./Switch.recipe";

withDefaults(
  defineProps<{
    label?: string;
  }>(),
  {
    label: "Label",
  },
);

const checked = defineModel<boolean>({ default: false });
const inputId = useId();
const classes = switchRecipe();
</script>

<template>
  <div :class="classes.root()">
    <label v-if="label" :class="classes.label()" :for="inputId">
      {{ label }}
    </label>
    <SwitchRoot
      :id="inputId"
      v-model="checked"
      :class="classes.track()"
    >
      <SwitchThumb :class="classes.thumb()" />
    </SwitchRoot>
  </div>
</template>
