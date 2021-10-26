import React, { Fragment } from "react";

import axios from "axios";
import storage from "../../../lib/services/storage";

import { Table, Tag, Space, Button, Search, Input } from "antd";

const ManagerStudentList = () => {
  const { Column } = Table;

  console.log(storage.token);
  axios({
    method: "get",
    // url: `${baseUrl}/students?page=${page}&limit=${limit}`,
    url: "https://cms.chtoma.com/api/students?page=2&limit=10",
    headers: { Authorization: `Bearer ${storage.token}` },
  })
    .then(function (response) {
      console.log(response.data.data.students);
    })
    .catch(function (error) {
      console.log(error);
    });

  const data = [];

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
      <Table dataSource={data}>
        <Column title="No." dataIndex="index" key="index" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Area" dataIndex="country" key="country" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column
          title="Selected Curriculum"
          dataIndex="courses.name"
          key="courses.name"
        />
        <Column title="Student Type" dataIndex="type.name" key="type.name" />
        <Column title="Join Time" dataIndex="createdAt" key="createdAt" />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <a>Edit</a>
              <a>Delete</a>
            </Space>
          )}
        />
      </Table>
    </Fragment>
  );
};

export default ManagerStudentList;
