import { Button, Card, Col, Form, Input, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const TenantFilter = () => {
  return (
    <Card>
      <Form>
        <Row>
          <Col span={16}>
            <Form.Item name="q">
              <Input.Search
                placeholder="Search"
                allowClear={true}
                size="large"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={8} style={{ display: 'flex', justifyContent: 'end' }}>
            <Button type="primary" icon={<PlusOutlined />}>
              Add Tenant
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default TenantFilter;
