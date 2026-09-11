<script setup lang="ts">
import { useForm } from "vee-validate";
import { ref } from "vue";

useHead({ title: "vee-validate" });

const { handleSubmit, values } = useForm({
  validationSchema: {
    yourName: "required",
  },
});

const formResult = ref<Record<string, string> | null>(null);

const onFormSubmit = handleSubmit((values) => {
  formResult.value = values as Record<string, string>;
});
</script>

<template>
  <div class="flex w-full max-w-3xl flex-col gap-10 p-6">
    <DocsSection as="header">
      <DocsSourceLink />
      <h1 class="text-4xl font-bold text-brand-700">vee-validate</h1>
      <NDParagraph>
        <strong>NDInput</strong> with <em>useForm</em> context and a
        <em>validationSchema</em>. Validation triggers on blur and blocks
        submission until all rules pass.
      </NDParagraph>
    </DocsSection>

    <DocsSection>
      <NDCard>
        <form class="flex flex-col gap-5" @submit="onFormSubmit">
          <NDInput validationName="yourName" label="Your Name" has-asterisk />
          <UNSaveButton />
        </form>
      </NDCard>
      <DocsLiveValues
        :entries="{
          yourName: values.yourName,
        }"
      />
      <DocsSubmitResult :result="formResult" />
    </DocsSection>
  </div>
</template>
