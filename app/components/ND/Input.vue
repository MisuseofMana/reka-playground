<script setup lang="ts">
import { Label } from "reka-ui";
import { useField } from "vee-validate";
import { computed, ref, useId } from "vue";
import { formInputRecipe } from "./Input.recipe";

const props = withDefaults(
  defineProps<{
    validationName?: string;
    type?: string;
    label?: string;
    hasAsterisk?: boolean;
    autocomplete?: string;
    modelValue?: string;
  }>(),
  {
    type: "text",
    label: "",
    autocomplete: "off",
  },
);

const emit = defineEmits<{ "update:modelValue": [value: string] }>();

const inputId = useId();
const errorId = computed(() => `${inputId}-error`);

const formattedLabel = computed(() => {
  return props.label + (props.hasAsterisk ? "*" : "");
});

const field = props.validationName
  ? useField<string>(() => props.validationName!, undefined, {
      syncVModel: true,
    })
  : null;

const value = field
  ? field.value
  : computed({
      get: () => props.modelValue ?? "",
      set: (v) => emit("update:modelValue", v),
    });

const errorMessage = field ? field.errorMessage : ref<string | undefined>();
const handleBlur = field ? field.handleBlur : () => {};

const classes = computed(() =>
  formInputRecipe({ invalid: !!errorMessage.value }),
);
</script>

<template>
  <div :class="classes.root()">
    <Label :class="classes.label()" :for="inputId">
      {{ formattedLabel }}
    </Label>
    <div :class="classes.field()">
      <input
        :id="inputId"
        v-model="value"
        :class="classes.control()"
        :name="validationName"
        :type="type"
        :autocomplete="autocomplete"
        :aria-invalid="!!errorMessage"
        :aria-describedby="errorMessage ? errorId : undefined"
        @blur="handleBlur"
      />
      <slot name="trailing" />
    </div>
    <p v-if="errorMessage" :id="errorId" :class="classes.error()" role="alert">
      {{ errorMessage }}
    </p>
  </div>
</template>
