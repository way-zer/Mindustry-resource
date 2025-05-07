import {UserApi, type UserInfo} from "~/backendApi/user"

const defaultUser: UserInfo = {name: "NOT_LOG", gid: "", role: "NOT_LOG"}
export default defineStore("user", () => {
    const info = ref<UserInfo>(defaultUser)
    const logged = computed(() => info.value.role !== defaultUser.role)
    const redirectPath = useRouteQuery<string>('redirect_path', '/')
    const route = useRoute()

    async function refresh() {
        info.value = await UserApi.info()
    }

    return {
        info,

        logged,
        admin: computed(() => info.value.role == 'Admin' || info.value.role == 'SuperAdmin'),
        refresh,
        async redirectBack(){
            await navigateTo(decodeURIComponent(redirectPath.value))
            redirectPath.value = [] //@ts-ignore
        },
        async redirectToLogin(register = false) {
            navigateTo({
                path: register ? '/user/register' : '/user/login',
                query: {redirect_path: encodeURIComponent(route.fullPath)}
            })
        },
        async login(...args: Parameters<typeof UserApi.login> | ['oauth', { provider: 'discord' }]) {
            if (!logged.value) {
                if (args[0] === 'oauth') {
                    UserApi.oauthLogin(args[1].provider, redirectPath.value)
                    return
                }
                await UserApi.login(...args)
                await refresh()
            }
            await this.redirectBack()
        },
        async register({name}: { name: string }) {
            if (!logged.value) {
                await UserApi.register(name)
                await refresh()
            }
            await this.redirectBack()
        },
        async logout() {
            if (!logged.value) return
            await UserApi.logout()
            info.value = defaultUser
        }
    }
})