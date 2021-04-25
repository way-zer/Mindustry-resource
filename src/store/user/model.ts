import {makeAutoObservable} from "mobx";
import {User} from "@/store/user/type";
import {UserApi} from "@/store/user/api";

class Model {
    info: User | null = null
    showDialog = false

    constructor() {
        makeAutoObservable(this)
        setTimeout(this.refresh.bind(this),1000)
    }

    get logged() {
        return this.info != null
    }

    setDialog(v: boolean) {
        this.showDialog = v
    }

    * refresh() {
        this.info = yield UserApi.info().catch(() => null)
    }

    * login(user: string, password: string) {
        if (this.logged) return
        this.info = yield UserApi.login(user, password)
        if (this.logged)
            this.setDialog(false)
    }

    * register(user: string, password: string, code: string) {
        if (this.logged) return
        this.info = yield UserApi.register(user, password, code)
        if (this.logged)
            this.setDialog(false)
    }

    * logout() {
        if (!this.logged) return
        yield UserApi.logout()
        this.info = null
    }
}

const userModel = new Model()
export default userModel