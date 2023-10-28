export interface ReleaseType {
    html_url: string;
    tag_name: string;
    published_at: string;
    assets: { name: string; browser_download_url: string; size: number }[];
}

function releaseUrl(repo: string, perPage: number) {
    return `https://api.github.com/repos/${repo}/releases?per_page=${perPage}`
}
function useRelease(repo: string, perPage: number) {
    return useFetch<ReleaseType[]>(releaseUrl(repo, perPage), { server: false, default: () => [] })
}

export default function () {
    const { data: releases } = useRelease('Anuken/Mindustry', 5)
    const { data: beReleases } = useRelease('Anuken/MindustryBuilds', 15)
    const useMirror = ref(true)
    return {
        releases, beReleases, useMirror,

        getDownloadUrl(url: string) {
            if (!useMirror.value) return url
            return 'https://gh.tinylake.tk/' + url
        }
    }
}