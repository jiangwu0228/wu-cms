import "antd/dist/antd.css";
import { Card, Row, Col, Button } from "antd";
import { HeartFilled, UserOutlined } from "@ant-design/icons";
import  storage from "../../lib/services/storage";
import { Link } from "next/link";

const CourseCard = (props) => {
  return (
    <Card
      style={{ width: 300 }}
      cover={<img alt="example" src={props.cover} />}
    >
      <Row>
        <h3>{props.name}</h3>
      </Row>
      <Row gutter="6" justify="space-between">
        <Col>{props.startTime}</Col>
        <Col>
          <HeartFilled style={{ color: "red" }} />
          <b>{props.star}</b>
        </Col>
      </Row>
      <Row gutter="6" justify="space-between">
        <Col>Duration:</Col>
        <Col>{`${props.duration} ${
          props.duration <= 1 ? "year" : "years"
        }`}</Col>
      </Row>
      <Row gutter="6" justify="space-between">
        <Col>Teacher:</Col>
        <Col>
          <a href={"/dashboard"}>{props.teacherName}</a>
        </Col>
      </Row>
      <Row gutter="6" justify="space-between">
        <Col>
          <UserOutlined style={{ color: "blue" }} />
          <b>Student Limit:</b>
        </Col>
        <Col>{props.maxStudents}</Col>
      </Row>
      <Button type="primary" style={{ marginTop: "10px" }}>
        {/* <Link href={`/course/${props.id}`}>this course</Link> */}
        <a href={`/dashboard/${storage.role}/course/${props.id}`}>Read More</a>
      </Button>
    </Card>
  );
};

export default CourseCard;
