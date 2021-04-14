import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  TeamOutlined
} from '@ant-design/icons';
import './style.scss';
import User from './content/users/index';

const { Header, Content,  Sider } = Layout;
const { SubMenu } = Menu;

const Body = () => {
  const [collapsed, setCollapse] = useState(false)

  const toggle  = () => {
    console.log(collapsed);
    setCollapse(!collapsed)
  }
  const handleClickMenu = e => {
    console.log(e);
  }

  return (
    <div className="manageProduct">
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />

          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={handleClickMenu}>
            <Menu.Item key="user" icon={<UserOutlined />}>
              Users
            </Menu.Item>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Products">
              <Menu.Item key="rau">Rau</Menu.Item>
              <Menu.Item key="cu">Củ</Menu.Item>
              <Menu.Item key="qua">Quả</Menu.Item>
              <Menu.Item key="nam">Nấm</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <User/>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Body;
