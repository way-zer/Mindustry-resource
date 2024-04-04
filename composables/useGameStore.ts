export interface ReleaseType {
    html_url: string;
    tag_name: string;
    published_at: string;
    assets: { name: string; browser_download_url: string; size: number }[];
}

function getRelease(repo: string, perPage: number) {
    return request<ReleaseType[]>('GET', `https://api.github.com/repos/${repo}/releases?per_page=${perPage}`)
}

export default defineStore('game', () => {
    const {data: releases} = asyncData(() => getRelease('Anuken/Mindustry', 5), [], {server: false})
    const {data: beReleases} = asyncData(() => getRelease('Anuken/MindustryBuilds', 15), [], {server: false})
    const useMirror = ref(true)
    return {
        releases, beReleases, useMirror,

        getDownloadUrl(url: string) {
            if (!useMirror.value) return url
            return 'https://gh.tinylake.tech/' + url
        }
    }
})