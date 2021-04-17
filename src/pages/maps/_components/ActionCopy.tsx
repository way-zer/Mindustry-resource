import { Popover, Tooltip } from 'antd';
import { copyContent } from '@/utils/common';
import React, { ReactElement } from 'react';

export function ActionCopy({
  thread,
  hash,
  content,
}: {
  thread: string;
  hash: string;
  content: (onClick: () => void) => ReactElement;
}) {
  return (
    <Tooltip title={'拷贝换图指令'} destroyTooltipOnHide={{ keepParent: false }}>
      <Popover
        content={
          <>
            <pre>/vote web {thread}</pre>
            粘贴指令到支持网络换图的服务器使用
            <br />
            如果服务器仍在使用旧版本插件,请使用下面指令换图
            <pre>/vote map {(hash || '').replaceAll('-', '')}</pre>
          </>
        }
        trigger={'click'}
        destroyTooltipOnHide={{ keepParent: false }}
      >
        {content(
          copyContent.bind(null, () => {
            return document.getElementsByClassName('ant-popover-inner-content')[0].getElementsByTagName('pre')[0];
          }),
        )}
      </Popover>
    </Tooltip>
  );
}
