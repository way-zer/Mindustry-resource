import { defineConfig, presetUno, presetTagify, transformerVariantGroup } from 'unocss'
import { presetDaisy } from "unocss-preset-daisy"

export default defineConfig({
    presets: [
        presetTagify({ prefix: "un-" }),
        presetUno(),
        presetDaisy(),
    ],
    transformers: [
        transformerVariantGroup(),
    ]
})