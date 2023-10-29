<template>
  <div ref="container" />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, ref, watch } from "vue";
import { loadMonaco } from "./_myUtil";
import type { editor as Editor } from "monaco-editor";
import type { Monaco } from "@monaco-editor/loader";

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    "default": 'vs'
  },
  language: String,
  file: {
    type: String,
    required: true
  },
  options: Object,
  original: String,
  amdRequire: {
    type: Function
  },
  diffEditor: {
    type: Boolean,
    "default": false
  }
})
const emit = defineEmits<{
  (event: 'editorWillMount', monaco: Monaco): void,
  (event: 'update:modelValue', value: string, rawEvent: Editor.IModelContentChangedEvent): void,
  (event: 'editorDidMount', editor: Editor.IStandaloneCodeEditor): void,
}>()
watch(() => props.modelValue, (v) => {
  if (editor?.getValue() !== v)
    editor?.setValue(v)
})

const container = ref<HTMLDivElement>()
let editor: Editor.IStandaloneCodeEditor | null = null
onBeforeMount(() => {
  loadMonaco().then((monaco) => {
    emit("editorWillMount", monaco)
    const model = monaco.editor.createModel(props.modelValue, props.language, monaco.Uri.parse(props.file))
    const ed = editor = monaco.editor.create(container.value!!, Object.assign({ model }), props.options)
    ed.onDidChangeModelContent((event) => {
      const newValue = ed.getValue()
      if (props.modelValue !== newValue) {
        emit("update:modelValue", newValue, event)
      }
    })
    emit("editorDidMount", ed)
  })
})
onBeforeUnmount(() => {
  editor?.getModel()?.dispose()
  editor?.dispose()
})
</script>

<style scoped></style>