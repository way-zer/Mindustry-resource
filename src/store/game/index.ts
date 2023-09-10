import {GameApi, type Release} from './api'

export class GameStore {
    //@ts-ignore
    static name = "GameStore"
    loading = false
    useMirror = true
    releases = [] as Release[]
    beReleases = [] as Release[]

    async tryLoad() {
        if (this.loading) return
        this.loading = true
        await Promise.all([
            this.releases.length || GameApi.getRelease('Anuken/Mindustry', 5)
                .then(d => this.releases = d),
            this.beReleases.length || GameApi.getRelease('Anuken/MindustryBuilds', 15)
                .then(d => this.beReleases = d)
        ])
        this.loading = false
    }

    getDownloadUrl(url: string){
        if (!this.useMirror) return url
        return 'https://gh.tinylake.tk/' + url
    }
}