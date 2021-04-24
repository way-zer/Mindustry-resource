import {createStoreExt} from "@/store/ext";
import {MapDetail, MapInfo} from "@/store/maps/type";
import {MapApi} from "@/store/maps/api";

let initSearchKey = decodeURI(location.search.substring(1));
if (location.pathname != '/map') initSearchKey = '';

export default createStoreExt({
    state: {
        loading: false,
        noMore: false,
        searchKey: initSearchKey,
        data: [] as MapInfo[],
    },
    mutations: {
        load(state, key: string) {
            state.loading = true
            state.searchKey = key
        },
        endLoad(state, newData: MapInfo[]) {
            state.noMore = !newData.length || state.data == newData
            state.data = newData
            state.loading = false
        }
    },
    actions: {
        async search({state, commit}, key: string) {
            if (key == state.searchKey) return
            commit('load', key)
            const newMaps = await MapApi.list(0, key)
            commit('endLoad', newMaps)
        },
        async pullMore({state, commit}) {
            if (state.loading) return
            commit('load', state.searchKey)
            let newMaps = await MapApi.list(state.data.length, state.searchKey)
            newMaps = state.data.concat(...newMaps)
            commit('endLoad', newMaps)
        }
    }
})