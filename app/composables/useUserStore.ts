import { useQuery } from "@tanstack/vue-query"
import { type LoginMethods, UserApi, type UserInfo } from "~/backendApi/user"

const defaultUser: UserInfo = {
	name: "NOT_LOG",
	gid: "",
	isAdmin: false,
	authed: false,
}
export default defineStore("user", () => {
	const { data: info, refetch } = useQuery({
		queryKey: ["user", "info"],
		queryFn: UserApi.info,
		enabled: import.meta.client,
		initialData: defaultUser,
		staleTime: 1000 * 60 * 5,
	})
	const registerCode = ref<string | null>(null)

	const logged = computed(() => info.value.authed || info.value.gid)
	const redirectPath = useSessionStorage<string | undefined>(
		"redirect_path",
		undefined,
	)
	const route = useRoute()

	return {
		info,
		registerCode,
		redirectPath,

		logged,
		admin: computed(
			() =>
				info.value.isAdmin ||
				info.value.role === "Admin" ||
				info.value.role === "SuperAdmin",
		),
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
				if (res.success || res.token !== undefined) {
					await refetch()
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
		async register({ name }: { name: string }) {
			if (!registerCode.value) {
				ElMessage.error("SESSION已过期，请重新登录")
				navigateTo({ path: "/user/login" })
				return
			}
			if (!logged.value) {
				await UserApi.register(registerCode.value, name)
				await refetch()
			}
		},
		async logout() {
			if (!logged.value) return
			await UserApi.logout()
			info.value = defaultUser
		},
	}
})
