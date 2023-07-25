import type {User} from "./type";
import {requestToken} from "@/util/reCaptcha";
import {request} from "../axios";

export const UserApi = {
    async info(): Promise<User> {
        return request("GET", "/api/users/info", {skipErrorHandler: true})
    },
    async login(user: string, password: string): Promise<User> {
        const token = await requestToken("login")
        return request("POST", "/api/users/login", {data: {user, password, token}})
    },
    async genCode(): Promise<string> {
        return request<string>("POST", "/api/users/genCode", {})
            .then(it => (+it).toString().padStart(6, '0'))
    },
    async register(user: string, password: string, code: string): Promise<User> {
        const token = await requestToken("register")
        return request("POST", "/api/users/register", {data: {user, password, code, token}})
    },
    async logout(): Promise<void> {
        return request("GET", "/api/users/logout")
    },
}