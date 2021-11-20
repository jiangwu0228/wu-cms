import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import "antd/dist/antd.css";
import { Row, Col, Card, Badge, Steps, Tag, Collapse } from "antd";
import { HeartFilled, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { getCourse } from "../../../api/api-services";
import DashboardLayout from "../../../../components/layout/dashboard/dashboardLayout";
import CourseCard from "../../../../components/common/courseCard";
import { programLanguageColors } from "../../../../lib/constant/config";
import Calender from "../../../../components/common/calender";

const { Step } = Steps;
const { Panel } = Collapse;

const StyledRow = styled(Row)`
  width: calc(100% + 48px);
  margin: 0 0 0 -24px !important;
`;

const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  border: 1px solid #f0f0f0;
  border-left: none;
  border-bottom: none;
  :last-child {
    border-right: none;
  }
  p {
    margin-bottom: 0;
  }
  b {
    color: #7356f1;
    font-size: 24px;
  }
`;

const StepsRow = styled(Row)`
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  .ant-steps-item-title {
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 6em;
  }
`;

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  return {
    props: { courseId: id },
  };
};

const CourseId = (courseId) => {
  const router = useRouter();
  const id = router.query.id || courseId;
  const [course, setCourse] = useState({});
  const [info, setInfo] = useState([]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  useEffect(() => {
    (async () => {
      const course = await getCourse(id);
      if (course) {
        const sales = course.sales;
        const info = [
          { label: "Price", value: sales.price },
          { label: "Batches", value: sales.batches },
          { label: "Students", value: sales.studentAmount },
          { label: "Earings", value: sales.earnings },
        ];
        setInfo(info);
        setCourse(course);
      }
    })();
  }, []);

  const onChange = (current) => {
    console.log("onChange:", current);
    setActiveChapterIndex({ current });
  };

  return (
    <DashboardLayout>
      <Row gutter={[6, 16]}>
        <Col span={8}>
          <CourseCard {...course}>
            <StyledRow gutter={[6, 16]} justify="space-between" align="middle">
              {info.map((item, index) => (
                <StyledCol span="6" key={index}>
                  <b color="blue">{item.value}</b>
                  <p color="blue">{item.label}</p>
                </StyledCol>
              ))}
            </StyledRow>
          </CourseCard>
        </Col>

        <Col span={15}>
          <Card>
            <h2>
              <b>Course Description</b>
            </h2>
            <h3>Creat Time</h3>
            <Row>{course?.ctime}</Row>

            <h3>Start Time</h3>
            <Row>{course?.startTime}</Row>

            <Badge dot>
              <h3>Status</h3>
            </Badge>

            <StepsRow>
              <Steps
                current={activeChapterIndex}
                onChange={onChange}
                size="small"
                style={{ width: "auto" }}
              >
                {course?.schedule?.chapters.map((item) => (
                  <Step title={item.name} key={item.id}></Step>
                ))}
              </Steps>
            </StepsRow>

            <h3>Course Code</h3>
            <Row>{course?.uid}</Row>

            <h3>Class Time</h3>
            <Calender data={course?.schedule?.classTime} />

            <h3>Category</h3>
            <Row>
              {course?.type?.map((item, index) => (
                <Tag color={programLanguageColors[index]} key={item.id}>
                  {item.name}
                </Tag>
              ))}
            </Row>

            <h3>Description</h3>
            <Row>{course?.detail}</Row>

            <h3>Chapter</h3>
            {course?.schedule && (
              <Collapse defaultActiveKey={[course?.schedule?.current]}>
                {course?.schedule?.chapters.map((item, index) => (
                  <Panel
                    header={item.name}
                    key={index}
                    showArrow={true}
                    extra={
                      <Tag color={programLanguageColors[index]}>{item.id}</Tag>
                    }
                  >
                    <Row>{item.content}</Row>
                  </Panel>
                ))}
              </Collapse>
            )}
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
};

export default CourseId;
