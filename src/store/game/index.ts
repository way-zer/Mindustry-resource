import {Action, Module, VuexModule} from 'vuex-class-modules'
import {GameApi, Release} from '@/store/game/api'

@Module({generateMutationSetters: true})
export class GameModule extends VuexModule {
    loading = false
    releases = [] as Release[]
    beReleases = [] as Release[]

    @Action
    async tryLoad() {
        if (this.loading) return
        this.loading = true
        let load1, load2
        if (!this.releases.length) {
            load1 = GameApi.getRelease('Anuken/Mindustry', 5)
                .then(d => this.releases = d)
        } else load1 = null
        if (!this.beReleases.length) {
            load2 = GameApi.getRelease('Anuken/MindustryBuilds', 15)
                .then(d => this.beReleases = d)
        } else load2 = null

        await load1
        await load2
        this.loading = false
    }
}