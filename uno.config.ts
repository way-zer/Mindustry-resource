import {defineConfig, presetUno, presetTypography} from 'unocss'
import {presetDaisy} from "unocss-preset-daisy"

export default defineConfig({
    presets: [
        presetUno(),
        presetDaisy({
            themes: ["corporate"]
        }),
        presetTypography(),
    ],
    transformers: []
})