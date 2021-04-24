import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MapsList from '../views/map/List.vue'
import Detail from "@/views/map/sub/Detail.vue";
import TheUpload from "@/views/map/sub/TheUpload.vue";

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/map',
        name: '地图',
        component: MapsList,
        children: [
            {
                path: 'upload',
                component: TheUpload
            },
            {
                path: ':thread/:id',
                component: Detail
            },
        ]
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/',
        redirect: '/map',
    }
]

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})
