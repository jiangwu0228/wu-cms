import Head from "next/head";
import styled from "styled-components";
import dynamic from "next/dynamic";
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
import PieChart from "../../../components/overview/pie";
import LineChart from "../../../components/overview/line";
import BarChart from "../../../components/overview/bar";
import HeatChart from "../../../components/overview/heat";
import DistributionCard from "../../../components/overview/distributionCard";

const DistributionWithNoSSR = dynamic(
  () => import("../../../components/overview/distributionCard"),
  {
    ssr: false,
  }
);

export default function managerIndex() {
  const [overviewData, setOverviewData] = useState(null);
  const [mainCourse, setMainCourse] = useState(null);
  const [mainStudent, setMainStudent] = useState(null);
  const [mainTeacher, setMainTeacher] = useState(null);
  const [distributionRole, setDistributionRole] = useState("student");
  const [world, setWorld] = useState(null);
  const [selectedType, setSelectedType] = useState("studentType");

  useEffect(() => {
    Promise.all([
      getOverView().then(setOverviewData),
      getMainCourse().then(setMainCourse),
      getMainStudent().then(setMainStudent),
      getMainTeacher().then(setMainTeacher),
      getWorld().then(setWorld),
    ]);
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
      {world && (
        <Row gutter={[24, 16]}>
          <Col span={12}>
            <Card
              title="Distribution"
              extra={
                <Select
                  defaultValue="student"
                  bordered={false}
                  onSelect={setDistributionRole}
                >
                  <Select.Option value="student">Student</Select.Option>
                  <Select.Option value="teacher">Teacher</Select.Option>
                </Select>
              }
            >
              <DistributionWithNoSSR
                data={
                  distributionRole === "student"
                    ? mainStudent?.country
                    : mainTeacher?.country
                }
                world={world}
                title={distributionRole}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card
              title="Types"
              extra={
                <Select
                  defaultValue={selectedType}
                  bordered={false}
                  onSelect={setSelectedType}
                >
                  <Select.Option value="studentType">
                    Student Type
                  </Select.Option>
                  <Select.Option value="courseType">Course Type</Select.Option>
                  <Select.Option value="gender">Gender</Select.Option>
                </Select>
              }
            >
              {selectedType === "studentType" ? (
                <PieChart data={mainStudent?.type} title={selectedType} />
              ) : selectedType === "courseType" ? (
                <PieChart data={mainCourse?.type} title={selectedType} />
              ) : (
                <Row gutter={16}>
                  <Col span={12}>
                    <PieChart
                      data={Object.entries(overviewData?.student.gender).map(
                        ([name, amount]) => ({
                          name,
                          amount,
                        })
                      )}
                      title="student gender"
                    />
                  </Col>

                  <Col span={12}>
                    <PieChart
                      data={Object.entries(overviewData?.teacher.gender).map(
                        ([name, amount]) => ({
                          name,
                          amount,
                        })
                      )}
                      title="teacher gender"
                    />
                  </Col>
                </Row>
              )}
            </Card>
          </Col>
        </Row>
      )}
      <Row gutter={[24, 16]}>
        <Col span={12}>
          <Card title="Increment">
            <LineChart
              data={{
                student: mainStudent?.createdAt,
                teacher: mainTeacher?.createdAt,
                course: mainCourse?.createdAt,
              }}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Languages">
            <BarChart
              data={{
                interest: mainStudent?.interest,
                teacher: mainTeacher?.skills,
              }}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[24, 16]}>
        <Col span={24}>
          <Card title="Course Schedule">
            <HeatChart
              data={mainCourse?.classTime}
              title="Course schedule per weekday"
            />
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
}
