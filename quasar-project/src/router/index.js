import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { useGeneralStore } from 'src/stores/general'; // Import your store

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })


    // Navigation guard to check for auth
    Router.beforeEach((to, from, next) => {
      const generalStore = useGeneralStore();
      const isAuthenticated = generalStore.isLoggedIn; // Replace with your auth logic

      // If route requires auth and user is not authenticated, redirect to login
      if (to.meta.requiresAuth && !isAuthenticated) {
        next({ path: '/login', query: { redirect: to.fullPath } });
      } else {
        next();
      }
    });

  return Router
})
