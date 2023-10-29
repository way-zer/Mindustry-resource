import BuilderTS from "./res/builder.ts?raw"
import AsmOpTS from "./res/asmOp.ts?raw"
import AdvanceOpTS from "./res/advanceOp.ts?raw"
import ConstTS from "./res/const.ts?raw"
import "ses"
import loader, {type Monaco} from "@monaco-editor/loader";

export const libs = [
    {filePath: "inmemory:/builder.ts", content: BuilderTS},
    {filePath: "inmemory:/asmOp.ts", content: AsmOpTS},
    {filePath: "inmemory:/advanceOp.ts", content: AdvanceOpTS},
    {filePath: "inmemory:/const.ts", content: ConstTS},
]

let monaco: Promise<Monaco> | undefined = undefined

export function loadMonaco(): Promise<Monaco> {
    return monaco || (monaco = (async () => {
        loader.config({
            paths: {
                vs: "https://cdn.bootcdn.net/ajax/libs/monaco-editor/0.44.0/min/vs"
            }
        })
        const monaco = await loader.init()
        configTS(monaco)
        return monaco
    })())
}

export function configTS(monaco: Monaco) {
    const config = monaco.languages.typescript.typescriptDefaults
    config.setCompilerOptions({
        // lib: ["builder", "asmOp", "advanceOp"],
        noLib: true,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.Classic,
        module: monaco.languages.typescript.ModuleKind.ESNext
    })
    config.setExtraLibs(libs)
}

export async function compile(file: string): Promise<string[]> {
    const monaco = await loadMonaco()
    const getWorker = await monaco.languages.typescript.getTypeScriptWorker()
    const worker = await getWorker(monaco.Uri.parse(file))
    const files = [] as string[]
    for (const lib of libs.map(lib => lib.filePath).concat(file)) {
        const out = await worker.getEmitOutput(lib)
        files.push(...out.outputFiles.map(it => it.text))
    }
    return files
}

export async function runCodes(codes: string[]) {
    let error = ""
    let outputs = [] as string[]
    const c = new Compartment({
        error: (err) => {
            error += err + "\n"
        },
        output: (out) => {
            outputs.push(out)
        }
    })
    const code = codes.join("\n")
    console.debug(code)
    c.evaluate(code)
    return {error, outputs}
}