import axios from 'axios'
import {ServerInfo} from '@/store/server/type'

export const ServerApi = {
    async list(): Promise<ServerInfo[]> {
        return axios.get('/api/servers/list')
    },
    async add(address: string) {
        return axios.get('/api/servers/add?address=' + address)
    },
}