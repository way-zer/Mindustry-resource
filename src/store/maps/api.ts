import axios from "axios";
import {MapDetail, MapInfo} from "@/store/maps/type";
import {requestToken} from "@/util/reCaptcha";
import {API_BASE, mapUrl} from "@/const";

export const MapApi = {
    async list(begin: number, search: string): Promise<MapInfo[]> {
        return axios.get("/api/maps/list", {
            params: {begin, search},
        }).then((data0) => {
            const data = data0 as unknown as MapInfo[]
            data.forEach(it => it.preview = mapUrl(it.preview))
            return data
        })
    },
    async detail(thread: string, version: string): Promise<MapDetail> {
        return axios.get(`/api/maps/thread/${thread}/${version}`).then((data0) => {
            const data = data0 as unknown as MapDetail
            data.preview = mapUrl(data.preview)
            return data
        })
    },
    async edit(thread: string, action: string, extra: string): Promise<void> {
        return axios.post(`/api/maps/thread/${thread}/edit`, {action, extra})
    },
    async updateThread(thread: string, hash: string) {
        return axios.post(`/api/maps/thread/${thread}/update?map=` + hash)
    },
    async newThread(hash: string): Promise<number> {
        return +await axios.post(`/api/maps/thread/new?map=` + hash)
    },
    async upload(file: File): Promise<string> {
        const form = new FormData()
        form.append('file', file)
        return axios.post("/api/maps/upload?token=" + (await requestToken('mapUpload')), form)
    },
    async download(hash: string) {
        const token = await requestToken("mapDownload")
        window.open(mapUrl(`/api/maps/${hash}/download?token=${token}`));
    },
}