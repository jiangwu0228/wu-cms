import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import React, { useState } from "react";
import { Form, Input, Radio, Checkbox, Button} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

const FormWrap = styled.div`
  max-width: 30%;
  min-width: 24rem;
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

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading>Course Management Assistant</Heading>

      <FormWrap>
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
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "'password' must be between 4 and 16 characters",
                min: 4,
                max: 16,
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

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{width: "100%"}}>
              Log in
            </Button>
          </Form.Item>
        </Form>
        <span>
          No account? <Link href="/signup">Sign Up</Link>
        </span>
      </FormWrap>
    </>
  );
}

export default Login;
