import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import storage from "../../../lib/services/storage";

import styled from "styled-components";

import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb, Avatar, Badge, Popover } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  DashboardOutlined,
  TeamOutlined,
  SolutionOutlined,
  ReadOutlined,
  MessageOutlined,
  FileAddOutlined,
  BellOutlined,
  DeploymentUnitOutlined,
  EditOutlined,
  UnorderedListOutlined,
  LoginOutlined,
} from "@ant-design/icons";
// import StudentList from "../../dashboard/sider/studentList";

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

const ManagerDashboard = ({ children }) => {
  const router = useRouter();
  // const { pathname } = useRouter();
  // const manager = pathname.startsWith("/dashboard/manager");
  // const student = pathname.startsWith("/dashboard/student");
  // const teacher = pathname.startsWith("/dashboard/teacher");
  const baseUrl = "/dashboard/manager/";
  const [collapsed, toggleCollapse] = useState(false);
  const toggle = () => {
    toggleCollapse(!collapsed);
  };

  //logout
  const logoutRequest = () => {
    axios({
      method: "post",
      url: "https://cms.chtoma.com/api/logout",
      headers: { Authorization: `Bearer ${storage.token}` },
    })
      .then((response) => {
        if (response.status === 201) {
          localStorage.clear();
          router.push("/login");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const logout = () => {
    return (
      <button>
        <LoginOutlined />
        <a onClick={logoutRequest}>logout</a>
      </button>
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
          <Menu.Item
            key="overview"
            icon={<DashboardOutlined />}
            onClick={() => router.push(baseUrl)}
          >
            Overview
          </Menu.Item>

          <SubMenu key="student" icon={<SolutionOutlined />} title="Student">
            <Menu.Item
              key="studentList"
              icon={<TeamOutlined />}
              onClick={() => router.push(baseUrl + "students-list")}
            >
              Student List
            </Menu.Item>
          </SubMenu>
          {/* <StudentList/> */}

          <SubMenu
            key="teacher"
            icon={<DeploymentUnitOutlined />}
            title="Teacher"
          >
            <Menu.Item
              key="teacherList"
              icon={<TeamOutlined />}
              onClick={() => router.push(baseUrl + "teacher-list")}
            >
              Teacher List
            </Menu.Item>
          </SubMenu>

          <SubMenu key="course" icon={<ReadOutlined />} title="Course">
            <Menu.Item
              key="allCourse"
              icon={<UnorderedListOutlined />}
              onClick={() => router.push(baseUrl + "course")}
            >
              All Course
            </Menu.Item>

            <Menu.Item
              key="addCourse"
              icon={<FileAddOutlined />}
              onClick={() => router.push(baseUrl + "course/addCourse")}
            >
              Add Course
            </Menu.Item>

            <Menu.Item
              key="editCourse"
              icon={<EditOutlined />}
              onClick={() => router.push(baseUrl + "course/editCourse")}
            >
              Edit Course
            </Menu.Item>
          </SubMenu>

          <Menu.Item
            key="message"
            icon={<MessageOutlined />}
            onClick={() => router.push(baseUrl + "message")}
          >
            Message
          </Menu.Item>
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

            <Popover placement="bottomRight" content={logout}>
              <Avatar
                icon={<UserOutlined />}
                style={{ margin: "0 0 0 2.5rem" }}
              />
            </Popover>
          </HeaderRight>
        </Header>
        {/* bread crumb nav*/}
        <Breadcrumb style={{ margin: "16px 16px 0" }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
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

export default ManagerDashboard;
