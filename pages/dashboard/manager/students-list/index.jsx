//# sourceURL=dynamicScript.js
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { debounce, throttle } from "lodash";
import { formatDistanceToNow } from "date-fns";

import {
  getStudentList,
  deleteStudent,
  addStudent,
  editStudent,
  searchStudentByName,
} from "../../../../lib/services/api-services";
import ManipulateStudentForm from "../../../../components/dashboard/common/manipulateStudentForm";

import {
  Table,
  Space,
  Button,
  Search,
  Input,
  Modal,
  Popconfirm,
  Form,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import { useForm } from "antd/lib/form/Form";

const ManagerStudentList = () => {
  const [studentData, setStudentData] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const [form, setForm] = useState(null);

  // const [form] = Form.useForm();
  const { Search } = Input;

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

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //on change debounce to prevent multiple request
  //don't use throttle because it will make the request too fast
  //don't need callback because we don't need to do anything after the request
  const onChange = (event) => {
    onSearch(event.target.value);
  };

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

  //add student feature
  const addStudentHandler = (values) => {
    addStudent(values)
      .then((response) => {
        if (response.status === 201) {
          setStudentData([...studentData, response.data.data]);
          setIsModalVisible(false);
        } else {
          alert("Error, try it later");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  //edit student feature
  const editStudentHandler = (values) => {
    editStudent(values)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          const index = studentData.findIndex((item) => item.id === values.id);
          studentData[index] = {
            key: response.data.data.id,
            ...response.data.data,
          };
          setStudentData([...studentData]);
          setIsModalVisible(false);
        } else {
          alert("Error, try it later");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  //delete student feature
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
      <Button
        onClick={() => {
          showModal();
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
          onSearch={onSearch}
          onChange={onChange}
          style={{ width: 200 }}
        />
      </Space>

      <Modal
        title={!!editingStudent ? "Edit Student" : "Add Student"}
        centered
        visible={isModalVisible}
        destroyOnClose={true}
        onCancel={handleCancel}
        // afterClose={() => form.resetFields()}
        footer={[
          <Button
            key="submit"
            type="primary"
            // pass the form inside modal out to let the button work
            onClick={() => form?.submit()}
          >
            {!!editingStudent ? "Update" : "Add"}
          </Button>,
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <ManipulateStudentForm
          setForm={setForm}
          editingStudent={editingStudent}
          onSubmit={!!editingStudent ? editStudentHandler : addStudentHandler}
          // onFinish={(student) => {
          //   if (!!editingStudent) {
          //     const index = data.findIndex((item) => item.id === student.id);

          //     data[index] = student;
          //     setStudentData([...data]);
          //   }

          //   setIsModalVisible(false);
          // }}
          // studentData={editingStudent}
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
