import React, { Fragment, useState, useEffect } from "react";
import Link from "next/link";

import axios from "axios";
import storage from "../../../../lib/services/storage";

import { Table, Space, Button, Search, Input } from "antd";

const ManagerStudentList = () => {
  const [studentData, setsStudentData] = useState(null);

  //get all student data request
  //will creat a file as api
  useEffect(() => {
    axios({
      method: "get",
      // url: `${baseUrl}/students?page=${page}&limit=${limit}`,
      url: "https://cms.chtoma.com/api/students?page=1&limit=100",
      headers: { Authorization: `Bearer ${storage.token}` },
    })
      .then((response) => {
        console.log(response.data.data.students);
        setsStudentData(response.data.data.students);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  //set data in array
  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      render: (_1, _2, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
      render: (_, record) => (
        <Link href={`students-list/${record.id}`}>{record.name}</Link>
      ),
    },
    { title: "Area", dataIndex: "country", key: "country" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Selected Curriculum",
      dataIndex: "courses",
      key: "courseName",
      render: (courses) => courses.map((item) => item.name).join(","),
    },
    {
      title: "Student Type",
      dataIndex: "type",
      key: "typeName",
      filters: [
        {
          text: "tester",
          value: "tester",
        },
        {
          text: "developer",
          value: "developer",
        },
      ],
      onFilter: (value, record) => record.type.name.indexOf(value) === 0,
      render: (type) => type.name,
    },
    { title: "Join Time", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  //add feature
  const handleAdd = () => {
    // const { count, dataSource } = this.state;
    // const newData = {
    //   key: count,
    //   name: `Edward King ${count}`,
    //   age: "32",
    //   address: `London, Park Lane no. ${count}`,
    // };
    // this.setState({
    //   dataSource: [...dataSource, newData],
    //   count: count + 1,
    // });
  };

  //search feature
  const onSearch = (value) => console.log(value);
  const { Search } = Input;

  return (
    <Fragment>
      <div>
        <Button
          onClick={handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button>
        <Space direction="vertical" style={{ float: "right" }}>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: 200 }}
          />
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={studentData}
        pagination={{ pageSize: 10 }}
        scroll={{ y: "max-content" }}
      />
    </Fragment>
  );
};

export default ManagerStudentList;
