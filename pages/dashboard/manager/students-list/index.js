import React, { useState, useEffect } from "react";
import Link from "next/link";

import { getStudentList, deleteStudent } from "../../../../lib/services/api-services";
import  AddStudentForm from "../../../../components/dashboard/common/addStudentForm";

import { Table, Space, Button, Search, Input, Modal, Popconfirm } from "antd";
import { Content } from "antd/lib/layout/layout";

const ManagerStudentList = () => {
  const [studentData, setStudentData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  //get all student data request
  //will creat a file as api
  useEffect(() => {
    getStudentList(1, 500).then((response) => {
      // console.log(response);
      setStudentData(response.data.data.students);
    });
  }, []);

  //add modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //search feature
  const onSearch = (value) => console.log(value);
  const { Search } = Input;

  //edit feature
  const editRecordHandler = (id) => {
    console.log(id + "edit");
  };

  //delete student
  const deleteRecordHandler = (id) => {
    console.log(id + "del");
    deleteStudent(id).then((response) => {
      // console.log(response);
      if (response.status === 200) {
        console.log("delete success");
        console.log(response);
        //refresh table
        getStudentList(1, 500).then((response) => {
          // console.log(response);
          setStudentData(response.data.data.students);
        } );
      }
    });
  };

  //pagination feature
  const onShowSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(current);
  };

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
    {
      title: "Area",
      dataIndex: "country",
      key: "country",
      filters: [
        {
          text: "China",
          value: "China",
        },
        {
          text: "New Zealand",
          value: "New Zealand",
        },
        {
          text: "Canada",
          value: "Canada",
        },
        {
          text: "Australia",
          value: "Australia",
        },
      ],
      onFilter: (value, record) => record.country.indexOf(value) === 0,
    },
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
      render: (type) => type?.name,
    },
    { title: "Join Time", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <a onClick={() => editRecordHandler(record.id)}>Edit</a>
          {/* <a onClick={() => deleteRecordHandler(record.id)}>Delete</a> */}
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteRecordHandler(record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Content>
      <div>
        <Button
          onClick={showModal}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          + Add
        </Button>
        <Modal
          title="Add Student"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <AddStudentForm/>
        </Modal>
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
        pagination={{
          defaultCurrent: currentPage,
          pageSize: pageSize,
          onShowSizeChange,
        }}
        scroll={{ y: "max-content" }}
      />
    </Content>
  );
};

export default ManagerStudentList;
