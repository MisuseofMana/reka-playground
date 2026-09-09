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
import { formSelectRecipe } from "./Select.recipe";

const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    placeholder?: string;
    options: { label: string; value: string }[];
    hasAsterisk?: boolean;
    modelValue?: string;
  }>(),
  {
    label: "",
    placeholder: "Select…",
    hasAsterisk: false,
  },
);

const inputId = useId();
const errorId = computed(() => `${inputId}-error`);

const { value, errorMessage, handleBlur } = useField<string>(
  () => props.name,
  undefined,
  { syncVModel: true },
);

function onSelect(next: string | undefined) {
  value.value = next ?? "";
}

function onOpenChange(open: boolean) {
  if (!open) {
    handleBlur();
  }
}

const formattedLabel = computed(() => {
  return props.label + (props.hasAsterisk ? "*" : "");
});

const classes = formSelectRecipe();
</script>

<template>
  <div :class="classes.root()">
    <Label :class="classes.label()" :for="inputId">
      {{ formattedLabel }}
    </Label>
    <SelectRoot
      :model-value="value || undefined"
      @update:model-value="onSelect"
      @update:open="onOpenChange"
    >
      <SelectTrigger
        :id="inputId"
        :class="classes.trigger()"
        :aria-invalid="!!errorMessage"
        :aria-describedby="errorMessage ? errorId : undefined"
      >
        <SelectValue :placeholder="placeholder" />
        <SelectIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectContent
          :class="classes.content()"
          position="popper"
          :side-offset="4"
        >
          <SelectViewport :class="classes.viewport()">
            <SelectItem
              v-for="option in options"
              :key="option.value"
              :class="classes.item()"
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
      :class="classes.error()"
      role="alert"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
