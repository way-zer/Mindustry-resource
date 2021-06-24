import React, { useEffect } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Empty,
  Input,
  message,
  PageHeader,
  Radio,
  Row,
  Spin,
  Tag,
  Tooltip,
  Upload,
} from 'antd';
import { BarsOutlined, CloseOutlined, CopyOutlined, DownloadOutlined, InboxOutlined } from '@ant-design/icons';
import { history, useModel } from 'umi';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/es/upload/interface';
import { colorize } from '@/utils/mindustry';
import SquaredImage from '@/components/squaredImage';
import { ActionCopy } from '@/pages/maps/_components/ActionCopy';
import { ActionDownload } from '@/pages/maps/_components/ActionDownload';
import { modes } from '@/pages/maps/_components/ActionChangeMode';

async function uploadUrl() {
  return message.warn('网站结构性升级，该功能暂时不可用', 30_000);
  // return '/api/maps/upload?token=' + (await requestToken('mapUpload'));
}

function onChange(callback: (response: any) => void) {
  return function({ file }: UploadChangeParam<UploadFile>) {
    if (file.status === 'done') {
      message.success('上传成功');
      if (typeof file.response === 'string') history!!.push('/maps/' + file.response + '/detail');
      else callback(file.response);
    } else if (file.status === 'error') {
      message.error('上传失败' + file.response);
    }
  };
}

export default function MapsIndex(props: { children: React.ReactNode }) {
  const { maps, searchKey, pullMore, noData, loading, uploadFinish, onSearch } = useModel('maps');
  useEffect(() => {
    //Run once
    if (maps.length || loading || noData) return;
    pullMore().then();
  }, [loading]);
  return (
    <PageHeader
      title={'地图分享'}
      extra={[
        <Input.Search
          key={'search'}
          placeholder={'查找地图'}
          allowClear
          style={{ width: 'unset' }}
          onSearch={async it => {
            await onSearch(it);
          }}
          defaultValue={searchKey}
          loading={loading}
        />,
        <Upload
          key={'upload'}
          action={uploadUrl}
          onChange={onChange(uploadFinish)}
          // accept={'.msav'}
        >
          <Button>上传新地图</Button>
        </Upload>,
      ]}
    >
      <Alert message={'/vote map 12345 为新版换图指令,部分服务器暂不支持,可以手动拷贝旧版本换图指令'} banner closable />
      <div style={{ margin: '8px' }}>
        <b style={{ marginRight: 8, fontSize: '16px', lineHeight: '32px' }}>按模式筛选:</b>
        <Radio.Group
          value={(searchKey.match('@mode:([a-zA-Z]+) ') || [])[1]}
          onChange={e => {
            if (e.target.value) onSearch('@mode:' + e.target.value + ' ').then();
            else onSearch('').then();
          }}
        >
          {modes.map(mode => (
            <Radio.Button value={mode}>{mode}</Radio.Button>
          ))}
          <Radio.Button value={''}>
            <CloseOutlined />
          </Radio.Button>
        </Radio.Group>
      </div>
      <Row gutter={16}>
        {noData && (
          <Col xs={24} sm={12} md={8} lg={6} key={'noData'}>
            <Card style={{ height: '100%' }}>
              <Empty />
            </Card>
          </Col>
        )}
        {maps.map(map => (
          <Col xs={24} sm={12} md={8} lg={6} key={map.id}>
            <Card
              cover={<SquaredImage src={map.preview} />}
              actions={[
                <ActionCopy
                  thread={map.id}
                  hash={map.latest}
                  key={'copy'}
                  content={it => <CopyOutlined onClick={it} />}
                />,
                <ActionDownload hash={map.latest} key={'download'} content={it => <DownloadOutlined onClick={it} />} />,
                <Tooltip title={'查看详情'} key={'detail'}>
                  <BarsOutlined
                    onClick={() => {
                      history!!.push('/map/' + map.id + '/latest');
                    }}
                  />
                </Tooltip>,
              ]}
            >
              {map.tags.map((it, i) => (
                <Tag color={it.split('§')[1] || 'default'} key={i}>
                  {colorize(it.split('§')[0])}
                </Tag>
              ))}
              <Card.Meta title={map.name} description={map.desc} />
            </Card>
          </Col>
        ))}
        <Col xs={24} sm={12} md={8} lg={6} key={'upload'}>
          <Card style={{ height: '100%' }}>
            <Upload.Dragger
              // accept={'.msav'}
              action={uploadUrl}
              onChange={onChange(uploadFinish)}
              multiple={false}
              style={{ height: '100%' }}
            >
              <p className={'ant-upload-drag-icon'}>
                <InboxOutlined />
              </p>
              <p className={'ant-upload-text'}>点击或拖动文件到此,进行上传</p>
              <p className={'ant-upload-hint'}>文件格式.msav游戏地图存档,大小限制100kB</p>
            </Upload.Dragger>
          </Card>
        </Col>
      </Row>
      <Spin spinning={loading}>
        <Button style={{ width: '100%', textAlign: 'center' }} onClick={pullMore}>
          加载更多
        </Button>
      </Spin>
      {props.children}
    </PageHeader>
  );
}
