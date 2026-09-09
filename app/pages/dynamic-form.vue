<script setup lang="ts">
import { useForm } from "vee-validate";
import { ref } from "vue";

useHead({ title: "Dynamic Form" });

const section = "flex flex-col gap-3";
const sectionTitle = "text-base font-semibold tracking-wide text-violet-700";
const note =
  "text-sm leading-relaxed text-violet-900/70 [&_code]:rounded-md [&_code]:bg-violet-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.8125rem] [&_code]:text-violet-700";
const card = "rounded-2xl border border-violet-200 bg-white p-6";

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
    <header :class="section">
      <a
        href="https://github.com/MisuseofMana/reka-playground/blob/main/app/pages/dynamic-form.vue"
        target="_blank"
        class="self-start rounded-lg bg-violet-100 px-2.5 py-1 font-mono text-xs text-violet-600 transition hover:bg-violet-200"
      >
        View source on GitHub &nearr;
      </a>
      <h1 class="text-4xl font-bold text-violet-700">Dynamic Form</h1>
      <p class="text-lg text-violet-900/80">
        A switch that conditionally reveals a validated input field.
      </p>
    </header>

    <section :class="section">
      <h2 :class="sectionTitle">Switch on an optional field</h2>
      <p :class="note">
        The <code>NDSwitch</code> uses <code>v-model</code> to control
        visibility. The <code>NDInput</code> connects to
        <code>useForm</code> via <code>provide/inject</code> — validation only
        applies when the field is visible.
      </p>
      <div :class="card">
        <form class="flex flex-col gap-5" @submit="onSubmit">
          <NDSwitch v-model="showNickname" label="Add a nickname?" />

          <NDInput
            v-if="showNickname"
            name="nickname"
            label="Nickname"
            has-asterisk
          />

          <div class="rounded-xl border border-violet-100 bg-violet-50/50 p-4">
            <p
              class="mb-2 text-xs font-semibold uppercase tracking-wide text-violet-500"
            >
              Live form values
            </p>
            <dl
              class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 font-mono text-sm text-violet-800"
            >
              <dt class="text-violet-500">showNickname:</dt>
              <dd>{{ showNickname }}</dd>
              <dt class="text-violet-500">nickname:</dt>
              <dd>{{ values.nickname || "—" }}</dd>
            </dl>
          </div>

          <NDSaveButton />

          <div
            v-if="result"
            class="rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 p-4 font-mono text-sm text-emerald-800"
          >
            {{ JSON.stringify(result, null, 2) }}
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
