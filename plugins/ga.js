/* eslint-disable */

export default ({ app }) => {
  /*
   ** Only run on client-side and only in production mode
   */
  // FAKE Analytics
//   if (process.env.NODE_ENV !== 'production') return
  app.router.afterEach((to, from) => {
    const baseURL = 'http://135.181.150.199:3000'
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
