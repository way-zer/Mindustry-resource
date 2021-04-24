import Vue from "vue";
import ColorizeSpan from "@/components/ColorizeSpan.vue";
import IconButton from "@/components/IconButton.vue";
import SquaredImage from "@/components/SquaredImage.vue";

export function installGlobalComponent(app: Vue.App) {
    app.component(ColorizeSpan.name, ColorizeSpan)
    app.component(IconButton.name, IconButton)
    app.component(SquaredImage.name, SquaredImage)
}