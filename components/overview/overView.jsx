import { Row, Col, Card, Progress } from "antd";
import styled from "styled-components";

export const OverviewIconCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  .anticon {
    background: #fff;
    padding: 25px;
    border-radius: 50%;
    color: #999;
  }
`;

export const OverviewCol = styled(Col)`
  color: #fff;
  h3 {
    color: #fff;
  }
  h2 {
    color: #fff;
    font-size: 32px;
    margin-bottom: 0;
  }
`;

const OverViewCard = (props) => {
  const lastMonthAddedPercent = parseFloat(
    (props.data.lastMonthAdded / props.data.total) * 100
  ).toFixed(1);

  return (
    <Card style={{ borderRadius: 5, cursor: "pointer", ...props.style }}>
      <Row>
        <OverviewIconCol span={6}>{props.icon}</OverviewIconCol>
        <OverviewCol span={18}>
          <h3>{props.title}</h3>
          <h2>{props.data.total}</h2>
          <Progress
            percent={100 - lastMonthAddedPercent}
            size="small"
            showInfo={false}
            strokeColor="white"
            trailColor="lightgreen"
          />
          <p>{`${lastMonthAddedPercent + "%"} Increase in 30 Days`}</p>
        </OverviewCol>
      </Row>
    </Card>
  );
};

export default OverViewCard;
