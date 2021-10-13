import {createRouter, createWebHistory} from 'vue-router'
import routes0 from 'virtual:generated-pages'

export const routes = routes0

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes.concat(
        {path: '/', redirect: '/map'},
    ),
})
