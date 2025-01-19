import {UserApi, type UserInfo} from "~/backendApi/user"

const defaultUser: UserInfo = {name: "NOT_LOG", gid: "", role: "NOT_LOG"}
export default defineStore("user", () => {
    const {data, refresh} = useAsyncData(UserApi.info, {server: false, default: () => defaultUser})
    const logged = computed(() => data.value.role !== defaultUser.role)

    //login data
    const query = useUrlSearchParams('history')
    const redirectPath = computed(() => query['redirect_path']?.toString() ?? '/')

    return {
        info: data,

        logged,
        admin: computed(() => data.value.role == 'Admin' || data.value.role == 'SuperAdmin'),
        async redirectToLogin(register = false) {
            navigateTo(`/user/${register ? 'register' : 'login'}?redirect_path=${encodeURIComponent(redirectPath.value)}`)
        },
        async login(...args: Parameters<typeof UserApi.login> | ['oauth', { provider: 'discord' }]) {
            if (logged.value) return
            if (args[0] === 'oauth') {
                UserApi.oauthLogin(args[1].provider, redirectPath.value)
                return
            }
            await UserApi.login(...args)
            await refresh()
            if (logged.value) {
                navigateTo(redirectPath.value)
            }
        },
        async register({name}: { name: string }) {
            if (logged.value) return
            await UserApi.register(name)
            await refresh()
            if (logged.value) {
                navigateTo(redirectPath.value)
            }
        },
        async logout() {
            if (!logged.value) return
            await UserApi.logout()
            data.value = defaultUser
        }
    }
}, {
    persist: {
        storage: piniaPluginPersistedstate.sessionStorage(),
    }
})