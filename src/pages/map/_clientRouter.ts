import {createMemoryHistory, createRouter, createWebHistory} from "vue-router";
import MapList from "./_components/MapList.vue";
import UploadDialog from "./_components/UploadDialog.vue";
import DetailPage from "./_components/DetailPage.vue";

const base = "/map"
let history
if (import.meta.env.SSR) {
    history = createMemoryHistory(base)
} else {
    history = createWebHistory(base)
}
const router = createRouter({
    history, routes: [{
        path: '/', component: MapList, children: [
            {path: '/upload', component: UploadDialog},
            {path: '/:thread/:id', component: DetailPage},
        ]
    }],
})

export function useMapsRouter() {
    getCurrentInstance()?.appContext.app.use(router)
    return router
}