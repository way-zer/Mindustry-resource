import {createStoreExt} from '@/store/ext'
import {ServerInfo} from '@/store/server/type'
import {ServerApi} from '@/store/server/api'

let initSearchKey = decodeURI(location.search.substring(1))
if (location.pathname != '/map') initSearchKey = ''

export default createStoreExt({
    state: {
        loading: true,
        data: [] as ServerInfo[],
    },
    mutations: {
        endLoad(state, newData: ServerInfo[]) {
            state.data = newData
            state.loading = false
        },
    },
    actions: {
        async refresh({commit}) {
            commit('endLoad', await ServerApi.list())
        },
        async add({commit, dispatch}, address: string) {
            await ServerApi.add(address)
            dispatch('refresh')
        },
    },
})