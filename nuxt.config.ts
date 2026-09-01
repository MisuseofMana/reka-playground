// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@compodium/nuxt'],
  css: ['~/assets/css/main.css'],
  // Nuxt scans pages/ for every extension in `extensions`, not just .vue, so
  // a colocated `*.data.ts` would register as a broken route. Skip those.
  ignore: ['**/*.data.ts'],
  vite: {
    css: {
      modules: {
        // Class names are authored camelCase already; this only guards against a
        // kebab name sneaking in and needing `styles['some-name']` bracket access.
        // Naming is left to Vite's default — see git history for why.
        localsConvention: 'camelCaseOnly',
      },
    },
    plugins: [tailwindcss()],
  },
})
