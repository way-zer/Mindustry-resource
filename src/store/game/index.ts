import {Action, Module, VuexModule} from 'vuex-class-modules'
import {GameApi, Release} from '@/store/game/api'
import {store} from '@/store'

@Module({generateMutationSetters: true})
class GameModule extends VuexModule {
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
        }
        if (!this.beReleases.length) {
            load2 = GameApi.getRelease('Anuken/MindustryBuilds', 15)
                .then(d => this.beReleases = d)
        }
        await load1
        await load2
        this.loading = false
    }
}

export const gameStore = new GameModule({store, name: 'game'})