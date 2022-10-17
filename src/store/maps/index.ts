import {MapInfo} from '@/store/maps/type'
import {MapApi} from '@/store/maps/api'
import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'

@Module
export class MapsModule extends VuexModule {
    loading = false
    noMore = false
    searchKey = ''
    data = [] as MapInfo[]

    @Mutation
    load(key: string) {
        this.loading = true
        this.searchKey = key
    }

    @Mutation
    endLoad({newData, concat = false}: { newData: MapInfo[], concat?: boolean }) {
        this.noMore = !newData.length
        this.data = concat ? this.data.concat(...newData) : newData
        this.loading = false
    }

    @Action
    async search(key: string) {
        if (key == this.searchKey) return
        this.load(key)
        const newMaps = await MapApi.list(0, key)
        this.endLoad({newData: newMaps})
    }

    @Action
    async pullMore() {
        if (this.loading) return
        this.load(this.searchKey)
        let newMaps = await MapApi.list(this.data.length, this.searchKey)
        this.endLoad({newData: newMaps, concat: true})
    }

    @Action
    async getKeyFromUrl() {
        let initSearchKey = decodeURI(location.search.substring(1))
        if (initSearchKey && initSearchKey != this.searchKey)
            await this.search(initSearchKey)
    }
}