import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

import axios from "axios";

import styled from "styled-components";
import "antd/dist/antd.css";
import { UserOutlined } from "@ant-design/icons";
import { Form, Input, Button, Radio } from "antd";

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

function SignUp() {
  const [form] = Form.useForm();
  const router = useRouter();
  const Role = {
    student: "student",
    teacher: "teacher",
    manager: "manager",
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    axios({
      method: "post",
      url: "https://cms.chtoma.com/api/signup",
      data: {
        email: values.email,
        password: values.password,
        role: values.role,
      },
    })
      .then(function (response) {
        console.log(response.status)
        if (response.status === 201) {
          router.push("/login");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading>Sign up your account</Heading>

      <FormWrap>
        <Form
          layout="vertical"
          form={form}
          name="register"
          onFinish={onFinish}
        >
          <Form.Item
            name="role"
            label="Role"
            initialValue={Role.student}
            rules={[{required: true}]}
          >
            <Radio.Group >
              <Radio value={'student'}>Student</Radio>
              <Radio value={'teacher'}>Teacher</Radio>
              <Radio value={'manager'}>Manager</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
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
              prefix={<UserOutlined />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
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
            <Input.Password type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>

        <span>
          Already have an account? <Link href="/login">Login</Link>
        </span>
      </FormWrap>
    </>
  );
}

export default SignUp;