// Nuxt 3 Server Middleware
// Official Docs: https://nuxt.com/docs/guide/directory-structure/server#server-middleware
export default eventHandler(event => {
  if (event.path === '/') {
    return
  }
})
