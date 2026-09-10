<script setup lang="ts">
import { useForm } from "vee-validate";
import { ref } from "vue";

useHead({ title: "vee-validate" });

const { handleSubmit, values } = useForm({
  validationSchema: {
    firstName: "required",
    lastName: "required",
    email: "required|max:50",
  },
});

const formResult = ref<Record<string, string> | null>(null);

const onFormSubmit = handleSubmit((values) => {
  formResult.value = values as Record<string, string>;
});

const username = ref("");
const bio = ref("");
const standaloneResult = ref<Record<string, string> | null>(null);

function onStandaloneSubmit() {
  if (!username.value.trim()) return;
  standaloneResult.value = {
    username: username.value,
    bio: bio.value,
  };
}
</script>

<template>
  <div class="flex w-full max-w-3xl flex-col gap-10 p-6">
    <DocsSection as="header">
      <DocsSourceLink />
      <h1 class="text-4xl font-bold text-brand-700">vee-validate</h1>
      <NDParagraph>
        Proof that
        <strong>NDInput</strong> works with both <em>useForm</em> context and
        standalone <em>v-model</em> binding.
      </NDParagraph>
    </DocsSection>

    <DocsSection>
      <NDHeading>Form 1 — useForm Context</NDHeading>
      <NDParagraph>
        Uses <em>useForm</em> with a <em>validationSchema</em>. Each
        <strong>NDInput</strong> connects automatically via
        <em>provide/inject</em>. Validation triggers on blur and blocks
        submission until all rules pass.
      </NDParagraph>
      <NDCard>
        <form class="flex flex-col gap-5" @submit="onFormSubmit">
          <NDInput validationName="firstName" label="First Name" has-asterisk />
          <NDInput validationName="lastName" label="Last Name" has-asterisk />
          <NDInput
            validationName="email"
            label="Email"
            type="email"
            has-asterisk
          />
          <NDSaveButton />
        </form>
      </NDCard>
      <DocsLiveValues
        :entries="{
          firstname: values.firstName,
          lastname: values.lastName,
          email: values.email,
        }"
      />
      <DocsSubmitResult :result="formResult" />
    </DocsSection>

    <DocsSection>
      <NDHeading>Form 2 — Standalone v-model</NDHeading>
      <NDParagraph>
        No <em>useForm</em>. Each <strong>NDInput</strong> is bound with
        <em>v-model</em> to a page-level <em>ref</em>. This proves
        <em>useField</em> works without a form context.
      </NDParagraph>
      <NDCard>
        <form class="flex flex-col gap-5" @submit.prevent="onStandaloneSubmit">
          <NDInput v-model="username" label="Username" has-asterisk />
          <NDInput v-model="bio" label="Bio" />
          <NDSaveButton />
        </form>
      </NDCard>
      <DocsLiveValues :entries="{ username, bio }" />
      <DocsSubmitResult :result="standaloneResult" />
    </DocsSection>
  </div>
</template>
