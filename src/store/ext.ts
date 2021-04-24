/* eslint-disable */
import {
    ActionHandler,
    CommitOptions,
    createStore,
    DispatchOptions,
    GetterTree,
    MutationTree,
    Store,
    StoreOptions,
} from "vuex";

type Getter<S, G extends GetterTree<S, S>> = {
    [N in keyof G]: ReturnType<G[N]>
}

type MyActionTree<S> = {
    [key: string]: ActionHandler<S, S>
}

export interface StoreExt<S, G extends GetterTree<S, S>, M extends MutationTree<S>, A extends MyActionTree<S>>
    extends Pick<Store<S>, 'install' | 'replaceState' | 'subscribe' | 'subscribeAction' | 'watch'> {
    readonly state: S
    readonly getters: Getter<S, G>

    commit<N extends keyof M>(name: N, payload?: Parameters<M[N]>[1], options?: CommitOptions): void;

    dispatch<N extends keyof A>(name: N, payload?: Parameters<A[N]>[2], options?: DispatchOptions): Promise<ReturnType<A[N]>>

    hotUpdate(options: { actions?: A, mutations?: M, getters?: G }): void;
}

export interface StoreOptionsExt<S, G extends GetterTree<S, S>, M extends MutationTree<S>, A extends MyActionTree<S>> extends StoreOptions<S> {
    getters?: G;
    actions?: A;
    mutations?: M;
}

export function createStoreExt<S, G extends GetterTree<S, S>, M extends MutationTree<S>, A extends MyActionTree<S>>(options: StoreOptionsExt<S, G, M, A>): StoreExt<S, G, M, A> {
    // @ts-ignore
    return createStore(options) as StoreExt<S, G, M, A>
}

