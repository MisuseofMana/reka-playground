import { defineRule } from 'vee-validate'

export default defineNuxtPlugin(() => {
  defineRule('required', (value: unknown) => {
    const text = typeof value === 'string' ? value.trim() : value

    if (
      text === null
      || text === undefined
      || text === false
      || (typeof text === 'string' && !text.length)
      || (Array.isArray(text) && !text.length)
    ) {
      return 'This field is required.'
    }

    return true
  })

  defineRule('max', (value: unknown, [limit]: [string | number]) => {
    if (value === null || value === undefined || (typeof value === 'string' && !value.length)) {
      return true
    }

    const max = Number(limit)

    if (typeof value === 'string' && value.length > max) {
      return `This field must be ${max} characters or fewer.`
    }

    return true
  })
})
