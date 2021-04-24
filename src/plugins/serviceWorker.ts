import { registerSW } from 'virtual:pwa-register'

export const updateSW = registerSW( {
  immediate: true,
  onNeedRefresh(){
    console.log("need to refresh")
  },
  onOfflineReady(){
    console.log('No internet connection found. App is running in offline mode.')
  }
})
