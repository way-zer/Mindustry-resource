import {MapInfo} from '@/store/maps/type'
import {MapApi} from '@/store/maps/api'
import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'
import {store} from '@/store'

let initSearchKey = decodeURI(location.search.substring(1))
if (location.pathname != '/map') initSearchKey = ''

@Module
class MapsModule extends VuexModule {
    loading = false
    noMore = false
    searchKey = initSearchKey
    data = [] as MapInfo[]

    @Mutation
    load(key: string) {
        this.loading = true
        this.searchKey = key
    }

    @Mutation
    endLoad(newData: MapInfo[]) {
        this.noMore = !newData.length || this.data == newData
        this.data = newData
        this.loading = false
    }

    @Action
    async search(key: string) {
        if (key == this.searchKey) return
        this.load(key)
        const newMaps = await MapApi.list(0, key)
        this.endLoad(newMaps)
    }

    @Action
    async pullMore() {
        if (this.loading) return
        this.load(this.searchKey)
        let newMaps = await MapApi.list(this.data.length, this.searchKey)
        newMaps = this.data.concat(...newMaps)
        this.endLoad(newMaps)
    }
}

export const mapsStore = new MapsModule({store, name: 'maps'})