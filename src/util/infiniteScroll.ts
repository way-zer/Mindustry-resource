import {onBeforeUnmount} from 'vue'

//Must call in setup
export default function (checkTime: number, offset: number, disable: () => boolean, callback: () => void): void {
    const check = () => {
        const obj = document.documentElement
        if (!disable() && obj.scrollHeight - obj.scrollTop - obj.clientHeight < offset)
            callback()
    }

    let debounce: NodeJS.Timeout
    const handler = () => {
        clearTimeout(debounce)
        debounce = setTimeout(check, checkTime)
    }
    document.addEventListener('scroll', handler, {passive: true})
    onBeforeUnmount(() => {
        document.removeEventListener('scroll', handler)
        clearTimeout(debounce)
    })
    callback()//once
}