import React, { useEffect, useState } from "react";
import { Row, Col, Form, Input, Button, Space, Select, TimePicker } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";

import { weekDays } from "../../lib/constant/config";
import { editSchedule } from "../../pages/api/api-services";

const { Option } = Select;

const ScheduleForm = (props) => {
  const [form] = Form.useForm();
  //an object has key as weekday and value as true or false
  // const [weekDays, setWeekDays] = useState((prevValues) => {
  //   console.log("prevValues", prevValues);
  //   return {
  //     Monday: false,
  //     Tuesday: false,
  //     Wednesday: false,
  //     Thursday: false,
  //     Friday: false,
  //     Saturday: false,
  //     Sunday: false,
  //   };
  // });

  const classWeekDays = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  const [selectedDay, setSelectedDay] = useState([]);

  const onFinish = async (values) => {
    // const { classTime, chapters } = values;
    const classTimes = values.classTime.map((value) => {
      return `${value.weekday} ${moment(value.time).format("HH:mm:ss")}`;
    });
    const chapter = values.chapters.map((item, index) => ({
      ...item,
      order: index + 1,
    }));
    const data = {
      classTime: classTimes,
      chapters: chapter,
      scheduleId: props.courseInfo?.scheduleId,
      courseId: props.courseInfo?.id,
    };
    const res = await editSchedule(data);
    if (!!res) {
      props.next();
    }
  };

  const handleChange = (value) => {
    console.log(value);
  };

  return (
    <Form
      form={form}
      name="schedule"
      onFinish={onFinish}
      autoComplete="off"
      initialValues={{
        chapters: [{ name: "", content: "" }],
        classTime: [{ weekday: "", time: "" }],
      }}
    >
      <Row gutter={[6, 16]}>
        <Col span={12}>
          <h2>Chapters</h2>
          <Form.List name="chapters">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Row key={key} align="baseline">
                    <Col span={8}>
                      <Form.Item
                        {...restField}
                        name={[name, "name"]}
                        fieldKey={[fieldKey, "name"]}
                        rules={[
                          { required: true, message: "Missing Chapter name" },
                        ]}
                      >
                        <Input placeholder="Chapter Name" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[name, "content"]}
                        fieldKey={[fieldKey, "content"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing Chapter content",
                          },
                        ]}
                      >
                        <Input placeholder="Chapter Content" />
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Col>
                    <Col style={{ display: "none" }}>
                      <Form.Item
                        {...restField}
                        name={[name, "order"]}
                        fieldKey={[fieldKey, "order"]}
                      >
                        <Input placeholder="Order" defaultValue={key} />
                      </Form.Item>
                    </Col>
                  </Row>
                ))}
                <Row>
                  <Col span={20}>
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Chapter
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}
          </Form.List>
        </Col>

        <Col span={12}>
          <h2>Class Time</h2>
          <Form.List name="classTime">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Row key={field.key} align="baseline">
                    <Col span={8}>
                      <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, curValues) =>
                          prevValues.area !== curValues.area ||
                          prevValues.sights !== curValues.sights
                        }
                      >
                        {() => (
                          <Form.Item
                            {...field}
                            name={[field.name, "weekday"]}
                            fieldKey={[field.fieldKey, "weekday"]}
                            rules={[
                              { required: true, message: "Missing weekday" },
                            ]}
                          >
                            <Select
                              style={{ width: 130 }}
                              onChange={(value, key) => {
                                // console.log(value);
                                // setClassWeekDays((e) => {
                                //   console.log(e);
                                //   return { ...weekDays, [value]: true };
                                // });
                                // console.log(weekDays);
                                  console.log(value);
                                  console.log(key)
                                // if (selectedDay.includes(value.labelInValue)) {
                                //   delete selectedDay[value.item],
                                //     setSelectedDay([...selectedDay, value]);
                                // } else {
                                //   setSelectedDay([...selectedDay, value]);
                                // }
                              }}
                            >
                              {Object.keys(classWeekDays).map((item, index) => (
                                <Option
                                  key={index}
                                  value={classWeekDays[item]}
                                  disabled={selectedDay.includes(item)}
                                >
                                  {/* {classWeekDays[item]} */}
                                  {classWeekDays[item]}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        {...field}
                        name={[field.name, "time"]}
                        fieldKey={[field.fieldKey, "time"]}
                        // normalize={(value) => moment(value).format("HH:mm:ss")}
                        rules={[{ required: true, message: "Missing time" }]}
                      >
                        <TimePicker style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Col>
                  </Row>
                ))}
                <Row>
                  <Col span={20}>
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Class Time
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}
          </Form.List>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {!!props.scheduleInfo ? "Update" : "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ScheduleForm;
