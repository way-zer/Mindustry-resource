import { message } from 'antd';

export function copyContent(getNode: () => Node) {
  if (document.getSelection()) {
    setImmediate(() => {
      document.getSelection()?.removeAllRanges();
      const range = document.createRange();
      range.selectNodeContents(getNode());
      document.getSelection()?.addRange(range);
      document.execCommand('copy');
      message.info('拷贝到剪切板成功');
    });
  }
}
