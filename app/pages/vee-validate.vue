<script setup lang="ts">
import { ref } from "vue";

useHead({ title: "vee-validate" });

const section = "flex flex-col gap-3";
const sectionTitle = "text-base font-semibold tracking-wide text-violet-700";
const note =
  "text-sm leading-relaxed text-violet-900/70 [&_code]:rounded-md [&_code]:bg-violet-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.8125rem] [&_code]:text-violet-700";
const card = "rounded-2xl border border-violet-200 bg-white p-6";
const fileName =
  "flex items-center gap-2 rounded-t-2xl border border-b-0 border-violet-200 bg-violet-100/70 px-4 py-2 font-mono text-xs text-violet-700";
const fileBody =
  "overflow-x-auto rounded-b-2xl border border-violet-200 bg-violet-50/50 p-4 font-mono text-[0.8125rem] leading-relaxed whitespace-pre text-violet-800";

const form1Html = `<form @submit="onSubmit">
  <NDFormInput name="firstName" label="First Name" has-asterisk />
  <NDFormInput name="lastName" label="Last Name" has-asterisk />
  <NDFormInput name="email" label="Email" type="email" has-asterisk />
  <NDFormSaveButton />
</form>`;

const form2Html = `<form @submit.prevent="onStandaloneSubmit">
  <NDFormInput
    v-model="username"
    name="username"
    label="Username"
    has-asterisk
  />
  <NDFormInput
    v-model="bio"
    name="bio"
    label="Bio"
  />
  <NDFormSaveButton />
</form>`;

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
    <header :class="section">
      <h1 class="text-4xl font-bold text-violet-700">vee-validate</h1>
      <p class="text-lg text-violet-900/80">
        Proof that
        <code class="font-mono">NDFormInput</code> works with both
        <code class="font-mono">useForm</code> context and standalone
        <code class="font-mono">v-model</code> binding.
      </p>
    </header>

    <section :class="section">
      <h2 :class="sectionTitle">Form 1 — useForm Context</h2>
      <p :class="note">
        Uses <code>useForm</code> with a <code>validationSchema</code>. Each
        <code>NDFormInput</code> connects automatically via
        <code>provide/inject</code>. Validation triggers on blur and blocks
        submission until all rules pass.
      </p>
      <div>
        <div :class="fileName">UseFormDemo.vue — template</div>
        <pre :class="fileBody">{{ form1Html }}</pre>
      </div>
      <div :class="card">
        <UseFormDemo />
      </div>
    </section>

    <section :class="section">
      <h2 :class="sectionTitle">Form 2 — Standalone v-model</h2>
      <p :class="note">
        No <code>useForm</code>. Each <code>NDFormInput</code> is bound with
        <code>v-model</code> to a page-level <code>ref</code>. This proves
        <code>useField</code> works without a form context.
      </p>
      <div>
        <div :class="fileName">vee-validate.vue — template</div>
        <pre :class="fileBody">{{ form2Html }}</pre>
      </div>
      <div :class="card">
        <form class="flex flex-col gap-5" @submit.prevent="onStandaloneSubmit">
          <NDFormInput
            v-model="username"
            name="username"
            label="Username"
            has-asterisk
          />
          <NDFormInput
            v-model="bio"
            name="bio"
            label="Bio"
          />

          <div
            class="rounded-xl border border-violet-100 bg-violet-50/50 p-4"
          >
            <p
              class="mb-2 text-xs font-semibold uppercase tracking-wide text-violet-500"
            >
              Live v-model values
            </p>
            <dl
              class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 font-mono text-sm text-violet-800"
            >
              <dt class="text-violet-500">username:</dt>
              <dd>{{ username || "—" }}</dd>
              <dt class="text-violet-500">bio:</dt>
              <dd>{{ bio || "—" }}</dd>
            </dl>
          </div>

          <NDFormSaveButton />

          <pre
            v-if="standaloneResult"
            class="rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 p-4 font-mono text-sm text-emerald-800"
          >{{ JSON.stringify(standaloneResult, null, 2) }}</pre>
        </form>
      </div>
    </section>
  </div>
</template>
