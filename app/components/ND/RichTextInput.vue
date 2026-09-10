<script setup lang="ts">
import { onMounted, ref } from "vue";
import { richTextInputRecipe } from "./RichTextInput.recipe";

type Tool = {
  label: string;
  command: string;
  value?: string;
  title: string;
};

const model = defineModel<string>({ default: "" });
const editor = ref<HTMLDivElement | null>(null);
const classes = richTextInputRecipe();

const TOOLS: Tool[] = [
  { label: "B", command: "bold", title: "Bold" },
  { label: "I", command: "italic", title: "Italic" },
  { label: "H2", command: "formatBlock", value: "<h2>", title: "Heading" },
  { label: "H3", command: "formatBlock", value: "<h3>", title: "Subheading" },
  { label: "UL", command: "insertUnorderedList", title: "Bullet list" },
  { label: "OL", command: "insertOrderedList", title: "Numbered list" },
  {
    label: "Quote",
    command: "formatBlock",
    value: "<blockquote>",
    title: "Block quote",
  },
  {
    label: "Link",
    command: "createLink",
    value: "https://reka-ui.com",
    title: "Link",
  },
  { label: "Clear", command: "removeFormat", title: "Clear formatting" },
];

// execCommand is deprecated but still works in every current browser and keeps
// this dependency free. A real app swaps this component for CKEditor. The
// styling problem it demonstrates is identical either way.
function run(tool: Tool) {
  editor.value?.focus();
  document.execCommand(tool.command, false, tool.value);
  sync();
}

function sync() {
  model.value = editor.value?.innerHTML ?? "";
}

// Set once. Binding v-html here would fight the user's cursor on every keypress.
onMounted(() => {
  if (editor.value) editor.value.innerHTML = model.value;
});
</script>

<template>
  <div :class="classes.root()">
    <div :class="classes.toolbar()">
      <button
        v-for="tool in TOOLS"
        :key="tool.label"
        type="button"
        :title="tool.title"
        :class="classes.button()"
        @click="run(tool)"
      >
        {{ tool.label }}
      </button>
    </div>

    <div
      ref="editor"
      :class="classes.editor()"
      contenteditable="true"
      role="textbox"
      aria-multiline="true"
      aria-label="Rich text editor"
      @input="sync"
    />
  </div>
</template>
