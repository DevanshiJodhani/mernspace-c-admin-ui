import { Form, Card, Col, Row } from 'antd';

const UserForm = () => {
  return (
    <Row>
      <Col span={24}>
        <Card title="Basic Information">
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                style={{ width: '100%' }}>
                <input style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Last Name" name="lastName">
                <input style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default UserForm;
