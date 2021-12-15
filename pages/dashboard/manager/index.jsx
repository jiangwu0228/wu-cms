import Head from "next/head";
import styled from "styled-components";
import dynamic from 'next/dynamic';
import DashboardLayout from "../../../components/layout/dashboard/dashboardLayout";
import {
  DeploymentUnitOutlined,
  ReadOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Card, Col, Progress, Row, Select } from "antd";
import React, { useEffect, useState } from "react";

import {
  getOverView,
  getMainCourse,
  getMainStudent,
  getMainTeacher,
  getWorld,
} from "../../api/api-services";

import OverViewCard from "../../../components/overview/overView";
import DistributionCard from "../../../components/overview/distributionCard";

const DistributionWithNoSSR = dynamic(() => import("../../../components/overview/distributionCard"), {
  ssr: false,
});

export default function managerIndex() {
  const [overviewData, setOverviewData] = useState(null);
  const [mainCourse, setMainCourse] = useState(null);
  const [mainStudent, setMainStudent] = useState(null);
  const [mainTeacher, setMainTeacher] = useState(null);
  const [distributionRole, setDistributionRole] = useState('student');
  const [world, setWorld] = useState(null);

  useEffect(async () => {
    const resOverView = await getOverView();
    if (!!resOverView) {
      setOverviewData(resOverView);
    }
    const resCourse = await getMainCourse();
    if (!!resCourse) {
      setMainCourse(resCourse);
    }
    const resStudent = await getMainStudent();
    if (!!resStudent) {
      setMainStudent(resStudent);
    }
    const resTeacher = await getMainTeacher();
    if (!!resTeacher) {
      setMainTeacher(resTeacher);
    }
    const resWorld = await getWorld();
    if (!!resWorld) {
      setWorld(resWorld);
    }
  }, []);

  const cardData = overviewData && [
    {
      title: "Courses",
      icon: <SolutionOutlined />,
      number: overviewData.student,
      color: "#1890ff",
    },
    {
      title: "Students",
      icon: <ReadOutlined />,
      number: overviewData.teacher,
      color: "#52c41a",
    },
    {
      title: "Teachers",
      icon: <DeploymentUnitOutlined />,
      number: overviewData.course,
      color: "#faad14",
    },
  ];

  // console.log(overviewData);
  // console.table(mainCourse.classTime);
  // console.log(mainStudent);
  // console.log(mainTeacher);

  return (
    <DashboardLayout>
      {overviewData && (
        <Row align="middle" gutter={[24, 16]}>
          {cardData.map((item, index) => (
            <Col key={index} span={8}>
              <OverViewCard
                title={item.title}
                data={item.number}
                icon={item.icon}
                style={{ background: item.color }}
              />
            </Col>
          ))}
        </Row>
      )}
      {world && (<Row gutter={[24, 16]}>
        <Col span={12}>
          <Card
            title="Distribution"
            extra={
              <Select defaultValue="student" bordered={false} onSelect={setDistributionRole}>
                <Select.Option value='student'>Student</Select.Option>
                <Select.Option value='teacher'>Teacher</Select.Option>
              </Select>
            }
          >
            <DistributionWithNoSSR 
            data={distributionRole === 'student' ? mainStudent.country : mainTeacher.country}
            world={world}
            title={distributionRole}
            />
          </Card>
        </Col>
      </Row>)}
    </DashboardLayout>
  );
}
