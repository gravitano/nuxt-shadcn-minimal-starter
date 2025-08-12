import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "shadcn-nuxt",
    "@nuxtjs/seo"
  ],

  css: ["~/assets/css/tailwind.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './app/components/ui'
  },

  site: {
    multiTenancy: [
      {
        hosts: ['gits.test'],
        config: {
          name: 'GITS',
          url: 'gits.test', // canonical
          description: 'GITS description',
          // branding
          primary: 'blue',
          secondary: 'gray'
        },
      },
      {
        hosts: ['eudeka.test'],
        config: {
          name: 'Eudeka',
          url: 'eudeka.test', // canonical
          description: 'Eudeka description',
          // branding
          primary: 'green',
          secondary: 'lightgray'
        },
      },
    ]
  }
});