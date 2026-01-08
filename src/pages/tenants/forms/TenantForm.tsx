import { Card, Col, Input, Row, Form } from 'antd';

const TenantForm = () => {
  return (
    <Row>
      <Col span={24}>
        <Card
          title="Basic Information"
          bordered={false}
          style={{ width: '100%' }}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Name is required',
                  },
                ]}>
                <Input size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  {
                    required: true,
                    message: 'Address is required',
                  },
                ]}>
                <Input size="large" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default TenantForm;
