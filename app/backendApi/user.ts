export interface UserInfo {
    name: string
    gid: string
    role?: "SuperAdmin" | "Admin" | "User" //deprecated
    isAdmin: boolean
    authed: boolean
}

export interface LoginMethods {
    username: { user: string, password: string }
    email: { email: string, code: string }
}

export const UserApi = {
    async info(): Promise<UserInfo> {
        return request("GET", "/api/users/info", {skipErrorHandler: true})
    },
    async logout(): Promise<void> {
        return request("GET", "/api/users/logout")
    },

    async discardBinds(): Promise<void> {
        return request("POST", "/api/users/discard_binds")
    },
    async login<T extends keyof LoginMethods>(method: T, data: LoginMethods[T]): Promise<void> {
        return request("POST", `/api/users/login?method=${method}`, {body: data, reCaptchaAction: 'login'})
    },
    oauthLogin(provider: string, redirect: string): void {
        location.href = `https://api.mindustry.top/users/callback?provider=${provider}&redirect_path=${encodeURIComponent(redirect)}`
        //when success, will redirect to redirect_path
        //when new, will redirect to /user/register?redirect_path=
    },
    async sendEmail(email: string): Promise<void> {
        return request("POST", `/api/users/sendEmail?email=${encodeURIComponent(email)}`, {reCaptchaAction: 'sendEmail'})
    },
    async register(name: string): Promise<void> {
        return request("POST", "/api/users/register", {body: {name}, reCaptchaAction: 'register'})
    },

    async tokenRequest(): Promise<string/*Code*/> {//not used, for device
        return request("POST", "/api/users/tokenRequest")
    },
    async tokenInfo(code: string): Promise<{ ip: string, type: string, name: string }> {
        if (code == "MOCK") return {ip: "1.2.3.4", type: "CLIENT", name: "MOCK"}
        return request("GET", `/api/users/tokenRequest/${code}`)
    },
    async tokenConfirm(code: string, action: 'confirm' | 'reject'): Promise<void> {
        return request("POST", `/api/users/tokenRequest/${code}/action?op=${action}`)
    },
    async getToken(code: string): Promise<string/*Token*/> {//not used, for device
        return request("GET", `/api/users/tokenRequest/${code}/result`)
    }
}