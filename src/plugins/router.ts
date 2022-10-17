import {createMemoryHistory, createRouter, createWebHistory} from 'vue-router'
import routes0 from 'virtual:generated-pages'

export const routes = routes0

export default createRouter.bind(undefined, {
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(import.meta.env.BASE_URL),
    routes: routes.concat(
        {path: '/', redirect: '/map'},
    ),
})
