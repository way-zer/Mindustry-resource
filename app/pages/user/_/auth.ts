export function autoRedirectWhenLogged() {
	const store = useUserStore()
	const devNoRedirect = useRouteQuery("dev")
	watchEffect(async () => {
		if (store.logged && !devNoRedirect.value) {
			ElMessage.success("登录成功")
			if (store.redirectPath) {
				const path = decodeURIComponent(store.redirectPath)
				store.redirectPath = undefined
				await navigateTo(path)
			} else {
				await navigateTo({ path: "/" })
			}
		}
	})
}
