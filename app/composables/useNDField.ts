import { computed, useId } from "vue";
import { useField } from "vee-validate";

export interface NDFieldProps {
  name?: string;
  validationName?: string;
  rules?: unknown;
  label?: string;
  validationLabel?: string;
  required?: boolean;
}

export function useNDField<T>(props: NDFieldProps) {
  const errorId = useId();
  const inputId = useId();

  const validationLabel = computed(() => props.validationLabel ?? props.label);
  const fieldName = computed(() => props.validationName ?? props.name);

  const field = useField<T>(() => fieldName.value ?? inputId, undefined, {
    standalone: !fieldName.value,
    syncVModel: true,
    label: validationLabel,
  });

  const hasError = computed(() => Boolean(field.errorMessage.value));
  const describedby = computed(() => (hasError.value ? errorId : undefined));

  return { ...field, errorId, hasError, describedby, inputId };
}
