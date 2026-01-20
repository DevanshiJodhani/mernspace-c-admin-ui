import {
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
  Typography,
} from 'antd';

type ProductsFilterProps = {
  children?: React.ReactNode;
};

const ProductsFilter = ({ children }: ProductsFilterProps) => {
  return (
    <Card>
      <Row justify="space-between">
        <Col span={16}>
          <Row gutter={20}>
            <Col span={6}>
              <Form.Item name="q">
                <Input.Search
                  placeholder="Search"
                  allowClear={true}
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="role">
                <Select
                  placeholder="Select Category"
                  allowClear={true}
                  size="large"
                  style={{ width: '100%' }}>
                  <Select.Option value="pizza">Pizza</Select.Option>
                  <Select.Option value="bevrages">Bevrages</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item name="role">
                <Select
                  placeholder="Select Restaurant"
                  allowClear={true}
                  size="large"
                  style={{ width: '100%' }}>
                  <Select.Option value="pizza">Pizza hub</Select.Option>
                  <Select.Option value="bevrages">Softy corner</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Space>
                <Switch defaultChecked onChange={() => {}} />
                <Typography.Text>Show only published</Typography.Text>
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={8} style={{ display: 'flex', justifyContent: 'end' }}>
          {children}
        </Col>
      </Row>
    </Card>
  );
};

export default ProductsFilter;
