import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Row, Col, Card, Avatar, Tag } from "antd";
import Table from "antd/lib/table";
import styled from "styled-components";

import DashboardLayout from "../../../../components/layout/dashboard/dashboardLayout";
import { getStudent } from "../../../api/api-services";

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  return {
    props: { studentId: id },
  };
};

const H3 = styled.h3`
  color: #7356f1;
  margin: 20px 0px;
  font-size: 24px;
`;

const B = styled.b`
  margin-right: 16px;
  min-width: 150px;
  display: inline-block;
`;

const StudentId = (studentId) => {
  const router = useRouter();
  const id = router.query.id || studentId;
  const [student, setStudent] = useState({});
  const [activeTabKey, setActiveTabKey] = useState("about");

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  //get student data by id
  const Data = async () => {
    const res = await getStudent(id);
    if (res) setStudent(res);
  };

  //load data on component mount
  useEffect(() => {
    Data();
  }, []);
  console.log(student);

  const columns = [
    {
      title: "No.",
      key: "index",
      render: (_1, _2, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (value) => <a>{value}</a>,
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (type) => type.map((item) => item.name).join(","),
    },
    {
      title: "Join Time",
      dataIndex: "createdAt",
    },
  ];

  //table columns
  const tabListNoTitle = [
    {
      key: "about",
      tab: "About",
    },
    {
      key: "courses",
      tab: "Courses",
    },
  ];

  //color of tag
  const programLanguageColors = [
    "magenta",
    "volcano",
    "orange",
    "gold",
    "green",
    "cyan",
    "geekblue",
    "purple",
    "red",
    "lime",
  ];

  //tab content
  const contentListNoTitle = {
    about: (
      <>
        <H3>Information</H3>

        <Row gutter={[6, 16]}>
          <Col span={24} key="Education">
            <B>Education:</B>
            <span>{student.education}</span>
          </Col>
          <Col span={24} key="Area">
            <B>Area:</B>
            <span>{student?.country}</span>
          </Col>
          <Col span={24} key="Gender">
            <B>Gender:</B>
            <span>{student?.gender === 1 ? "Male" : "Female"}</span>
          </Col>
          <Col span={24} key="Member Period">
            <B>Member Period:</B>
            <span>{student?.memberStartAt + " - " + student?.memberEndAt}</span>
          </Col>
          <Col span={24} key="Type">
            <B>Type:</B>
            <span>{student?.type?.name}</span>
          </Col>
          <Col span={24} key="Create Time">
            <B>Create Time:</B>
            <span>{student?.createdAt}</span>
          </Col>
          <Col span={24} key="Update Time">
            <B>Update Time:</B>
            <span>{student?.updatedAt}</span>
          </Col>
        </Row>

        <H3>Interesting</H3>

        <Row gutter={[6, 16]}>
          <Col>
            {student?.interest?.map((item, index) => (
              <Tag
                color={programLanguageColors[index]}
                key={item}
                style={{ padding: "5px 10px" }}
              >
                {item}
              </Tag>
            ))}
          </Col>
        </Row>

        <H3>Description</H3>

        <p>{student?.description}</p>
      </>
    ),
    courses: (
      <Table dataSource={student.courses} columns={columns} rowKey="id"></Table>
    ),
  };

  return (
    <DashboardLayout>
      <Row gutter={[6, 16]}>
        <Col span={8}>
          <Card
            title={
              <Avatar
                src={student.avatar}
                style={{
                  width: 100,
                  height: 100,
                  display: "block",
                  margin: "auto",
                }}
              />
            }
          >
            <Row>
              <Col span={12} style={{ textAlign: "center" }}>
                <b>Name</b>
                <p>{student.name}</p>
              </Col>
              <Col span={12} style={{ textAlign: "center" }}>
                <b>Age</b>
                <p>{student.age}</p>
              </Col>
            </Row>
            <Row>
              <Col span={12} style={{ textAlign: "center" }}>
                <b>Email</b>
                <p>{student.email}</p>
              </Col>
              <Col span={12} style={{ textAlign: "center" }}>
                <b>Phone</b>
                <p>{student.phone}</p>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: "center" }}>
                <b>Address</b>
                <p>{student.address}</p>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={1} />
        <Col span={15}>
          <Card
            style={{ width: "100%" }}
            tabList={tabListNoTitle}
            activeTabKey={activeTabKey}
            onTabChange={(key) => {
              onTabChange(key);
            }}
          >
            {contentListNoTitle[activeTabKey]}
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
};

export default StudentId;
