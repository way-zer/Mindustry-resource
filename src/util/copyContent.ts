import {ElMessage} from 'element-plus'
import select from 'select'

export function copyContent(getNode: () => Node, time = 3) {
    if (import.meta.env.SSR) return
    if (document.getSelection()) {
        const node = getNode()
        if (node) {
            try {
                select(node)
                document.execCommand('copy')
                ElMessage.success('拷贝到剪切板成功')
            } catch (err) {
            }
        } else if (time) setTimeout(() => {
            copyContent(getNode, time - 1)
        })
    }
}