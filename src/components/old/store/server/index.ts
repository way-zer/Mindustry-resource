import type {ServerInfo} from '@/store/server/type'
import {ServerApi} from '@/store/server/api'

export class ServerStore {
    loading = true
    data = [] as ServerInfo[]
    autoRefresh = true


    async refresh() {
        this.data = await ServerApi.list()
        this.loading = false
    }

    async add(address: string) {
        await ServerApi.add(address)
        await this.refresh()
    }
}