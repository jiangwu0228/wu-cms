import React, { useState } from "react";

import { Steps, Button, message, Result } from "antd";

import styled from "styled-components";

import DashboardLayout from "../../../../components/layout/dashboard/dashboardLayout";
import CourseForm from "../../../../components/common/manipulateCourse";
import ScheduleForm from "../../../../components/common/manipulateSchedule";

const { Step } = Steps;
const steps = [
  {
    title: "Course Detail",
    content: <CourseForm onClick={() => next()} />,
  },
  {
    title: "Course Schedule",
    content: <ScheduleForm />,
  },
  {
    title: "Success",
    content: (
      <Result
        status="success"
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button type="primary" key="console">
            Go Console
          </Button>,
          <Button key="buy">Buy Again</Button>,
        ]}
      />
    ),
  },
];

const AddCourse = () => {
  const [current, setCurrent] = useState(0);
  console.log(current);

  const next = () => {
    setCurrent(current + 1);
  };

  const onChange = (current) => {
    console.log("onChange:", current);
    setCurrent(current);
  };

  return (
    <DashboardLayout>
      <Steps
        type="navigation"
        current={current}
        onChange={onChange}
        onToggle={() => {
          setCurrent(current + 1);
        }}
      >
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
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
