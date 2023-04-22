import {MapDetail, MapInfo} from "@/store/maps/type";
import {requestToken} from "@/util/reCaptcha";
import {API_BASE, mapUrl} from "@/const";
import {request} from "@/plugins/axios";

export const MapApi = {
    async list(begin: number, search: string): Promise<MapInfo[]> {
        return request<MapInfo[]>("GET", "/api/maps/list", {
            params: {begin, search},
        }).then((data) => {
            data.forEach(it => it.preview = mapUrl(it.preview))
            return data
        })
    },
    async detail(thread: string, version: string): Promise<MapDetail> {
        return request<MapDetail>("GET", `/api/maps/thread/${thread}/${version}`)
            .then((data) => {
                data.preview = mapUrl(data.preview)
                return data
            })
    },
    async edit(thread: string, action: string, extra: string): Promise<void> {
        return request('POST', `/api/maps/thread/${thread}/edit`, {data: {action, extra}})
    },
    async updateThread(thread: string, hash: string) {
        return request('POST', `/api/maps/thread/${thread}/update?map=` + hash)
    },
    async newThread(hash: string): Promise<number> {
        return +await request<string>('POST', `/api/maps/thread/new?map=` + hash)
    },
    async upload(file: File): Promise<string> {
        const form = new FormData()
        form.append('file', file)
        return request('POST', "/api/maps/upload?token=" + (await requestToken('mapUpload')), {data: form})
    },
    async download(hash: string) {
        const token = await requestToken("mapDownload")
        window.open(mapUrl(`/api/maps/${hash}/download?token=${token}`));
    },
}