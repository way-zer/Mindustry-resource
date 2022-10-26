import {UniSSRHandler} from "@/util/viteSSR/types";
import serverViteSSR from "./entry-server"
import clientViteSSR from "./entry-client"

export let viteSSR: UniSSRHandler = import.meta.env.SSR ? serverViteSSR : clientViteSSR
export default viteSSR