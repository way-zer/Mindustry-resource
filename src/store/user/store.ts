import {createStoreExt} from "@/store/ext";
import {User} from "@/store/user/type";

export default createStoreExt({
    state: {
        info: null as User | null
    },
    getters: {
        logged(state) {
            return state.info != null
        }
    },
    mutations: {
        update(state, info: User | null) {
            state.info = info
        }
    },
    actions: {
        async login({commit}, prop: { name: string, password: string }) {

        }
    }
})