import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Input,
  Select,
  Row,
  Upload,
  Col,
  DatePicker,
  InputNumber,
  Modal,
} from "antd";
import ImgCrop from "antd-img-crop";
import moment from "moment";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";

import {
  getTeachers,
  getCourseTypes,
  getCourseCode,
} from "../../pages/api/api-services";
import { timeUnitMap, gutter } from "../../lib/constant/config";

const { Item } = Form;
const { TextArea } = Input;
const { Dragger } = Upload;

const DescriptionTextArea = styled(Form.Item)`
  .ant-form-item-control {
    position: absolute;
    inset: 0;
    top: 37px;
    bottom: 30px;
  }
  .ant-form-item-control-input,
  .ant-form-item-control-input-content,
  text-area {
    height: 100%;
  }
`;

const CoverImage = styled(Form.Item)`
  .ant-upload.ant-upload-select-picture-card {
    width: 100%;
    margin: 0;
  }
  .ant-form-item-control {
    position: absolute;
    inset: 0;
    top: 37px;
    bottom: 30px;
  }
  .ant-upload-picture-card-wrapper,
  .ant-form-item-control-input,
  .ant-form-item-control-input div {
    height: 100%;
  }
  .ant-upload-picture-card-wrapper img {
    object-fit: cover !important;
  }
  .ant-upload-list-item-progress,
  .ant-tooltip {
    height: auto !important;
    .ant-tooltip-arrow {
      height: 13px;
    }
  }
  .ant-upload-list-picture-card-container {
    width: 100%;
  }
  .ant-upload-list-item-actions {
    .anticon-delete {
      color: red;
    }
  }
`;

const CoverInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgb(240, 240, 240);
  width: 100%;
  .anticon {
    font-size: 44px;
    color: #1890ff;
  }
  p {
    font-size: 24px;
    color: #999;
  }
`;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const CourseForm = (props) => {
  const [form] = Form.useForm();
  const [teachers, setTeachers] = useState([]);
  const [type, setType] = useState([]);
  const [code, setCode] = useState();
  const [fileList, setFileList] = useState([]);
  //set preview image and preview title with state
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(async () => {
    const res = await getCourseTypes();
    if (!!res) {
      setType(res);
    }

    const resCode = await getCourseCode();
    if (!!res) {
      setCode(resCode);
      form.setFieldsValue({
        uid: resCode,
      });
    }
  }, []);

  const onPreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const onFinishHandler =  (values) => {
    console.log(values);
    props.onClick()
    // const {
    //   uid,
    //   name,
    //   description,
    //   type,
    //   teacher,
    //   startDate,
    //   endDate,
    //   price,
    //   image,
    // } = values;
    // const data = {
    //   uid,
    //   name,
    //   description,
    //   type,
    //   teacher,
    //   startDate,
    //   endDate,
    //   price,
    //   image,
    // };
    // const res = await props.onSubmit(data);
    // if (res) {
    //   props.onClose();
    // }
  };


  return (
    <>
      <Form layout="vertical" form={form} onFinish={onFinishHandler}>
        <Row gutter={gutter}>
          <Col span={8}>
            <Item
              label="Course Name"
              name="name"
              rules={[{ required: true }, { max: 100, min: 3 }]}
            >
              <Input type="text" placeholder="course name" />
            </Item>
          </Col>
          <Col span={16}>
            <Row gutter={gutter}>
              <Col span={8}>
                <Item
                  label="Teacher"
                  name="teacherId"
                  rules={[{ required: true }]}
                  style={{ marginLeft: 5 }}
                >
                  <Select
                    placeholder="Select teacher"
                    // notFoundContent={
                    //   isTeacherSearching ? <Spin size="small" /> : null
                    // }
                    filterOption={false}
                    showSearch
                    // disabled={role !== Role.manager}
                    onSearch={async (query) => {
                      const res = await getTeachers(query);
                      if (!!res) {
                        const data = res;
                        setTeachers(data.teachers);
                      }
                    }}
                  >
                    {teachers.map(({ id, name }) => (
                      <Select.Option key={id} value={id}>
                        {name}
                      </Select.Option>
                    ))}
                  </Select>
                </Item>
              </Col>
              <Col span={8}>
                <Item label="Type" name="type" rules={[{ required: true }]}>
                  <Select mode="multiple">
                    {type.map((type) => (
                      <Select.Option value={type.id} key={type.id}>
                        {type.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Item>
              </Col>
              <Col span={8}>
                <Item
                  label="Course Code"
                  name="uid"
                  rules={[{ required: true }]}
                >
                  <Input type="text" disabled placeholder={code}>
                    {/* {code} */}
                  </Input>
                </Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={gutter}>
          <Col span={8}>
            <Item label="Start Data">
              <DatePicker
                format="YYYY-MM-DD"
                disabledDate={(current) => {
                  // Can not select days before today and today
                  return current && current < moment().endOf("day");
                }}
                style={{ width: "100%" }}
              />
            </Item>

            <Item label="Price" name="price" rules={[{ required: true }]}>
              <InputNumber
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                min={0}
                style={{ width: "100%" }}
              />
            </Item>

            <Item
              label="Student Limit"
              name="maxStudents"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} max={10} style={{ width: "100%" }} />
            </Item>
            <Row>
              <Col span={24}>
                <Item
                  label="Duration"
                  name="duration"
                  rules={[{ required: true }]}
                >
                  {/* <Input.Group compact> */}
                  <InputNumber min={1} max={10} style={{ width: "60%" }} />
                </Item>
                <Item name="durationUnit">
                  <Select
                    defaultValue={parseInt(timeUnitMap[2])}
                    style={{ width: "40%" }}
                  >
                    {Object.keys(timeUnitMap).map((unit) => (
                      <Select.Option key={unit} value={parseInt(unit)}>
                        {timeUnitMap[unit]}
                      </Select.Option>
                    ))}
                  </Select>
                  {/* </Input.Group> */}
                </Item>
              </Col>
            </Row>
          </Col>

          <Col span={8} style={{ position: "relative" }}>
            <DescriptionTextArea
              label="Description"
              name="detail"
              rules={[
                { required: true },
                {
                  min: 100,
                  max: 1000,
                  message:
                    "Description length must between 100 - 1000 characters.",
                },
              ]}
            >
              <TextArea placeholder="Description" style={{ height: " 100%" }} />
            </DescriptionTextArea>
          </Col>

          <Col span={8}>
            <CoverImage label="Cover" name="cover">
              <ImgCrop rotate aspect={16 / 9}>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={({ fileList: newFileList, file }) => {
                    const { status } = file;
                    if (file?.response) {
                      const { url } = file.response;
                      form.setFieldsValue({ cover: url });
                    } else {
                      form.setFieldsValue({ cover: "" });
                    }
                    setIsUploading(status === "uploading");
                    setFileList(newFileList);
                  }}
                  onPreview={onPreview}
                >
                  {fileList.length < 1 && (
                    <CoverInner>
                      <InboxOutlined />
                      <p>Click or drag file to this area to upload</p>
                    </CoverInner>
                  )}
                </Upload>
              </ImgCrop>
            </CoverImage>
          </Col>
        </Row>
        <Row gutter={gutter}>
          <Col span={8}>
            <Item>
              <Button type="primary" htmlType="submit" >
                Create Course
              </Button>
            </Item>
          </Col>
        </Row>
      </Form>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default CourseForm;
