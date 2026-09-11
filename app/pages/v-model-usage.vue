<script setup lang="ts">
import { ref } from "vue";

useHead({ title: "v-model Usage" });

const inputValue = ref("");

const result = ref<Record<string, string> | null>(null);

function onSubmit() {
  if (!inputValue.value.trim()) return;
  result.value = {
    inputValue: inputValue.value,
  };
}
</script>

<template>
  <div class="flex w-full max-w-3xl flex-col gap-10 p-6">
    <DocsSection as="header">
      <DocsSourceLink />
      <h1 class="text-4xl font-bold text-brand-700">v-model Usage</h1>
      <NDParagraph>
        <strong>NDInput</strong> bound with standalone <em>v-model</em> — no
        <em>useForm</em>, no validation schema. Each input is wired directly to
        a page-level <em>ref</em>, proving that <em>syncVModel</em> works
        without a form context.
      </NDParagraph>
    </DocsSection>

    <DocsSection>
      <NDCard>
        <form class="flex flex-col gap-5" @submit.prevent="onSubmit">
          <NDInput v-model="inputValue" label="Type Something!" />
          <UNSaveButton />
        </form>
      </NDCard>
      <DocsLiveValues :entries="{ inputValue }" />
      <DocsSubmitResult :result="result" />
    </DocsSection>
  </div>
</template>
