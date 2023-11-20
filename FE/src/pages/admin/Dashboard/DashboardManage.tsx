import { Card, Col, Row, Statistic } from "antd";

import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

const DashboardManage = () => {
  return (
    <Row gutter={24}>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title="Đặt phòng mới"
            value={100}
            precision={0}
            valueStyle={{ color: "#3f8600" }}
            prefix={<AiOutlineArrowUp />}
            suffix=""
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title="Đặt phòng một ngày"
            value={15}
            precision={2}
            valueStyle={{ color: "#cf1322" }}
            prefix={<AiOutlineArrowDown />}
            suffix="%"
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title="Tổng đặt phòng"
            value={100}
            precision={0}
            valueStyle={{ color: "#3f8600" }}
            prefix={<AiOutlineArrowUp />}
            suffix=""
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title="Tổng thu nhập"
            value={999999}
            precision={0}
            valueStyle={{ color: "#3f8600" }}
            prefix={<AiOutlineArrowUp />}
            suffix="đ"
          />
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardManage;
