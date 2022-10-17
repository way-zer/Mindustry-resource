import {createStore as create} from 'vuex'
import {UserModule} from "@/store/user";
import {ServerModule} from "@/store/server";
import {MapsModule} from "@/store/maps";
import {GameModule} from "@/store/game";
import {App, inject} from "vue";

const modules = {
    user: UserModule,
    server: ServerModule,
    maps: MapsModule,
    game: GameModule,
}
const modulesKey = "Vuex_store_module"

export function registerStore(app: App, initState) {
    const store = create({
        plugins: [],
        strict: import.meta.env.DEV,
        devtools: !import.meta.env.SSR && import.meta.env.DEV
    })
    if (initState)
        store.replaceState(initState)

    const modulesInst = {} as any
    for (let name in modules) {
        modulesInst[name] = new modules[name]({store, name})
    }
    app.provide(modulesKey, modulesInst)

    app.use(store)
    return [store, modulesInst]
}

type Modules = typeof modules

export function useStore<S extends keyof Modules>(name: S): InstanceType<Modules[S]> {
    return (inject(modulesKey) as any)[name]
}