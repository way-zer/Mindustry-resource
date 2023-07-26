import type {User} from './type'
import {UserApi} from './api'

const defaultUser = {name: "NOT_LOG", role: "NOT_LOG"}

export class UserStore {
    first: boolean = true
    info: User = defaultUser
    showDialog = false

    get logged() {
        return this.info.role !== defaultUser.role
    }

    get admin() {
        return this.logged && (this.info.role == 'Admin' || this.info.role == 'SuperAdmin')
    }

    async refresh() {
        this.first = false
        this.info = await UserApi.info().catch(() => defaultUser)
    }

    async login({user, password}: { user: string, password: string }) {
        if (this.logged) return
        this.first = false
        this.info = await UserApi.login(user, password)
        if (this.logged)
            this.showDialog = false
    }

    async register({user, password, code}: { user: string, password: string, code: string }) {
        if (this.logged) return
        this.first = false
        this.info = await UserApi.register(user, password, code)
        if (this.logged)
            this.showDialog = false
    }

    async logout() {
        if (!this.logged) return
        this.first = false
        await UserApi.logout()
        this.info = defaultUser
    }
}