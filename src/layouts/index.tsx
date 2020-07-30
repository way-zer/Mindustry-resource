import { IRouteComponentProps, Link } from 'umi';
import React from 'react';
import { Layout, Menu } from 'antd';
export default function({ children, location }: IRouteComponentProps) {
  return (
    <Layout>
      <Layout.Header>
        <span style={{ color: 'goldenrod', fontSize: '22px' }}>
          Mindustry 资源站{' '}
        </span>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[location.pathname.split('/')[0]]}
          style={{ display: 'inline-block', verticalAlign: 'top' }}
        >
          <Menu.Item key={'maps'}>
            <Link to={'/maps'}>地图</Link>
          </Menu.Item>
          <Menu.Item key={'servers'}>
            <Link to={'/servers'}>服务器列表</Link>
          </Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout.Content>{children}</Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        WayZer ©2020
      </Layout.Footer>
    </Layout>
  );
}
