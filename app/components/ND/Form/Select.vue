<script setup lang="ts">
import {
  Label,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "reka-ui";
import { useField } from "vee-validate";
import { computed, useId } from "vue";

const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    placeholder?: string;
    options: { label: string; value: string }[];
    hasAsterisk?: boolean;
  }>(),
  {
    label: "",
    placeholder: "Select…",
    hasAsterisk: false,
  },
);

const inputId = useId();
const errorId = computed(() => `${inputId}-error`);

const { value, errorMessage, handleBlur, handleChange } = useField<string>(
  () => props.name,
);

function onSelect(next: string | undefined) {
  handleChange(next ?? "");
}

function onOpenChange(open: boolean) {
  if (!open) {
    handleBlur();
  }
}

const formattedLabel = computed(() => {
  return props.label + (props.hasAsterisk ? "*" : "");
});
</script>

<template>
  <div class="nd-form-select">
    <Label class="nd-form-select__label" :for="inputId">
      {{ formattedLabel }}
    </Label>
    <SelectRoot
      :model-value="value || undefined"
      @update:model-value="onSelect"
      @update:open="onOpenChange"
    >
      <SelectTrigger
        :id="inputId"
        class="nd-form-select__trigger"
        :aria-invalid="!!errorMessage"
        :aria-describedby="errorMessage ? errorId : undefined"
      >
        <SelectValue :placeholder="placeholder" />
        <SelectIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectContent
          class="nd-form-select__content"
          position="popper"
          :side-offset="4"
        >
          <SelectViewport class="nd-form-select__viewport">
            <SelectItem
              v-for="option in options"
              :key="option.value"
              class="nd-form-select__item"
              :value="option.value"
            >
              <SelectItemText>{{ option.label }}</SelectItemText>
              <SelectItemIndicator>✓</SelectItemIndicator>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
    <p
      v-if="errorMessage"
      :id="errorId"
      class="nd-form-select__error"
      role="alert"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.nd-form-select {
  @apply flex flex-col gap-1.5;
}

.nd-form-select__label {
  @apply text-sm font-semibold tracking-wide text-violet-700;
}

.nd-form-select__trigger {
  @apply flex w-full items-center justify-between rounded-2xl border-2 border-violet-200 bg-violet-50/50 px-3 py-2 text-left shadow-sm outline-none transition hover:border-violet-300 focus:border-violet-500 focus:bg-white focus:shadow-md focus:ring-4 focus:ring-violet-200 data-[state=open]:border-violet-500 data-[state=open]:bg-white data-[state=open]:ring-4 data-[state=open]:ring-violet-200 aria-invalid:border-rose-400 aria-invalid:bg-rose-50;
}

.nd-form-select__error {
  @apply m-0 text-sm font-medium text-rose-500;
}
</style>

<style>
@reference "tailwindcss";

.nd-form-select__content {
  @apply z-50 w-[var(--reka-select-trigger-width)] overflow-hidden rounded-2xl border-2 border-violet-200 bg-white shadow-lg;
}

.nd-form-select__viewport {
  @apply p-1;
}

.nd-form-select__item {
  @apply cursor-pointer rounded-xl px-3 py-2 transition data-[highlighted]:bg-violet-100 data-[highlighted]:text-violet-900;
}
</style>
