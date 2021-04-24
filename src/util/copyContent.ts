import {ElMessage} from "element-plus";

export function copyContent(getNode: () => Node) {
    if (document.getSelection()) {
        document.getSelection()?.removeAllRanges();
        const range = document.createRange();
        range.selectNodeContents(getNode());
        document.getSelection()?.addRange(range);
        document.execCommand('copy');
        ElMessage.success('拷贝到剪切板成功');
    }
}