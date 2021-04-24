import {action, computed, observable} from "mobx";
import {User} from "@/store/user/type";
import {UserApi} from "@/store/user/api";

class UserModel {
    @observable info: User | null = null

    @computed get logged() {
        return this.info != null
    }

    @action.bound
    refresh() {
        UserApi.info().then((it) => {
            this.info = it
        }).catch(() => {
            this.info = null
        })
    }

    @action.bound
    async login(user: string, password: string) {
        if (this.logged) return
        this.info = await UserApi.login(user, password)
    }
}

const inst = new UserModel()
inst.refresh()
export default inst