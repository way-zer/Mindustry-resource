import {ref} from 'vue'

export let isMobile = ref(false)
{
    isMobile.value = window.innerWidth < 768
    addEventListener('resize', () => {
        isMobile.value = window.innerWidth < 768
    }, {passive: true})
}