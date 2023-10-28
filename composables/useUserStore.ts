import { UserApi, type UserInfo } from "~/backendApi/user"

const defaultUser: UserInfo = { name: "NOT_LOG", role: "NOT_LOG" }
export default function useUserStore() {
    const { data } = useAsyncData<UserInfo>("user", UserApi.info, { default: () => defaultUser, server: false })
    const showDialog = ref(false)
    return {
        info: data, showDialog,

        logged: computed(() => data.value.role !== defaultUser.role),
        admin: computed(() => data.value.role == 'Admin' || data.value.role == 'SuperAdmin'),
        async login({ user, password }: { user: string, password: string }) {
            if (this.logged) return
            data.value = await UserApi.login(user, password)
            showDialog.value = false
        },
        async register({ user, password, code }: { user: string, password: string, code: string }) {
            if (this.logged) return
            data.value = await UserApi.register(user, password, code)
            showDialog.value = false
        },
        async logout() {
            if (!this.logged) return
            await UserApi.logout()
            data.value = defaultUser
        }
    }
}