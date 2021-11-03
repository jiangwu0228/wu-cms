import React, { useState } from "react";
import { Form, Input, Select, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import styled from "styled-components";

const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ModalFormSubmit = styled(Form.Item)`
  position: absolute;
  bottom: 0;
  right: 8em;
  margin-bottom: 10px;
`;
const ButtonReset = styled(Button)`
  position: absolute;
  bottom: 0;
  left: 8em;
  margin-bottom: 10px;
`;

function ManipulateStudentForm(props) {
  const [form] = Form.useForm();
  const { student, onFinish } = props;

  return (
    <Form
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      form={form}
      preserve={false}
      initialValues={{
        name: student?.name,
        email: student?.email,
        country: student?.country,
        type: student?.type.id,
      }}
      onFinish={(values) => {
        console.log(values);
      }}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input type="text" placeholder="student name" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[{ type: "email", required: true }]}
      >
        <Input type="email" placeholder="email" />
      </Form.Item>

      <Form.Item name="country" label="Area" rules={[{ required: true }]}>
        <Select>
          <Select.Option value="China">China</Select.Option>
          <Select.Option value="New Zealand">New Zealand</Select.Option>
          <Select.Option value="Canada">Canada</Select.Option>
          <Select.Option value="Australia">Australia</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="type" label="Student Type" rules={[{ required: true }]}>
        <Select>
          <Select.Option value={1}>Tester</Select.Option>
          <Select.Option value={2}>Developer</Select.Option>
        </Select>
      </Form.Item>
      <FormFooter>
        <ModalFormSubmit shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
            >
              {!!student ? "Update" : "Add"}
            </Button>
            

          )}
        </ModalFormSubmit>
        <ButtonReset
          type="primary"
          htmlType="button"
          onClick={() => {
            form.resetFields();
          }}
        >
          Reset
        </ButtonReset>
      </FormFooter>
    </Form>
  );
}

export default ManipulateStudentForm;
