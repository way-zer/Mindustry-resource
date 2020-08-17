import React from 'react';
import {
  Alert,
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
import { history, useModel } from 'umi';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/es/upload/interface';
import { copyContent } from '@/utils/common';

function onChange(callback: (response: any) => void) {
  return function({ file }: UploadChangeParam<UploadFile>) {
    if (file.status === 'done') {
      message.success('上传成功');
      if (typeof file.response === 'string')
        history.push('/maps/' + file.response + '/detail');
      else callback(file.response);
    } else if (file.status === 'error') {
      message.error('上传失败' + file.response);
    }
  };
}

export default function MapsIndex(props: { children: React.ReactNode }) {
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
      <Alert
        message={
          '使用指令换图时,若模式不对,可在指令后面附加模式参数,例如"/vote map xxxx A-TD"代表进攻塔防模式,S-TD为生存塔防,S生存,A进攻,P为PVP,C为沙盒'
        }
        banner
        closable
      />
      <Row gutter={16}>
        {maps.map(map => (
          <Col xs={24} sm={12} md={8} lg={6} key={map.hash}>
            <Card
              cover={
                <div
                  style={{
                    width: '100%',
                    height: '0',
                    paddingBottom: '100%',
                    position: 'relative',
                  }}
                >
                  <img
                    src={map.preview}
                    alt={'map Preview'}
                    style={{
                      objectFit: 'contain',
                      width: '96%',
                      height: '96%',
                      position: 'absolute',
                      left: '2%',
                      top: '2%',
                    }}
                  />
                </div>
              }
              actions={[
                <Tooltip title={'拷贝换图指令'}>
                  <Popover
                    content={
                      <>
                        <pre>/vote map {map.hash}</pre>
                        粘贴指令到支持网络换图的服务器使用
                      </>
                    }
                    trigger={'click'}
                  >
                    <CopyOutlined
                      onClick={copyContent.bind(null, () => {
                        return document
                          .getElementsByClassName(
                            'ant-popover-inner-content',
                          )[0]
                          .getElementsByTagName('pre')[0];
                      })}
                    />
                  </Popover>
                </Tooltip>,
                <Tooltip title={'查看详情'}>
                  <BarsOutlined
                    onClick={() => {
                      history.push('/maps/' + map.hash + '/detail');
                    }}
                  />
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
      {props.children}
    </PageHeader>
  );
}
