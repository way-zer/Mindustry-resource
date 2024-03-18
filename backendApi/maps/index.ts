import type { MapDetail, MapInfo } from "./type";
import { saveAs } from "file-saver";

export const MapApi = {
    async list(begin: number, search: string): Promise<MapInfo[]> {
        return request<MapInfo[]>("GET", "/api/maps/list", {
            params: { begin, search },
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
        return request('POST', `/api/maps/thread/${thread}/edit`, { body: { action, extra } })
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
        return request('POST', "/api/maps/upload", { body: form, reCaptchaAction: 'mapUpload' })
    },
    async download(hash: string, name?: string) {
        name = `${name ?? hash}.msav`
        const file = await request<Blob>('GET', `/api/maps/${hash}/download`, {
            responseType: 'blob', reCaptchaAction: 'mapDownload', onResponse: ({ response }) => {
                const fromHeader = response.headers.get('Content-Disposition')?.match(/filename=(.+)/)?.[1]
                if (fromHeader) name = decodeURI(fromHeader)
            }
        })
        saveAs(file, name)
    },
}