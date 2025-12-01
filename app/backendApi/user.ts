export interface UserInfo {
	name: string
	gid: string
	role?: "SuperAdmin" | "Admin" | "User" //deprecated
	isAdmin: boolean
	authed: boolean
	token?: string
}

export interface LoginMethods {
	username: { user: string; password: string }
	email: { email: string; code: string }
	oauth: { loginCode: string }
}

export type LoginResult =
	| { token: string }
	| { token: undefined; loginCode: string }

export const UserApi = {
	async info(): Promise<UserInfo> {
		return request("GET", "/api/users/info", { skipErrorHandler: true })
	},
	async logout(): Promise<void> {
		return request("GET", "/api/users/logout")
	},

	async login<T extends keyof LoginMethods>(
		method: T,
		register_code: string | null,
		data: LoginMethods[T],
	): Promise<LoginResult> {
		return request("POST", `/api/users/login`, {
			query: {
				method: method,
				register_code: register_code || undefined,
			},
			body: data,
			reCaptchaAction: method !== "oauth" ? "login" : undefined,
		})
	},
	oauthUrl(provider: string, redirect: string): string {
		return `https://api.mindustry.top/users/callback?provider=${provider}&redirect_path=${encodeURIComponent(redirect)}`
		//will redirect to redirect_path?login_code=CODE
	},
	async sendEmail(email: string): Promise<void> {
		return request(
			"POST",
			`/api/users/sendEmail?email=${encodeURIComponent(email)}`,
			{ reCaptchaAction: "sendEmail" },
		)
	},
	async register(loginCode: string, username: string): Promise<void> {
		return request("POST", "/api/users/register", {
			body: { loginCode, username },
			reCaptchaAction: "register",
		})
	},

	async tokenRequest(): Promise<string /*Code*/> {
		//not used, for device
		return request("POST", "/api/users/tokenRequest")
	},
	async tokenInfo(
		code: string,
	): Promise<{ ip: string; type: string; name: string }> {
		if (code === "MOCK") return { ip: "1.2.3.4", type: "CLIENT", name: "MOCK" }
		return request("GET", `/api/users/tokenRequest/${code}`)
	},
	async tokenConfirm(
		code: string,
		action: "confirm" | "reject",
	): Promise<void> {
		return request(
			"POST",
			`/api/users/tokenRequest/${code}/action?op=${action}`,
		)
	},
	async getToken(code: string): Promise<string /*Token*/> {
		//not used, for device
		return request("GET", `/api/users/tokenRequest/${code}/result`)
	},
}
