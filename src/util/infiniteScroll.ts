import {onBeforeUnmount} from 'vue'

//Must call in setup
export default function (checkTime: number, offset: number, disable: () => boolean, callback: () => void): void {
    const check = () => {
        const obj = document.documentElement
        if (!disable() && obj.scrollHeight - obj.scrollTop - obj.clientHeight < offset)
            callback()
    }

    let debounce: NodeJS.Timeout;
    document.onscroll = () => {
        clearTimeout(debounce)
        debounce = setTimeout(check, checkTime)
    }
    onBeforeUnmount(() => {
        document.onscroll = null
        clearTimeout(debounce)
    })
    callback()//once
}