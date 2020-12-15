/* eslint-disable */

export default ({ app }) => {
  /*
   ** Only run on client-side and only in production mode
   */
  // FAKE Analytics
  if (process.env.NODE_ENV !== 'production') return
  app.router.afterEach((to, from) => {
    const baseURL = process.env.BASE_URL
    if (!baseURL) return
    fetch(baseURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ href: to.fullPath }),
    })
  })
}
