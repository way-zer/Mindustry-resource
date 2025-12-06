<template>
	<PageHeader title="高级逻辑编辑器">
		<el-alert type="warning" show-icon>
			该编辑器已弃用，推荐使用
			<a class="link" href="https://mlogjs.github.io/mlogjs/editor.html"
				>MLogJS</a
			>
		</el-alert>
		<el-alert type="info" show-icon
			>编辑会自动保存，但注意定期备份，以免丢失</el-alert
		>
		<monaco-editor
			v-model="code"
			class="editor"
			language="typescript"
			:file="file"
			@editor-will-mount="configTS"
		/>
		<template #actions>
			<el-button type="danger" @click="code = IndexTs">重置</el-button>
			<el-button @click="showOutput">输出逻辑代码</el-button>
		</template>
	</PageHeader>
	<el-dialog v-model="showDialog" title="MASM代码" center>
		<el-alert v-if="error" type="warning">{{ error }}</el-alert>
		<el-tabs>
			<el-tab-pane
				v-for="(output, i) of outputs"
				:key="i"
				:label="output.name ?? 'Output #' + (i + 1)"
			>
				<pre>{{ output.content }}</pre>
			</el-tab-pane>
		</el-tabs>
	</el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import PageHeader from "@/components/PageHeader.vue"
import { compile, configTS, runCodes } from "./_myUtil"
import MonacoEditor from "./Editor.vue"
import IndexTs from "./res?raw"

useHead({
	title: "逻辑生成器",
	meta: [
		{ name: "description", content: "像素工厂资源站，逻辑生成器" },
		{
			name: "keywords",
			content: "Mindustry,像素工厂,资源站,游戏,逻辑,Logic,mlog,微泽",
		},
	],
})

const KEY = "masmSave"
const file = "inmemory:/index.ts"

const code = useLocalStorage(KEY, IndexTs)
const outputs = ref([] as { name?: string; content: string }[])
const error = ref("")
const showDialog = ref(false)

async function showOutput() {
	outputs.value = [{ content: "正在编译中" }]
	const codes = await compile(file)
	const res = await runCodes(codes)
	error.value = res.error
	outputs.value = res.outputs
	showDialog.value = true
}
</script>

<style scoped>
.editor {
	width: 100%;
	height: 80vh;
}
</style>
