import {defineStore, getActivePinia, Store} from "pinia";

/**
 * @param Module 类名
 * @param id Store的id,可选，默认使用类名
 */
export function useStore<T extends (new (...args) => any)>(Module: T, id?: string): InstanceType<T> & Store<string, T, T, T> {
    id = id || Module.name
    if (getActivePinia()?.state[id]) return getActivePinia()?.state[id] as InstanceType<T>
    const instance = new Module()

    const initialState = {}
    for (const key of Object.keys(instance)) {
        if (instance.hasOwnProperty(key))
            initialState[key] = instance[key]
    }
    const getters = {}
    const actions = {}
    for (const key of Object.getOwnPropertyNames(Module.prototype)) {
        const descriptor = Object.getOwnPropertyDescriptor(Module.prototype, key)!!
        if (descriptor.get) {
            getters[key] = (state) => descriptor.get!!.call(state)
        }
        if (descriptor.value) {
            actions[key] = Module.prototype[key]
        }
    }
    const store = defineStore(id, {
        state: () => initialState,
        getters, actions
    })() as InstanceType<T>
    Object.setPrototypeOf(store, Module)
    return store
}