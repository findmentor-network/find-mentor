/* eslint-disable */

export default ({ app }) => {  
  app.router.afterEach((to, from) => {
    window.BASE_URL = "https://beta.analytx.dev";
    send({from: from.path, to: to.path, pageName: to.name, params: to.params, query: to.query});
  })
}