import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import "antd/dist/antd.css";
import { Menu } from "antd";
import { TeamOutlined, SolutionOutlined } from "@ant-design/icons";
const { SubMenu } = Menu;
const StudentList = () => {
  onclick;
  return (
    <SubMenu key="student" icon={<SolutionOutlined />} title="Student">
      <Menu.Item key="Student List" icon={<TeamOutlined />}>
        Student List
      </Menu.Item>
    </SubMenu>
  );
};

export default StudentList;
