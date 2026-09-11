<script setup lang="ts">
import { Label } from "reka-ui";
import { useNDField } from "~/composables/useNDField";
import { formInputRecipe } from "./Input.recipe";

const props = withDefaults(
  defineProps<{
    dataCy?: string;
    name?: string;
    label?: string;
    validationName?: string;
    validationLabel?: string;
    type?: string;
    required?: boolean;
    modelValue?: string;
  }>(),
  { type: "text" },
);

const { value, errorMessage, errorId, hasError, inputId } =
  useNDField<string>(props);

const classes = computed(() => formInputRecipe({ invalid: hasError.value }));
</script>

<template>
  <div :class="classes.root()">
    <Label :class="classes.label()" :for="inputId">
      {{ label }}
      <span v-if="required" aria-hidden="true">*</span>
    </Label>
    <div :class="classes.field()">
      <input
        :id="inputId"
        v-model="value"
        :name="name"
        :type="type"
        :aria-required="required"
        :aria-invalid="hasError ? 'true' : undefined"
        :aria-describedby="errorId"
        :data-cy="dataCy"
        :class="classes.control()"
      />
      <slot name="trailing" />
    </div>
    <p v-if="hasError" :id="errorId" :class="classes.error()" role="alert">
      {{ errorMessage }}
    </p>
  </div>
</template>
