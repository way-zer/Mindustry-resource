import {onBeforeUnmount, onMounted} from 'vue'
import throttle from 'lodash-es/throttle'

//Must call in setup
export default function (checkTime: number, offset: number, disable: () => boolean, callback: () => void): void {
    if (import.meta.env.SSR) return
    const check = () => {
        const obj = document.documentElement
        if (!disable() && obj.scrollHeight - obj.scrollTop - obj.clientHeight < offset)
            callback()
    }

    const handler = throttle(check, checkTime)
    onBeforeUnmount(() => {
        document.removeEventListener('scroll', handler)
    })
    onMounted(() => {
        document.addEventListener('scroll', handler, {passive: true})
    })
}