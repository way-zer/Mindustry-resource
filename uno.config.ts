import { defineConfig, presetUno, presetTagify, transformerVariantGroup, presetTypography } from 'unocss'
import { presetDaisy } from "unocss-preset-daisy"

export default defineConfig({
    presets: [
        presetTagify({ prefix: "un-" }),
        presetUno(),
        presetDaisy({
            themes: ["corporate"]
        }),
        presetTypography(),
    ],
    transformers: [
        transformerVariantGroup(),
    ]
})