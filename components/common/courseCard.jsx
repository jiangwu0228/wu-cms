import "antd/dist/antd.css";
import { Card, Row, Col } from "antd";
import { HeartFilled, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";

const StyledRow = styled(Row)`
  position: relative;
  :after {
    content: '';
    position: absolute;
    bottom: 0;
    background: #f0f0f0;
    width: 100%;
    height: 1px;
  }
`;

const CourseCard = (props) => {
  return (
    <Card
      style={{ width: 300 }}
      cover={<img alt="example" src={props.cover} />}
    >
      <Row gutter={[6, 16]}>
        <h3>{props.name}</h3>
      </Row>

      <StyledRow gutter={[6, 16]} justify="space-between">
        <Col>{props.startTime}</Col>
        <Col>
          <HeartFilled style={{ color: "red" }} />
          <b>{props.star}</b>
        </Col>
      </StyledRow>

      <StyledRow gutter={[6, 16]} justify="space-between">
        <Col>Duration:</Col>
        <Col>{`${props.duration} ${
          props.duration <= 1 ? "year" : "years"
        }`}</Col>
      </StyledRow>

      <StyledRow gutter={[6, 16]} justify="space-between">
        <Col>Teacher:</Col>
        <Col>
          <a href={"/dashboard"}>{props.teacherName}</a>
        </Col>
      </StyledRow>

      <StyledRow gutter={[6, 16]} justify="space-between">
        <Col>
          <UserOutlined style={{ color: "blue" }} />
          <b>Student Limit:</b>
        </Col>
        <Col>{props.maxStudents}</Col>
      </StyledRow>

      {props.children}

    </Card>
  );
};

export default CourseCard;
