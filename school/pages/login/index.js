import Head from "next/head";
import styled from "styled-components";
import React, { useState } from "react";
import { Form, Input, Button, Radio, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

const FormWarp = styled.div`
  max-width: 30rem;
  margin: auto;
`;

const Heading = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
`;

function Login() {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === "horizontal"
      ? {
          wrapperCol: {
            span: 24,
          },
        }
      : null;

  const tailFormItemLayout = {
    wrapperCol: {
      span: 24,
      offset: 0,
    },
  };

  const buttonItemLayout =
    formLayout === "horizontal"
      ? {
          wrapperCol: {
            span: 24,
            offset: 0,
          },
        }
      : null;

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading>Course Management Assistant</Heading>
      <FormWarp>
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{
            layout: formLayout,
          }}
          onValuesChange={onFormLayoutChange}
        >
          <Form.Item name="layout">
            <Radio.Group value={formLayout}>
              <Radio.Button value="Student">Student</Radio.Button>
              <Radio.Button value="Teacher">Teacher</Radio.Button>
              <Radio.Button value="Manager">Manager</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary">Submit</Button>
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            No account? <a href="/SignUp"> Sign Up</a>
          </Form.Item>
        </Form>
      </FormWarp>
    </>
  );
}

export default Login;
