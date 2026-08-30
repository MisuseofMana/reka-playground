<script setup lang="ts">
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from 'reka-ui'
import { useForm } from 'vee-validate'

const { handleSubmit, defineField, errors } = useForm({
  initialValues: { email: '' },
  validationSchema: {
    email: (value: string) => {
      if (!value) return 'Email is required.'
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) return 'Email must be a valid email address.'
      return true
    }
  }
})

const [email, emailAttrs] = defineField('email')

const onSubmit = handleSubmit((values) => {
  // eslint-disable-next-line no-alert
  alert(`Submitted email: ${values.email}`)
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <h1>Reka Playground</h1>

    <DialogRoot>
      <DialogTrigger>Open Reka UI Dialog</DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>Vee-Validate Form</DialogTitle>
          <form @submit="onSubmit">
            <label for="email">Email</label>
            <input id="email" v-model="email" v-bind="emailAttrs" type="email">
            <span v-if="errors.email">{{ errors.email }}</span>
            <button type="submit">Submit</button>
          </form>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  </div>
</template>
