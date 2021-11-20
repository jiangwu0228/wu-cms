import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Row, Col, Card, Avatar, Tag } from "antd";
import Table from "antd/lib/table";
import styled from "styled-components";

import DashboardLayout from "../../../../components/layout/dashboard/dashboardLayout";
import { getStudent } from "../../../api/api-services";
import {programLanguageColors} from '../../../../lib/constant/config';

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
  const [info, setInfo] = useState([]);
  const [about, setAbout] = useState([]);
  const [activeTabKey, setActiveTabKey] = useState("about");

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  //load data on component mount
  useEffect(() => {
    (async () => {
      const res = await getStudent(id);
      if (res) {
        const info = [
          {label: 'Name', value: res.name},
          {label: 'Age', value: res.age},
          {label: 'Email', value: res.email},
          {label: 'Phone', value: res.phone},
        ]
        const about = [
          { label: 'Eduction', value: res.education },
          { label: 'Area', value: res.country },
          { label: 'Gender', value: res.gender === 1 ? 'Male' : 'Female' },
          { label: 'Member Period', value: res.memberStartAt + ' - ' + res.memberEndAt },
          { label: 'Type', value: res.type.name },
          { label: 'Create Time', value: res.ctime },
          { label: 'Update Time', value: res.updateAt },
        ];
        setInfo(info);
        setAbout(about);
        setStudent(res);
      }
    })();
  }, []);

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

  //tab content
  const contentListNoTitle = {
    about: (
      <>
        <H3>Information</H3>

        <Row gutter={[6, 16]}>
          {about.map((item, index) => (
            <Col span={24} key={index}>
              <B>{item.label}</B>
              <span>{item.value}</span>
            </Col>
          ))}
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
              {info.map((item) => (
                <Col span={12} style={{ textAlign: "center" }} key={item.label}>
                  <b>{item.label}:</b>
                  <p>{item.value}</p>
                </Col>
              ))}

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
