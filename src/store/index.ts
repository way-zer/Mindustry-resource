import {createLogger, createStore} from 'vuex'

export const store = createStore({
    plugins: import.meta.env.DEV ? [createLogger()] : [],
    strict: import.meta.env.DEV,
    devtools: import.meta.env.DEV,
})