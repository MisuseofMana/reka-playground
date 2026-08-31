<script setup lang="ts">
import { Label } from "reka-ui";
import { useField } from "vee-validate";
import { computed, useId } from "vue";

const props = withDefaults(
  defineProps<{
    name: string;
    type?: string;
    label?: string;
    hasAsterisk?: boolean;
    autocomplete?: string;
  }>(),
  {
    type: "text",
    label: "",
    autocomplete: "off",
  },
);

const inputId = useId();
const errorId = computed(() => `${inputId}-error`);

const formattedLabel = computed(() => {
  return props.label + (props.hasAsterisk ? "*" : "");
});

const { value, errorMessage, handleBlur } = useField<string>(() => props.name);
</script>

<template>
  <div class="nd-form-input">
    <Label class="nd-form-input__label" :for="inputId">
      {{ formattedLabel }}
    </Label>
    <input
      :id="inputId"
      v-model="value"
      class="nd-form-input__control"
      :name="name"
      :type="type"
      :autocomplete="autocomplete"
      :aria-invalid="!!errorMessage"
      :aria-describedby="errorMessage ? errorId : undefined"
      @blur="handleBlur"
    />
    <p
      v-if="errorMessage"
      :id="errorId"
      class="nd-form-input__error"
      role="alert"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.nd-form-input {
  @apply flex flex-col gap-1.5;
}

.nd-form-input__label {
  @apply text-sm font-semibold tracking-wide text-violet-700;
}

.nd-form-input__control {
  @apply rounded-2xl border-2 border-violet-200 bg-violet-50/50 px-3 py-2 shadow-sm outline-none transition hover:border-violet-300 focus:border-violet-500 focus:bg-white focus:shadow-md focus:ring-4 focus:ring-violet-200 aria-invalid:border-rose-400 aria-invalid:bg-rose-50 aria-invalid:focus:ring-rose-200;
}

.nd-form-input__error {
  @apply m-0 text-sm font-medium text-rose-500;
}
</style>
