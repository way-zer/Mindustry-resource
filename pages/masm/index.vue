<template>
  <PageHeader title="高级逻辑编辑器">
    <el-alert type="warning" show-icon>编辑会自动保存，但注意定期备份，以免丢失</el-alert>
    <monaco-editor class="editor" v-model="code" language="typescript" @editorWillMount="configTS" :file="file"/>
    <template #actions>
      <el-button @click="code = IndexTs" type="danger">重置</el-button>
      <el-button @click="showOutput">输出逻辑代码</el-button>
    </template>
  </PageHeader>
  <el-dialog v-model="showDialog" title="MASM代码" center>
    <el-tabs>
      <el-tab-pane v-for="(output,i) of outputs" :label="'Output #'+(i+1)">
        <pre>{{ output }}</pre>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script lang="ts" setup>
import PageHeader from "@/components/PageHeader.vue";
import MonacoEditor from './Editor.vue';
import {compile, configTS, runCodes} from "./_myUtil";
import {ref, watch} from "vue";
import IndexTs from "./res?raw"

const KEY = "masmSave"
const file = "inmemory:/index.ts"

const code = useLocalStorage(KEY, IndexTs)
const outputs = ref([] as string[])
const showDialog = ref(false)

async function showOutput() {
  outputs.value = ["正在编译中"]
  const codes = await compile(file)
  outputs.value = (await runCodes(codes)).outputs
  showDialog.value = true
}
</script>

<style scoped>
.editor {
  width: 100%;
  height: 80vh;
}
</style>