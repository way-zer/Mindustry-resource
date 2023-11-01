export interface UserInfo {
    name: string
    role: string
}
export const UserApi = {
    async info(): Promise<UserInfo> {
        return request("GET", "/api/users/info", { skipErrorHandler: true })
    },
    async login(user: string, password: string): Promise<UserInfo> {
        const token = await requestToken("login")
        return request("POST", "/api/users/login", { body: { user, password, token } })
    },
    async genCode(): Promise<string> {
        return request<string>("POST", "/api/users/genCode", {})
            .then(it => (+it).toString().padStart(6, '0'))
    },
    async register(user: string, password: string, code: string): Promise<UserInfo> {
        const token = await requestToken("register")
        return request("POST", "/api/users/register", { body: { user, password, code, token } })
    },
    async logout(): Promise<void> {
        return request("GET", "/api/users/logout")
    },
    async tokenRequest(): Promise<string/*Code*/> {//not used, for device
        return request("POST", "/api/users/tokenRequest")
    },
    async tokenInfo(code: string): Promise<{ ip: string, type: string, name: string }> {
        return request("GET", `/api/users/tokenRequest/${code}`)
    },
    async tokenConfirm(code: string, action: 'confirm' | 'reject'): Promise<void> {
        return request("POST", `/api/users/tokenRequest/${code}/action?op=${action}`)
    },
    async getToken(code: string): Promise<string/*Token*/> {//not used, for device
        return request("GET", `/api/users/tokenRequest/${code}/result`)
    }
}