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
  // Same story one directory over: components/ is scanned with the full
  // extension list, so a colocated `CvaButton.recipe.ts` gets registered as a
  // `<CvaButtonRecipe>` component. Restricting the scan to .vue lets a
  // component keep its non-component files next to it. `pathPrefix` stays at
  // its default, so ND/Card.vue is still <NDCard>.
  components: [{ path: '~/components', extensions: ['vue'] }],
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
