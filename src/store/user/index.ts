import {Action, Module, RegisterOptions, VuexModule} from 'vuex-class-modules'
import {User} from '@/store/user/type'
import {UserApi} from '@/store/user/api'

@Module({generateMutationSetters: true})
export class UserModule extends VuexModule {
    info: User | null = null
    showDialog = false

    constructor(options: RegisterOptions) {
        super(options);
        if (!import.meta.env.SSR)
            setTimeout(this.refresh, 1000)
    }

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