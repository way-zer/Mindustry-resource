import React from 'react';
import {
  Button,
  Card,
  Col,
  message,
  PageHeader,
  Popover,
  Row,
  Spin,
  Tooltip,
  Upload,
} from 'antd';
import { BarsOutlined, CopyOutlined, InboxOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/es/upload/interface';

function onChange(callback: (response: any) => void) {
  return function({ file }: UploadChangeParam<UploadFile>) {
    if (file.status === 'done') {
      message.success('上传成功');
      callback(file.response);
    } else if (file.status === 'error') {
      message.error('上传失败' + file.response);
    }
  };
}

export default function() {
  const { maps, pullMore, loading, uploadFinish } = useModel('maps');
  return (
    <PageHeader
      title={'地图分享'}
      extra={
        [
          // <Upload style={{padding: "0 16px"}}><Button><UploadOutlined/>上传新地图</Button></Upload>
        ]
      }
    >
      <Row gutter={16}>
        {maps.map(map => (
          <Col xs={24} sm={12} md={8} lg={6} key={map.hash}>
            <Card
              cover={
                <img
                  className={'mapPreview'}
                  src={map.imgUrl}
                  alt={'map Preview'}
                  style={{ objectFit: 'contain' }}
                />
              }
              actions={[
                <Tooltip title={'拷贝换图指令'}>
                  <Popover
                    content={
                      <>
                        拷贝下列指令到支持的服务器使用
                        <pre>/vote map {map.hash}</pre>
                      </>
                    }
                    trigger={'click'}
                  >
                    <CopyOutlined />
                  </Popover>
                </Tooltip>,
                <Tooltip title={'查看详情'}>
                  <BarsOutlined />
                </Tooltip>,
              ]}
            >
              <Card.Meta title={map.name} description={map.desc} />
            </Card>
          </Col>
        ))}
        <Col xs={24} sm={12} md={8} lg={6} key={'upload'}>
          <Card style={{ height: '100%' }}>
            <Upload.Dragger
              action={'/api/maps/upload'}
              onChange={onChange(uploadFinish)}
              multiple={false}
              style={{ height: '100%' }}
            >
              <p className={'ant-upload-drag-icon'}>
                <InboxOutlined />
              </p>
              <p className={'ant-upload-text'}>点击或拖动文件到此,进行上传</p>
              <p className={'ant-upload-hint'}>
                文件格式.msav游戏地图存档,大小限制100kB
              </p>
            </Upload.Dragger>
          </Card>
        </Col>
      </Row>
      <Spin spinning={loading}>
        <Button
          style={{ width: '100%', textAlign: 'center' }}
          onClick={pullMore}
        >
          加载更多
        </Button>
      </Spin>
    </PageHeader>
  );
}
