<script setup lang="ts">
import { useForm } from "vee-validate";
import { ref } from "vue";

useHead({ title: "Dynamic Form" });

const showNickname = ref(false);

const { handleSubmit, values } = useForm({
  validationSchema: {
    nickname: (v: string) => {
      if (!showNickname.value) return true;
      return v?.trim() ? true : "Nickname is required when enabled";
    },
  },
});

const result = ref<Record<string, unknown> | null>(null);

const onSubmit = handleSubmit((vals) => {
  result.value = { ...vals, showNickname: showNickname.value };
});
</script>

<template>
  <div class="flex w-full max-w-3xl flex-col gap-10 p-6">
    <DocsSection as="header">
      <DocsSourceLink />
      <NDHeading as="h1">Dynamic Form</NDHeading>
      <NDParagraph>
        A switch that conditionally reveals a validated input field.
      </NDParagraph>
    </DocsSection>

    <DocsSection as="main">
      <NDHeading as="h2"> Switch on an optional field </NDHeading>
      <NDParagraph>
        The <strong>NDSwitch</strong> uses <em>v-model</em> to control
        visibility. The <strong>NDInput</strong> connects to
        <em>useForm</em> via <em>provide/inject</em> — validation only applies
        when the field is visible.
      </NDParagraph>
      <NDCard>
        <form class="flex flex-col gap-5" @submit="onSubmit">
          <NDSwitch v-model="showNickname" label="Add a nickname?" />

          <NDInput
            v-if="showNickname"
            validationName="nickname"
            label="Nickname"
            has-asterisk
          />
          <NDSaveButton />
        </form>
      </NDCard>
      <DocsLiveValues
        :entries="{
          showNickname,
          nickname: values.nickname,
        }"
      />
      <DocsSubmitResult :result="result" />
    </DocsSection>
  </div>
</template>
