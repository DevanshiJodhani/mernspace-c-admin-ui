import { Card, Col, Form, Input, Row } from 'antd';

const TenantFilter = () => {
  return (
    <Card>
      <Form>
        <Row>
          <Col span={24}>
            <Form.Item name="q">
              <Input.Search
                placeholder="Search"
                allowClear={true}
                size="large"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default TenantFilter;
