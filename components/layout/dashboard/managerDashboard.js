import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import axios from "axios";
import storage from "../../../lib/services/storage";

import styled from "styled-components";

import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb, Avatar, Image, Badge, Popover } from "antd";
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
} from "@ant-design/icons";
import StudentList from "../../dashboard/sider/studentList";

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
  display: block;
  float: right;
`;

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const ManagerDashboard = ({ children }) => {
  const router = useRouter();
  const { pathname } = useRouter();
  const manager = pathname.startsWith("/dashboard/manager");
  const student = pathname.startsWith("/dashboard/student");
  const teacher = pathname.startsWith("/dashboard/teacher");
  const baseUrl = "/dashboard/manager/";
  console.log(student);
  const [collapsed, toggleCollapse] = useState(false);
  const toggle = () => {
    toggleCollapse(!collapsed);
  };

  const logoutRequest = () => {
    axios({
      method: "post",
      // url: `${baseUrl}/students?page=${page}&limit=${limit}`,
      url: "https://cms.chtoma.com/api/logout",
      headers: { Authorization: `Bearer ${storage.token}` },
    })
      .then((response) => {
        if (response.status === 201) {
          localStorage.clear()
          router.push('/login');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const logout = () => {
    //will do it later
    return <a onClick={logoutRequest}>logout</a>;
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggle}>
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

      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}

          <HeaderRight>
            <Badge count={100}>
              {/* <Avatar shape="square" size="default" /> */}
              <BellOutlined style={{ fontSize: "1.5rem" }} />
            </Badge>

            <Popover placement="bottomRight" content={logout}>
              <Avatar
                icon={<UserOutlined />}
                style={{ margin: "0 1.5rem 0 3rem" }}
              />
            </Popover>
          </HeaderRight>
        </Header>

        <Breadcrumb style={{ margin: "16px 16px 0" }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>

        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManagerDashboard;
