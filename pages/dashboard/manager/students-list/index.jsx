//# sourceURL=dynamicScript.js
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { debounce } from "lodash";
import { formatDistanceToNow } from "date-fns";

import {
  getStudentList,
  deleteStudent,
  addStudent,
  searchStudentByName,
} from "../../../../lib/services/api-services";
import AddStudentForm from "../../../../components/dashboard/common/addStudentForm";
import EditStudentForm from "../../../../components/dashboard/common/editStudentForm";

import { Table, Space, Button, Search, Input, Modal, Popconfirm } from "antd";
import { Content } from "antd/lib/layout/layout";
import { getDomainLocale } from "next/dist/shared/lib/router/router";
import { useForm } from "antd/lib/form/Form";

const ManagerStudentList = () => {
  const [form] = useForm();
  const { Search } = Input;

  const [studentData, setStudentData] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  //get all student data request
  useEffect(() => {
    getStudentList(1, 500).then((response) => {
      if (response.status === 200) {
        setStudentData(response.data.data.students);
      } else {
        alert("Error, try it later");
      }
      // console.log(response);
    });
  }, []);

  //add/edit modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //on change debounce to prevent multiple request
  const onChange = debounce((event) => {
    onSearch(event.target.value);
  }, 1000);
  //manual search feature
  const onSearch = (value) => {
    searchStudentByName(value)
      .then((response) => {
        if (response.status === 200) {
          setStudentData(response.data.data.students);
        }
      })
      .catch((error) => {
        alert(error);
      });
    //this is feature sort by name in local data
    // const searchData = studentData.filter((student) => {
    //   return student.name.toLowerCase().includes(value.toLowerCase());
    // });
    // setStudentData(searchData);
  };

  //add student
  const addStudent = (values) => {
    setEditingStudent(null);
    console.log(editingStudent);
  };

  //edit feature
  const editRecordHandler = (value) => {
    setEditingStudent(value);
    console.log(editingStudent);
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
        //or update table by local data
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

  //data and feature in table
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
          <a
            onClick={() => {
              editRecordHandler(record);
              showModal();
              // setEditingStudent(record);
              // console.log(editingStudent);
            }}
          >
            Edit
          </a>
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
          onClick={() => {
            addStudent();
            showModal();
          }}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          + Add
        </Button>

        <Space direction="vertical" style={{ float: "right" }}>
          <Search
            placeholder="Search by name"
            onSearch={onSearch}
            onChange={onChange}
            style={{ width: 200 }}
          />
        </Space>
      </div>
      <Modal
        title={!!editingStudent ? "Edit Student" : "Add Student"}
        centered
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <AddStudentForm
        // form={form}
        // editingStudent={editingStudent}
        />
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
