export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('site-config:init', ({ event, siteConfig }) => {
    const origin = useNitroOrigin(event)
    const host = getRequestHeader(event, 'host')
    console.log('origin', origin)
    console.log('host', host)

    // Example: Set configuration based on subdomain
    if (host && host.includes('gits.test')) {
      // push whatever config you'd like for this request
      siteConfig.push({
        name: 'GITS',
        url: 'https://gits.test',
        defaultLocale: 'en',
        currentLocale: 'en',
        primary: 'blue',
        secondary: 'gray',
      })
    }

    if (host && host.includes('eudeka.test')) {
      // push whatever config you'd like for this request
      siteConfig.push({
        name: 'Eudeka',
        url: 'https://eudeka.test',
        defaultLocale: 'en',
        currentLocale: 'en',
        primary: 'green',
        secondary: 'lightgray',
      })
    }
  })
})
