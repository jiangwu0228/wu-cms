import React, { useState } from "react";
import { useRouter } from "next/router";
import storage from "../../../../lib/services/storage";

import { Steps, Button, message, Result } from "antd";

import styled from "styled-components";

import DashboardLayout from "../../../../components/layout/dashboard/dashboardLayout";
import CourseForm from "../../../../components/common/manipulateCourse";
import ScheduleForm from "../../../../components/common/manipulateSchedule";

const { Step } = Steps;

const AddCourse = () => {
  const [current, setCurrent] = useState(0);
  const [isAdd, setAdd] = useState(false);
  const [courseInfo, setCourseInfo] = useState();
  const [scheduleInfo, setScheduleInfo] = useState(false);
  const router = useRouter();

  const steps = [
    {
      title: "Course Detail",
      content: (
        <CourseForm
          isAdd={isAdd}
          next={(data) => {
            setCurrent(current + 1);
            setAdd(true);
            setCourseInfo(data);
          }}
        />
      ),
      disabled: false,
    },
    {
      title: "Course Schedule",
      content: (
        <ScheduleForm
          courseInfo={courseInfo}
          scheduleInfo={scheduleInfo}
          next={() => {
            setCurrent(current + 1);
            setScheduleInfo(true);
          }}
        />
      ),
      // disabled: !isAdd,
      disabled: false,
    },
    {
      title: "Success",
      content: (
        <Result
          status="success"
          title="Successfully Purchased Cloud Server ECS!"
          subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
          extra={[
            <Button
              type="primary"
              key="detail"
              onClick={() =>
                router.push(
                  `/dashboard/${storage.role}/course/${courseInfo.id}`
                )
              }
            >
              Go Course
            </Button>,
            <Button
              key="again"
              onClick={() => {
                router.reload();
              }}
            >
              Create Again
            </Button>,
          ]}
        />
      ),
      // disabled: !scheduleInfo,
      disabled: false,
    },
  ];

  return (
    <DashboardLayout>
      <Steps
        type="navigation"
        current={current}
        onChange={(current) => {
          setCurrent(current);
        }}
      >
        {steps.map((item) => (
          <Step key={item.title} title={item.title} disabled={item.disabled} />
        ))}
      </Steps>
      {steps.map((content, index) => (
        <div
          key={index}
          style={{ display: index === current ? "block" : "none" }}
        >
          {content.content}
        </div>
      ))}
    </DashboardLayout>
  );
};

export default AddCourse;
