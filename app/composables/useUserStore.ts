import {UserApi, type UserInfo} from "~/backendApi/user"

const defaultUser: UserInfo = {name: "NOT_LOG", gid: "", role: "NOT_LOG"}
export default defineStore("user", () => {
    const info = ref<UserInfo>(defaultUser)
    const logged = computed(() => info.value.role !== defaultUser.role)
    const redirectPath = useRouteQuery<string>('redirect_path', '/')

    async function refresh() {
        info.value = await UserApi.info()
    }

    if (import.meta.client)
        refresh().then()

    return {
        info,

        logged,
        admin: computed(() => info.value.role == 'Admin' || info.value.role == 'SuperAdmin'),
        async redirectToLogin(register = false) {
            navigateTo({
                path: register ? '/user/register' : '/user/login',
                query: {redirect_path: redirectPath.value}
            })
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
            info.value = defaultUser
        }
    }
}, {
    persist: {
        storage: piniaPluginPersistedstate.sessionStorage(),
    }
})