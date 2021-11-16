import { useEffect } from "react";
import { Form, Input, Select } from "antd";

function ManipulateStudentForm(props) {
  const [form] = Form.useForm();
  const { editingStudent: student, onSubmit } = props;

  useEffect(() => {
    props.setForm(form);
  });

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ offset: 1 }}
      form={form}
      initialValues={{
        name: student?.name,
        email: student?.email,
        country: student?.country,
        type: student?.type.id,
      }}
      onFinish={values => {
        if (student) {
          values.id = student.id;
        }
        onSubmit(values);
      }}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input type="text" placeholder="student name" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ type: 'email' }, { required: true }]}
      >
        <Input type="email" placeholder="email" />
      </Form.Item>

      <Form.Item label="Area" name="country" rules={[{ required: true }]}>
        <Select>
          <Select.Option value="China" key="1">
            China
          </Select.Option>
          <Select.Option value="New Zealand" key="2">
            New Zealand
          </Select.Option>
          <Select.Option value="Canada" key="3">
            Canada
          </Select.Option>
          <Select.Option value="Australia" key="4">
            Australia
          </Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Student Type" name="type" rules={[{ required: true }]}>
        <Select>
          <Select.Option value={1}>Tester</Select.Option>
          <Select.Option value={2}>Developer</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
}

export default ManipulateStudentForm;
