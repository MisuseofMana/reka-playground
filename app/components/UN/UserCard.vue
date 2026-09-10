<script setup lang="ts">
import { userCardRecipe } from "./UserCard.recipe";

const props = defineProps<{
  name: string;
  role: string;
}>();

const classes = userCardRecipe();

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
      <div :class="classes.identity()">
        <NDAvatar :name="name" />
        <div :class="classes.meta()">
          <p :class="classes.name()">{{ name }}</p>
          <p :class="classes.role()">{{ role }}</p>
        </div>
      </div>
    </template>

    <slot />

    <template v-if="$slots.actions" #footer>
      <slot name="actions" :user="{ name: props.name, role: props.role }" />
    </template>
  </NDCard>
</template>
