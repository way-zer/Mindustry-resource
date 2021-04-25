import {ElMessage} from "element-plus";

export function copyContent(getNode: () => Node, time = 3) {
    if (document.getSelection()) {
        const node = getNode()
        if (node) {
            document.getSelection()?.removeAllRanges();
            const range = document.createRange();
            range.selectNodeContents(getNode());
            document.getSelection()?.addRange(range);
            document.execCommand('copy');
            ElMessage.success('拷贝到剪切板成功');
        } else if (time) setTimeout(() => {
            copyContent(getNode, time - 1)
        })
    }
}