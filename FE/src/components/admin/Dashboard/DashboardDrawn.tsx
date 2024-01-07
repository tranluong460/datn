import { Card, Col, Row } from 'antd'
import React from 'react'
import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineUsergroupAdd } from 'react-icons/ai'

type Props = {}

const DashboardDrawn = (props: Props) => {
    return (
        <>
            <Row gutter={16}>
                <Col span={8}>
                    <Card bordered={false}>
                        <AiOutlineShoppingCart className="text-2xl text-blue-400" />
                        <div>
                            <span className="font-bold text-lg">21</span>
                            <h4 className="font-bold text-lg">Đơn hàng thành công</h4>
                        </div>
                    </Card>

                </Col>
                <Col span={8}>
                    <Card bordered={false}>
                        <AiOutlineUsergroupAdd className="text-2xl text-blue-400" />
                        <div>
                            <span className="font-bold text-lg">21</span>
                            <h4 className="font-bold text-lg">Khách hàng</h4>
                        </div>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false}>
                        <AiOutlineUser className="text-2xl text-blue-400" />
                        <div>
                            <span className="font-bold text-lg">21</span>
                            <h4 className="font-bold text-lg">Nhân viên</h4>
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default DashboardDrawn