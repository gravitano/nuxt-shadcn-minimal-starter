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
    "@nuxtjs/seo",
    'nuxt-site-config',
  ],

  css: ["~/assets/css/tailwind.css"],

  vite: {
    plugins: [tailwindcss()],
    // local only
    server: {
      allowedHosts: ['gits.test', 'eudeka.test']
    }
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
        hosts: ['gits.test', 'www.gits.test', 'gits.test:3000'],
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
        hosts: ['eudeka.test', 'www.eudeka.test', 'eudeka.test:3000'],
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
  },

  nitro: {
    plugins: [
      // runtime site config
      // '~~/server/plugins/site-config'
    ]
  }
});