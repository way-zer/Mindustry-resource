import {UniSSRHandler} from "@/util/viteSSR/types";

export let viteSSR: UniSSRHandler
if (import.meta.env.SSR)
    viteSSR = (await import("./entry-server")).default
else
    viteSSR = (await import("./entry-client")).default
export default viteSSR