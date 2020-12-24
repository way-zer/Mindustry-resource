import { message, Tooltip } from 'antd';
import React, { ReactElement } from 'react';
import { requestToken } from '@/utils/reCaptcha';
import { useModel } from '@@/plugin-model/useModel';

export function ActionDownload({
  hash,
  content,
}: {
  hash: string;
  content: (onClick: () => void) => ReactElement;
}) {
  const { info } = useModel('user');
  return (
    <Tooltip title={'下载地图'} key={'download'}>
      {content(async () => {
        if (info == null) return message.error('请先登录后再下载', 10);
        const token = await requestToken('mapDownload');
        window.open(`/api/maps/download?token=${token}&id=${hash}`);
      })}
    </Tooltip>
  );
}
