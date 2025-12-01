import { type LoginMethods, UserApi, type UserInfo } from "~/backendApi/user"

const defaultUser: UserInfo = {
	name: "NOT_LOG",
	gid: "",
	isAdmin: false,
	authed: false,
}
export default defineStore("user", () => {
	const info = ref<UserInfo>(defaultUser)
	const registerCode = ref<string | null>(null)

	const logged = computed(() => info.value.authed || info.value.gid)
	const token = useLocalStorage<string | undefined>("access_token", undefined)
	const redirectPath = useLocalStorage<string | undefined>(
		"redirect_path",
		undefined,
	)
	const route = useRoute()

	async function refresh() {
		info.value = await UserApi.info()
		if (info.value.authed) {
			token.value = info.value.token
		}
	}

	return {
		info,
		registerCode,

		logged,
		admin: computed(
			() =>
				info.value.isAdmin ||
				info.value.role === "Admin" ||
				info.value.role === "SuperAdmin",
		),
		refresh,
		registerAutoRedirect() {
			watch(
				() => logged.value,
				async (val) => {
					if (val) {
						ElMessage.success("登录成功")
						if (redirectPath.value) {
							const path = decodeURIComponent(redirectPath.value)
							redirectPath.value = undefined
							await navigateTo(path)
						} else {
							await navigateTo({ path: "/" })
						}
					}
				},
				{ immediate: true },
			)
		},
		async redirectToLogin(register = false) {
			redirectPath.value = route.fullPath
			navigateTo({
				path: register ? "/user/register" : "/user/login",
			})
		},
		async login<T extends keyof LoginMethods>(
			method: T,
			data: LoginMethods[T],
		) {
			if (!logged.value) {
				const res = await UserApi.login(method, registerCode.value, data)
				if (res.token !== undefined) {
					token.value = res.token
					await refresh()
				} else {
					//register
					ElMessage.info(
						"账号不存在，可更换其他登录方式，或输入用户名注册新账号",
					)
					registerCode.value = res.loginCode
					navigateTo({ path: "/user/register" })
				}
			}
		},
		async oauthLogin(provider: string) {
			const callback = "/user/oauthCallback"
			window.location.href = UserApi.oauthUrl(provider, callback)
		},
		async register({ name }: { name: string }) {
			if (!registerCode.value) {
				ElMessage.error("SESSION已过期，请重新登录")
				return
			}
			if (!logged.value) {
				await UserApi.register(registerCode.value, name)
				await refresh()
			}
		},
		async logout() {
			if (!logged.value) return
			await UserApi.logout()
			info.value = defaultUser
		},
	}
})
