import { UserApi, type UserInfo } from "~/backendApi/user"

const defaultUser: UserInfo = { name: "NOT_LOG", role: "NOT_LOG" }
export default defineStore("user", () => {
    const { data } = asyncData(UserApi.info, defaultUser, { server: false })
    const showDialog = ref(false)
    const logged = computed(() => data.value.role !== defaultUser.role)
    return {
        info: data, showDialog,

        logged,
        admin: computed(() => data.value.role == 'Admin' || data.value.role == 'SuperAdmin'),
        async login({ user, password }: { user: string, password: string }) {
            if (logged.value) return
            data.value = await UserApi.login(user, password)
            showDialog.value = false
        },
        async register({ user, password, code }: { user: string, password: string, code: string }) {
            if (logged.value) return
            data.value = await UserApi.register(user, password, code)
            showDialog.value = false
        },
        async logout() {
            if (!logged.value) return
            await UserApi.logout()
            data.value = defaultUser
        }
    }
})