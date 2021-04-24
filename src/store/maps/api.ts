import axios from "axios";
import {MapDetail, MapInfo} from "@/store/maps/type";
import {requestToken} from "@/util/reCaptcha";

export const MapApi = {
    async list(begin: number, search: string): Promise<MapInfo[]> {
        return axios.get("/api/maps/list", {
            params: {begin, search}
        })
    },
    async detail(thread: string, version: string): Promise<MapDetail> {
        return axios.get(`/api/maps/thread/${thread}/${version}`)
    },
    async edit(thread: string, action: string, extra: string): Promise<void> {
        return axios.post(`/api/maps/thread/${thread}/edit`, {action, extra})
    },
    async getUploadUrl(): Promise<string> {
        return "/api/maps/upload?token" + (await requestToken('mapUpload'))
    },
    async download(hash: string) {
        const token = await requestToken("mapDownload")
        window.open(`/api/maps/${hash}/download?token=${token}`);
    },
}