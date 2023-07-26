import type {ServerInfo} from './type'
import {ServerApi} from './api'

export class ServerStore {
    static name = "ServerStore"
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