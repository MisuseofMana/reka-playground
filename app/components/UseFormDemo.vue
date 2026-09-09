<script setup lang="ts">
import { useForm } from "vee-validate";
import { ref } from "vue";

const { handleSubmit } = useForm({
  validationSchema: {
    firstName: "required",
    lastName: "required",
    email: "required|max:50",
  },
});

const result = ref<Record<string, string> | null>(null);

const onSubmit = handleSubmit((values) => {
  result.value = values as Record<string, string>;
});
</script>

<template>
  <form class="flex flex-col gap-5" @submit="onSubmit">
    <NDFormInput name="firstName" label="First Name" has-asterisk />
    <NDFormInput name="lastName" label="Last Name" has-asterisk />
    <NDFormInput name="email" label="Email" type="email" has-asterisk />
    <NDFormSaveButton />
    <pre
      v-if="result"
      class="rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 p-4 font-mono text-sm text-emerald-800"
    >{{ JSON.stringify(result, null, 2) }}</pre>
  </form>
</template>
