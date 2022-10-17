import {ServerInfo} from '@/store/server/type'
import {ServerApi} from '@/store/server/api'
import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'

@Module
export class ServerModule extends VuexModule {
    loading = true
    data = [] as ServerInfo[]

    @Mutation
    endLoad(newData: ServerInfo[]) {
        this.data = newData
        this.loading = false
    }

    @Action
    async refresh() {
        this.endLoad(await ServerApi.list())
    }

    @Action
    async add(address: string) {
        await ServerApi.add(address)
        await this.refresh()
    }
}