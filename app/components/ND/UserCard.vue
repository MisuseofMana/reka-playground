<script setup lang="ts">
import styles from "./UserCard.module.css";

// NDCard and NDAvatar are auto-imported. This component owns no surface styling
// of its own — it borrows Card's shell and Avatar's badge, and only styles the
// small identity block that is genuinely its own.
const props = defineProps<{
  name: string;
  role: string;
}>();

defineSlots<{
  /** Body copy for this person. */
  default?: () => unknown;
  /** Forwarded to the card's footer. Receives the user, so the parent can
      write copy like "Message Ada" without repeating the name. Note the prop
      is `user`, not `name` — `name` is reserved on `<slot>` and binding it
      would rename the slot instead of passing a value. */
  actions?: (props: { user: { name: string; role: string } }) => unknown;
}>();
</script>

<template>
  <NDCard>
    <template #header>
      <div :class="styles.identity">
        <NDAvatar :name="name" />
        <div :class="styles.meta">
          <p :class="styles.name">{{ name }}</p>
          <p :class="styles.role">{{ role }}</p>
        </div>
      </div>
    </template>

    <slot />

    <template v-if="$slots.actions" #footer>
      <slot name="actions" :user="{ name: props.name, role: props.role }" />
    </template>
  </NDCard>
</template>
