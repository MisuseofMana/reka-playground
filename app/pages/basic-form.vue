<script setup lang="ts">
import { useForm } from "vee-validate";

const { handleSubmit, values } = useForm({
  validationSchema: {
    userRole: "required",
    name: "required",
    surname: "required",
  },
});

const onSubmit = handleSubmit((values) => {
  // eslint-disable-next-line no-alert
  alert(`Submitted form successfully.`);
});
</script>

<template>
  <div>
    <pre class="mb-6">{{ values }}</pre>

    <form @submit="onSubmit">
      <div class="mb-3 flex flex-row gap-3">
        <NDFormInput name="name" label="Name" hasAsterisk />
        <NDFormInput name="surname" label="Surname" hasAsterisk />
      </div>
      <NDFormSelect
        class="mb-6"
        name="userRole"
        label="User Role"
        hasAsterisk
        :options="[
          { label: 'Admin', value: 'admin' },
          { label: 'Editor', value: 'editor' },
          { label: 'Viewer', value: 'viewer' },
        ]"
      />
      <NDFormSaveButton />
    </form>
  </div>
</template>
