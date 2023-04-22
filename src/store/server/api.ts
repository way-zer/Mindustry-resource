import {ServerInfo} from '@/store/server/type'
import {request} from "@/plugins/axios";

export const ServerApi = {
    async list(): Promise<ServerInfo[]> {
        return request('GET', '/api/servers/list')
    },
    async add(address: string) {
        return request('GET', '/api/servers/add?address=' + address)
    },
}