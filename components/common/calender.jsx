// calender component for classTime
import React from "react";
import { Table } from "antd";
import { weekDays } from "../../lib/constant/config";

const Calender = (props) => {
  const columns = weekDays.map((day) => {
    return {
      title: day,
      dataIndex: day,
      key: day,
      align: "center",
    };
  });

  // const mokeData = ["Friday 07:07:00", "Sunday 12:05:00"];
  // const mokeData2 = [{ Friday: "07:07:00", Sunday: "12:05:00" }];
  // const data = [Object.fromEntries(mokeData.map((s) => s.split(" ")))];

  const data = [
    props.data?.reduce((acc, curr) => {
      const [key, value] = curr.split(" ");
      acc[key] = value;
      return acc;
    }, {}),
  ];

  return (
    <Table
      size="small"
      bordered
      pagination={false}
      columns={columns}
      dataSource={data}
    />
  );
};

export default Calender;
