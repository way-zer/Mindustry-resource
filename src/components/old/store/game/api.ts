import { request } from '../axios'

export interface Release {
    html_url: string;
    tag_name: string;
    published_at: string;
    assets: { name: string; browser_download_url: string; size: number }[];
}

export const GameApi = {
    async getRelease(repo: string, perPage: number): Promise<Release[]> {
        return request("GET", `https://api.github.com/repos/${repo}/releases?per_page=${perPage}`)
    },
}