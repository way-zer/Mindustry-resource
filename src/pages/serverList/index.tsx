import React from 'react';
import { Layout, Menu, Switch, Table, Tooltip } from 'antd';
import { Type as Info } from '@/pages/serverList/_type';

import {
  FrownFilled,
  MehFilled,
  PlusOutlined,
  SmileFilled,
} from '@ant-design/icons';
import { request } from '@@/plugin-request/request';
import { colorize, modeFilters, modeMap } from '@/pages/serverList/_util';
import { AddModel } from '@/pages/serverList/_addModel';
import { Helmet } from '@@/plugin-helmet/exports';

const { Column } = Table;

const renderAddress = (_: any, v: Info) => {
  if (v.online)
    return (
      <Tooltip title={'延迟' + v.timeMs + 'ms'}>
        <div>
          <SmileFilled style={{ marginRight: '0.5rem', color: 'green' }} />
          {v.address}
        </div>
      </Tooltip>
    );
  else {
    const d = (Date.now() - v.lastOnline) / 1000;
    if (d < 60)
      return (
        <Tooltip title={'暂时连接失败'}>
          <div>
            <MehFilled style={{ marginRight: '0.5rem', color: 'yellow' }} />
            {v.address}
          </div>
        </Tooltip>
      );
    else
      return (
        <Tooltip title={'最后在线' + (d / 60).toFixed(2) + '分钟前'}>
          <div>
            <FrownFilled style={{ marginRight: '0.5rem', color: 'red' }} />
            {v.address}
          </div>
        </Tooltip>
      );
  }
};
const renderInfo = (_: any, v: Info) => {
  return (
    <>
      {colorize(v.name)}
      <br />
      {colorize(v.description)}
    </>
  );
};
const renderPlayers = (_: any, v: Info) => {
  return (
    <>
      <b>{v.players}</b>/{v.limit || '无限制'}
    </>
  );
};
const renderMap = (_: any, v: Info) => {
  return (
    <>
      {colorize(v.mapName)}
      <br />
      模式: {modeMap[v.mode]},第{v.wave}波
    </>
  );
};

export default class ServerList extends React.Component<
  {},
  { data: Info[]; modal: boolean; autoUpdate: boolean }
> {
  state = { data: [], modal: false, autoUpdate: false };

  render() {
    return (
      <Layout>
        <Helmet>
          <title>Mindustry 服务器列表</title>
        </Helmet>
        <Layout.Header>
          <h2 className="logo" style={{ color: 'goldenrod' }}>
            Mindustry 服务器列表
          </h2>
          <Menu
            theme={'dark'}
            mode="horizontal"
            selectable={false}
            style={{ position: 'absolute', right: 0, top: 0 }}
          >
            <Menu.Item>
              <Switch
                checkedChildren={'自动刷新'}
                unCheckedChildren={'自动刷新'}
                defaultChecked={true}
                onChange={v => {
                  this.setState({ autoUpdate: v });
                }}
              />
            </Menu.Item>
            <Menu.Item
              icon={<PlusOutlined />}
              onClick={() => {
                this.setState({ modal: true });
              }}
            >
              添加服务器
            </Menu.Item>
          </Menu>
        </Layout.Header>
        <Layout.Content>
          {this.state.modal && (
            <AddModel
              close={b => {
                this.setState({ modal: false });
                if (b) this.fetch();
              }}
            />
          )}
          <Table<Info>
            dataSource={this.state.data}
            size={'middle'}
            pagination={false}
            rowKey="address"
          >
            <Column
              title="地址"
              dataIndex="address"
              fixed="left"
              render={renderAddress}
            />
            <Column title="名字" dataIndex="name" render={renderInfo} />
            {/*<Column title="介绍" dataIndex="description"/>*/}
            <Column
              title="人数"
              dataIndex="players"
              render={renderPlayers}
              sorter={(a, b) => a.players - b.players}
            />
            <Column
              title="地图"
              dataIndex="mapName"
              render={renderMap}
              onFilter={(f, v) => v.mode == f}
              filters={modeFilters}
            />
          </Table>
        </Layout.Content>
      </Layout>
    );
  }

  timeout: NodeJS.Timeout | undefined;
  componentDidMount() {
    this.fetch();
    this.timeout = setInterval(() => {
      if (this.state.autoUpdate) this.fetch();
    }, 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeout!!);
  }

  fetch() {
    request('/servers/list').then((data: Info[]) => {
      this.setState({ data });
    });
  }
}
