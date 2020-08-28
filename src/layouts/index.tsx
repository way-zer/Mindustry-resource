import { IRouteComponentProps, Link } from 'umi';
import React from 'react';
import { Button, Dropdown, Grid, Layout, Menu } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';

export default function({ children, location }: IRouteComponentProps) {
  const screens = Grid.useBreakpoint();
  const menu = (
    <Menu
      theme={screens.xs ? 'light' : 'dark'}
      mode={screens.xs ? undefined : 'horizontal'}
      selectedKeys={[location.pathname.split('/')[1]]}
      style={{ display: 'inline-block', verticalAlign: 'top' }}
    >
      <Menu.Item key={'maps'}>
        <Link to={'/maps'}>地图</Link>
      </Menu.Item>
      <Menu.Item key={'servers'}>
        <Link to={'/servers'}>服务器列表</Link>
      </Menu.Item>
      <Menu.Item key={'game'}>
        <Link to={'/game'}>获取游戏</Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout>
      <Layout.Header>
        <span style={{ color: 'goldenrod', fontSize: '22px' }}>
          Mindustry 资源站{' '}
        </span>
        {screens.xs ? (
          <Dropdown overlay={menu}>
            <Button
              ghost
              style={{ position: 'absolute', top: '16px', right: '24px' }}
            >
              <UnorderedListOutlined />
            </Button>
          </Dropdown>
        ) : (
          menu
        )}
      </Layout.Header>
      <Layout.Content>{children}</Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        WayZer ©2020
      </Layout.Footer>
    </Layout>
  );
}
