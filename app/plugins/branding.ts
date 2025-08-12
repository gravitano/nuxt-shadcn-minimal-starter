// plugins/branding.server.ts
export default defineNuxtPlugin({
  name: 'branding-ssr',
  enforce: 'post', // jalankan setelah site-config terisi
  setup() {
    const site = useSiteConfig()
    useHead({
      htmlAttrs: {
        style: `
          --primary: ${site.primary ?? '#2563eb'};
          --secondary: ${site.secondary ?? '#6b7280'};
        `
      }
    })
  }
})
