import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

import axios from "axios";
import { AES } from "crypto-js";

import styled from "styled-components";
import { Form, Input, Radio, Checkbox, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

const FormWrap = styled.div`
  max-width: 30%;
  min-width: 24rem;
  margin: auto;
`;

const StyledTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
`;

const loginURL = "https://cms.chtoma.com/api/login";

const Login = () =>  {
  const [form] = Form.useForm();
  const router = useRouter();
  const Role = {
    student: "student",
    teacher: "teacher",
    manager: "manager",
  };

  const onFinish = (values) => {
    axios({
      method: "post",
      url: loginURL,
      data: {
        email: values.email,
        password: AES.encrypt(values.password, "cms").toString(),
        role: values.role,
      },
    })
      .then(function (response) {
        if (response.status === 201) {
          if (values.remember === true) {
            localStorage.setItem('myAuth', response.data.data.token);
          }
          router.push(`/dashboard/${values.role}`);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StyledTitle>Course Management Assistant</StyledTitle>

      <FormWrap>
        <Form
          name="login"
          form={form}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="role"
            initialValue={Role.manager}
            rules={[{ required: true }]}
          >
            <Radio.Group>
              <Radio.Button value="student">Student</Radio.Button>
              <Radio.Button value="teacher">Teacher</Radio.Button>
              <Radio.Button value="manager">Manager</Radio.Button>
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
            <Input prefix={<UserOutlined />} placeholder="Email" />
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
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
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
