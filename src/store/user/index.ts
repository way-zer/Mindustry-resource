import {Action, Module, VuexModule} from 'vuex-class-modules'
import {User} from '@/store/user/type'
import {UserApi} from '@/store/user/api'
import {store} from '@/store'

@Module({generateMutationSetters: true})
class UserModule extends VuexModule {
    info: User | null = null
    showDialog = false

    get logged() {
        return this.info != null
    }

    @Action
    async refresh() {
        this.info = await UserApi.info().catch(() => null)
    }

    @Action
    async login({user, password}: { user: string, password: string }) {
        if (this.logged) return
        this.info = await UserApi.login(user, password)
        if (this.logged)
            this.showDialog = false
    }

    @Action
    async register({user, password, code}: { user: string, password: string, code: string }) {
        if (this.logged) return
        this.info = await UserApi.register(user, password, code)
        if (this.logged)
            this.showDialog = false
    }

    @Action
    async logout() {
        if (!this.logged) return
        await UserApi.logout()
        this.info = null
    }
}

export const userStore = new UserModule({store, name: 'user'})
setTimeout(userStore.refresh, 1000)