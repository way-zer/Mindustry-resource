import axios from "axios";
import {User} from "@/store/user/type";
import {requestToken} from "@/util/reCaptcha";

export const UserApi = {
    async info(): Promise<User> {
        return axios.get("/api/users/info", {skipErrorHandler: true})
    },
    async login(user: string, password: string): Promise<User> {
        const token = await requestToken("login")
        return axios.post("/api/users/login", {user, password, token})
    },
    async genCode(): Promise<string> {
        return axios.post("/api/users/genCode", {}).then(it =>
            (+it).toString().padStart(6, '0')
        )
    },
    async register(user: string, password: string, code: string): Promise<User> {
        const token = await requestToken("register")
        return axios.post("/api/users/register", {user, password, code, token})
    },
    async logout(): Promise<void> {
        return axios.get("/api/users/logout")
    },
}