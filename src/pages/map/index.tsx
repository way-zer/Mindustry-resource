import { Upload, message } from 'antd';
import { history } from 'umi';
import { InboxOutlined } from '@ant-design/icons';
import React from 'react';
import { UploadFile } from 'antd/es/upload/interface';
import { UploadChangeParam } from 'antd/lib/upload';

export default function MapManager() {
  function onChange({ file }: UploadChangeParam<UploadFile>) {
    if (file.status === 'done') {
      message.success('上传成功');
      history.push('upload/' + file.response);
    } else if (file.status === 'error') {
      message.error('上传失败' + file.response);
    }
  }
  return (
    <Upload.Dragger action={'/map/upload'} onChange={onChange} multiple={false}>
      <p className={'ant-upload-drag-icon'}>
        <InboxOutlined />
      </p>
      <p className={'ant-upload-text'}>点击或拖动文件到此,进行上传</p>
      <p className={'ant-upload-hint'}>
        文件格式.msav游戏地图存档,大小限制100kB
      </p>
    </Upload.Dragger>
  );
}
