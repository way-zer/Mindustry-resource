import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import MapsList from '../views/map/List.vue'
import Detail from '@/views/map/sub/Detail.vue'
import TheUpload from '@/views/map/sub/TheUpload.vue'
import TheList from '@/views/server/TheList.vue'
import About from '@/views/About.vue'
import GameDownload from '@/views/game/index.vue'

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/map',
        name: '地图',
        component: MapsList,
        children: [
            {path: 'upload', component: TheUpload},
            {path: ':thread/:id', component: Detail},
        ],
    },
    {
        path: '/server',
        name: '服务器列表',
        component: TheList,//too Small to split
        // component: () => import(/* webpackChunkName: "server" */ '@/views/server/TheList.vue'),
    },
    {
        path: '/game',
        name: '游戏下载',
        component: GameDownload,
    },
    {
        path: '/about',
        name: '关于本站',
        component: About,//too Small to split
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
    {
        path: '/',
        redirect: '/map',
    },
]

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})
