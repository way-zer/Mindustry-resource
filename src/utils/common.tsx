import { message } from 'antd';
import { useCallback } from 'react';
import { debounce } from '@ant-design/pro-layout/lib/utils/utils';

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

export function useDebounce(callback: Function, delay: number): any {
  // @ts-ignore
  return useCallback(debounce(callback, delay), [delay]);
}
