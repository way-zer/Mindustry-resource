import {createLogger, createStore} from 'vuex'

export const store = createStore({
    plugins: import.meta.env.DEV?[createLogger()]:[]
})