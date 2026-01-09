import { useQuery } from '@tanstack/react-query';
import { Form, Card, Col, Row, Input, Space, Select } from 'antd';
import { getTenants } from '../../../http/api';
import type { Tenant } from '../../../types';

const UserForm = () => {
  const { data: tenants } = useQuery({
    queryKey: ['tenants'],
    queryFn: () => {
      return getTenants(`perPage=100&currentPage=1`).then((res) => res.data);
    },
  });

  return (
    <Row>
      <Col span={24}>
        <Space direction="vertical" size="large">
          <Card title="Basic Information">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: 'First name is required',
                    },
                  ]}>
                  <Input size="large" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: 'Last name is required',
                    },
                  ]}>
                  <Input size="large" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Email is required',
                    },
                    {
                      type: 'email',
                      message: 'Please enter a valid email',
                    },
                  ]}>
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title="Security Information">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Password is required',
                    },
                  ]}>
                  <Input size="large" type="password" />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title="Auth Information">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="Role"
                  name="role"
                  rules={[
                    {
                      required: true,
                      message: 'Role is required',
                    },
                  ]}>
                  <Select
                    style={{ width: '100%' }}
                    allowClear={true}
                    onChange={() => {}}
                    placeholder="Select Role"
                    size="large">
                    <Select.Option value="admin">Admin</Select.Option>
                    <Select.Option value="manager">Manager</Select.Option>
                    <Select.Option value="customer">Customer</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Restaurant"
                  name="tenantId"
                  rules={[
                    {
                      required: true,
                      message: 'Restaurant is required',
                    },
                  ]}>
                  <Select
                    style={{ width: '100%' }}
                    allowClear={true}
                    onChange={() => {}}
                    placeholder="Select Restaurant"
                    size="large">
                    {tenants?.data.map((tenant: Tenant) => (
                      <Select.Option value={tenant.id} key={tenant.id}>
                        {tenant.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Space>
      </Col>
    </Row>
  );
};

export default UserForm;
