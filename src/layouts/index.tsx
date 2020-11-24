import { IRouteComponentProps, Link } from 'umi';
import React from 'react';
import { Button, Dropdown, Grid, Layout, Menu } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import {
  MenuUserInfo,
  NavUserInfo,
} from '@/pages/users/_components/NavUserInfo';

export default function({ children, location }: IRouteComponentProps) {
  const screens = Grid.useBreakpoint();
  const menuList = [
    <Menu.Item key={'maps'}>
      <Link to={'/maps'}>地图</Link>
    </Menu.Item>,
    <Menu.Item key={'servers'}>
      <Link to={'/servers'}>服务器列表</Link>
    </Menu.Item>,
    <Menu.Item key={'game'}>
      <Link to={'/game'}>获取游戏</Link>
    </Menu.Item>,
  ];
  return (
    <Layout>
      <Layout.Header>
        <span style={{ color: 'goldenrod', fontSize: '22px' }}>
          Mindustry 资源站{' '}
        </span>
        {screens.xs && (
          <Dropdown
            overlay={
              <Menu
                selectedKeys={[location.pathname.split('/')[1]]}
                mode="vertical"
              >
                <Menu.ItemGroup title={<MenuUserInfo />} children={[]} />
                <Menu.Divider />
                <Menu.ItemGroup title={'切换页面'}>{menuList}</Menu.ItemGroup>
              </Menu>
            }
          >
            <Button
              ghost
              style={{ position: 'absolute', top: '16px', right: '24px' }}
            >
              <UnorderedListOutlined />
            </Button>
          </Dropdown>
        )}
        {screens.xs || (
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname.split('/')[1]]}
            style={{ display: 'inline-block', verticalAlign: 'top' }}
          >
            {menuList}
          </Menu>
        )}
        {screens.xs || (
          <div
            style={{
              position: 'absolute',
              top: '0px',
              right: '32px',
              color: 'white',
            }}
          >
            <NavUserInfo />
          </div>
        )}
      </Layout.Header>
      <Layout.Content>{children}</Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        WayZer ©2020
      </Layout.Footer>
    </Layout>
  );
}
