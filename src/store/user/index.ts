import {User} from '@/store/user/type'
import {UserApi} from '@/store/user/api'

export class UserStore {
    info: User | null = null
    showDialog = false

    get logged() {
        return this.info != null
    }

    async refresh() {
        this.info = await UserApi.info().catch(() => null)
    }

    async login({user, password}: { user: string, password: string }) {
        if (this.logged) return
        this.info = await UserApi.login(user, password)
        if (this.logged)
            this.showDialog = false
    }

    async register({user, password, code}: { user: string, password: string, code: string }) {
        if (this.logged) return
        this.info = await UserApi.register(user, password, code)
        if (this.logged)
            this.showDialog = false
    }

    async logout() {
        if (!this.logged) return
        await UserApi.logout()
        this.info = null
    }
}