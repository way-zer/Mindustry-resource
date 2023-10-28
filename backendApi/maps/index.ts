import type {MapDetail, MapInfo} from "./type";

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
        return request('POST', `/api/maps/thread/${thread}/edit`, {body: {action, extra}})
    },
    async updateThread(thread: string, hash: string) {
        return request('POST', `/api/maps/thread/${thread}/update?map=` + hash)
    },
    async newThread(hash: string): Promise<number> {
        return +await request<string>('POST', `/api/maps/thread/new?map=` + hash)
    },
    async upload(file: File): Promise<string> {
        const token = await requestToken('mapUpload')
        const form = new FormData()
        form.append('file', file)
        return request('POST', "/api/maps/upload?token=" + token, {body: form})
    },
    async download(hash: string) {
        const token = await requestToken("mapDownload")
        window.open(mapUrl(`/api/maps/${hash}/download?token=${token}`));
    },
}