//# sourceURL=dynamicScript.js
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { debounce } from "lodash";
import { formatDistanceToNow } from "date-fns";

import {
  getStudents,
  deleteStudent,
  addStudent,
  editStudent,
} from "../../../../pages/api/api-services";
import ManipulateStudentForm from "../../../../components/common/manipulateStudentForm";
import DashboardLayout from "../../../../components/layout/dashboard/dashboardLayout";

import { Table, Space, Button, Input, Modal, Popconfirm } from "antd";

const ManagerStudentList = () => {
  const [studentsData, setStudentsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [paginator, setPaginator] = useState({ page: 1, limit: 10 });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState(null);

  const { Search } = Input;

  const getStudentsHandler = useCallback(async () => {
    setIsLoading(true);
    const queryInfo = {
      page: paginator.page,
      limit: paginator.limit,
      query: query,
    };
    const res = await getStudents(queryInfo);
    setStudentsData(res.data.students);
    setTotal(res.data.total);
    setIsLoading(false);
  }, [paginator, query]);

  useEffect(() => {
    getStudentsHandler();
  }, [getStudentsHandler]);

  //on change debounce to prevent multiple request
  //don't use throttle because it will make the request too fast
  //don't need callback because we don't need to do anything after the request
  const onChange = debounce((event) => {
    setQuery(event.target.value);
  }, 1000);

  //add student feature
  const addStudentHandler = async (values) => {
    const res = await addStudent(values);
    if (!!res) {
      setStudentsData([...studentsData, res.data]);
      setIsModalVisible(false);
    }
  };

  //edit student feature
  const editStudentHandler = async (values) => {
    const res = await editStudent(values);
    if (!!res) {
      const index = studentsData.findIndex((item) => item.id === values.id);
      studentsData[index] = {
        key: res.data.id,
        ...res.data,
      };
      setStudentsData([...studentsData]);
      setIsModalVisible(false);
    }
  };

  //delete student feature
  const deleteRecordHandler = async (id) => {
    const res = await deleteStudent(id);
    if (!!res) {
      const newStudentData = [...studentsData];
      //find index of student
      const index = newStudentData.findIndex((student) => student.id === id);
      //remove student from array
      newStudentData.splice(index, 1);
      //update student data
      setStudentsData(newStudentData);
    } else {
      console.log("error, delete fail");
    }
  };

  //data and feature in table
  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      width: "5%",
      render: (_1, _2, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, record) => (
        <Link href={`students-list/${record?.id}`}>{record?.name}</Link>
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
              setEditingStudent(record);
              setIsModalVisible(true);
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
    <DashboardLayout>
      <Button
        onClick={() => {
          setIsModalVisible(true);
          setEditingStudent(null);
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
          onSearch={(value) => setQuery(value)}
          onChange={onChange}
          style={{ width: 200 }}
        />
      </Space>

      <Modal
        title={!!editingStudent ? "Edit Student" : "Add Student"}
        centered
        visible={isModalVisible}
        destroyOnClose={true}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        footer={[
          <Button
            key="submit"
            type="primary"
            // pass the form inside modal out to let the button work
            onClick={() => form?.submit()}
          >
            {!!editingStudent ? "Update" : "Add"}
          </Button>,
          <Button
            key="cancel"
            onClick={() => {
              setIsModalVisible(false);
            }}
          >
            Cancel
          </Button>,
        ]}
      >
        <ManipulateStudentForm
          setForm={setForm}
          editingStudent={editingStudent}
          onSubmit={!!editingStudent ? editStudentHandler : addStudentHandler}
        />
      </Modal>
      <Table
        columns={columns}
        dataSource={studentsData}
        loading={isLoading}
        pagination={{
          current: paginator.page,
          pageSize: paginator.limit,
          showSizeChanger: true,
          total,
          onChange: (page, pageSize) => {
            setPaginator({ page, limit: pageSize });
          },
        }}
        scroll={{ y: "max-content" }}
      />
    </DashboardLayout>
  );
};

export default ManagerStudentList;
