import React, { useState, useEffect } from "react";
import Link from "next/link";

import {
  getStudentList,
  deleteStudent,
  addStudent,
} from "../../../../lib/services/api-services";
import AddStudentForm from "../../../../components/dashboard/common/addStudentForm";
import EditStudentForm from "../../../../components/dashboard/common/editStudentForm";

import { Table, Space, Button, Search, Input, Modal, Popconfirm } from "antd";
import { formatDistanceToNow } from 'date-fns';
import { Content } from "antd/lib/layout/layout";
import { getDomainLocale } from "next/dist/shared/lib/router/router";

const ManagerStudentList = () => {
  const [studentData, setStudentData] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  //get all student data request
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
    deleteStudent(id).then((response) => {
      // console.log(response);
      if (response.status === 200) {
        // //refresh table via api
        // getStudentList(1, 500).then((response) => {
        //   setStudentData(response.data.data.students);
        // } );
        //or update table
        //copy student data
        const newStudentData = [...studentData];
        //find index of student
        const index = newStudentData.findIndex((student) => student.id === id);
        //remove student from array
        newStudentData.splice(index, 1);
        //update student data
        setStudentData(newStudentData);
      } else {
        console.log("error, delete fail");
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
      // sorter: (a, b) => a.name.length - b.name.length,
      // sortDirections: ["descend"],
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.name.localeCompare(b.name),
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
      render: (courses) => courses?.map((item) => item.name).join(","),
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
      onFilter: (value, record) => record.type?.name.indexOf(value) === 0,
      render: (type) => type?.name,
    },
    {
      title: "Join Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) =>
        formatDistanceToNow(new Date(value), { addSuffix: true }),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <a onClick={() => showModal(record.id)}>Edit</a>
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => deleteRecordHandler(record.id)}
            okText="Confirm"
            cancelText="Cancel"
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

        <Space direction="vertical" style={{ float: "right" }}>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: 200 }}
          />
        </Space>
      </div>
      <Modal
        title="Add Student"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <AddStudentForm />
      </Modal>
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
