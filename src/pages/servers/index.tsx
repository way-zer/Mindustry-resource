import React from 'react';
import { Badge, Button, PageHeader, Switch, Table, Tooltip } from 'antd';
import { Type as Info } from '@/pages/servers/_type';
import { request } from 'umi';

import { FrownFilled, MehFilled, PlusOutlined, SmileFilled } from '@ant-design/icons';
import { colorize, modeFilters, modeMap } from '@/utils/mindustry';
import { AddModel } from '@/pages/servers/_addModel';

const isLobby = (v: Info) => v.name.indexOf('大厅') >= 0 || v.mapName == 'Mech_Machinery';
const renderAddress = (_: any, v: Info) => {
  let tooltip: string;
  let icon: React.ReactElement;
  if (v.online) {
    tooltip = '延迟' + v.timeMs + 'ms';
    icon = <SmileFilled style={{ marginRight: '0.5rem', color: 'green' }} />;
  } else {
    const d = (Date.now() - v.lastOnline) / 1000;
    if (d < 60) {
      tooltip = '暂时连接失败';
      icon = <MehFilled style={{ marginRight: '0.5rem', color: 'yellow' }} />;
    } else {
      tooltip = '最后在线' + (d / 60).toFixed(2) + '分钟前';
      icon = <FrownFilled style={{ marginRight: '0.5rem', color: 'red' }} />;
    }
  }
  return (
    <Tooltip title={tooltip}>
      <div>
        {v.address}
        <br />
        {icon} 版本 {v.version}
      </div>
    </Tooltip>
  );
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
      {isLobby(v) && (
        <>
          <br />
          <Badge status="warning" text={'本服为大厅服,人数非真实'} />
        </>
      )}
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

export default class ServerList extends React.Component<{}, { data: Info[]; modal: boolean; autoUpdate: boolean }> {
  state = { data: [], modal: false, autoUpdate: false };

  render() {
    return (
      <PageHeader
        title={'公共服务器列表'}
        extra={[
          <Switch
            key={'refresh'}
            checkedChildren={'自动刷新'}
            unCheckedChildren={'自动刷新'}
            defaultChecked={true}
            onChange={v => {
              this.setState({ autoUpdate: v });
            }}
          />,
          <Button
            key={'add'}
            icon={<PlusOutlined />}
            onClick={() => {
              this.setState({ modal: true });
            }}
          >
            添加服务器
          </Button>,
        ]}
      >
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
          loading={!this.state.data.length}
          style={{ whiteSpace: 'nowrap' }}
          scroll={{ x: true }}
        >
          <Table.Column
            title="地址"
            dataIndex="address"
            fixed="left"
            render={renderAddress}
            onFilter={(f, v) => {
              if (f == 5) return v.version <= 104;
              if (f == 6) return v.version > 104 && v.version < 1000;
              if (f == 'BE') return v.version > 1000;
              return true;
            }}
            filters={[
              { text: '5.0 正式版', value: 5 },
              { text: '6.0 版本', value: 6 },
              { text: 'BE测试版', value: 'BE' },
            ]}
          />
          <Table.Column
            title="名字"
            dataIndex="name"
            render={renderInfo}
            filterMultiple
            defaultFilteredValue={['a']}
            onFilter={(f, v) => {
              if (isLobby(v)) return f == 'l';
              if (v.name.search(/[\u4e00-\u9fa5]/) == -1) return f == 'g';
              return f == 'a';
            }}
            filters={[
              { text: '显示国际服', value: 'g' },
              { text: '显示大厅服', value: 'l' },
              { text: '其他服务器', value: 'a' },
            ]}
          />
          {/*<Column title="介绍" dataIndex="description"/>*/}
          <Table.Column
            title="人数"
            dataIndex="players"
            render={renderPlayers}
            sorter={(a, b) => a.players - b.players}
          />
          <Table.Column
            title="地图"
            dataIndex="mapName"
            render={renderMap}
            onFilter={(f, v) => v.mode == f}
            filters={modeFilters}
          />
        </Table>
      </PageHeader>
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
    request('/api/servers/list').then((data: Info[]) => {
      this.setState({ data });
    });
  }
}
