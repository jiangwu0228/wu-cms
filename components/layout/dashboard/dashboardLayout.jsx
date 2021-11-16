import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import storage from "../../../lib/services/storage";
import {logout}  from "../../../pages/api/api-services";

import styled from "styled-components";
import { managerMenuConfig } from "../../../lib/config/menuConfig";

import "antd/dist/antd.css";
import { Layout, Menu, Avatar, Badge, Popover, Breadcrumb } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  BellOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import BreadCrumb from "../../common/breadcrumb";

//style
const Logo = styled.div`
  height: 64px;
  display: inline-flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #fff;
  letter-space: 5px;
  text-shadow: 5px 1px 5px;
  transform: rotateX(45deg);
  font-family: monospace;
`;

const HeaderRight = styled.div`
  display: flex;
  float: right;
  align-items: center;
  // justify-content: center;
`;

const HeaderIcon = styled.div`
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
`;

//layout
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const getMenuConfig = (menu) => {
  const baseUrl = "/dashboard/manager";
  return menu.map((item) => {
    if (item.children) {
      return (
        <SubMenu key={item.title} title={item.title} icon={item.icon}>
          {getMenuConfig(item.children)}
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item key={item.title} icon={item.icon}>
          <Link href={`${baseUrl}${item?.path}`}>{item.title}</Link>
        </Menu.Item>
      );
    }
  });
};

// const menu = getMenuConfig(managerMenuConfig);

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const [collapsed, toggleCollapse] = useState(false);
  const toggle = () => {
    toggleCollapse(!collapsed);
  };

  //logout
  const logoutRequest = async() => {
    const res =  await logout();
    if (res.code == 201) {
      storage.deleteUserInfo();
      router.push("/login");
    }
  };

  const logoutLabel = () => {
    return (
      <>
        <LoginOutlined />
        <a onClick={logoutRequest}>logout</a>
      </>
    );
  };

  return (
    <Layout>
      {/* side bar in left*/}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggle}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
        }}
      >
        <Logo>
          <Link href="/">
            <span style={{ color: "#fff", cursor: "pointer" }}>CMS</span>
          </Link>
        </Logo>

        <Menu theme="dark" defaultSelectedKeys={["overview"]} mode="inline">
          {getMenuConfig(managerMenuConfig)}
        </Menu>
      </Sider>

      {/* header and content in right */}
      <Layout className="site-layout">
        <Header
          // className="site-layout-background"
          theme="dark"
          style={{
            zIndex: 10,
            width: "100%",
            position: "sticky",
            top: 0,
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          <HeaderIcon onClick={toggle}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </HeaderIcon>
          {/* notification and profile */}
          <HeaderRight>
            <Badge size="small" count={24} offset={[13, 0]} style={{}}>
              <BellOutlined
                style={{
                  color: "#fff",
                  fontSize: "24px",
                }}
              />
            </Badge>

            <Popover placement="bottomRight" content={logoutLabel}>
              <Avatar
                icon={<UserOutlined />}
                style={{ margin: "0 0 0 2.5rem" }}
              />
            </Popover>
          </HeaderRight>
        </Header>
        {/* bread crumb nav*/}
            <BreadCrumb></BreadCrumb>
        {/* content */}
        <Content
          className="site-layout-background"
          style={{
            margin: "16px",
            padding: 16,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
