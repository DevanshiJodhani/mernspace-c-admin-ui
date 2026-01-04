import { Card, Layout, Space, Form, Input, Checkbox, Button, Flex } from 'antd';
import { LockFilled, LockOutlined, UserOutlined } from '@ant-design/icons';
import Logo from '../../components/icons/Logo';

const LoginPage = () => {
  return (
    <>
      <Layout
        style={{
          height: '100vh',
          display: 'grid',
          placeItems: 'center',
        }}>
        <Space direction="vertical" align="center" size="large">
          <Layout.Content
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Logo />
          </Layout.Content>
          <Card
            bordered={false}
            style={{ width: 300 }}
            title={
              <Space
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                <LockFilled />
                Sign in
              </Space>
            }>
            <Form initialValues={{ remember: true }}>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Username',
                  },
                  {
                    type: 'email',
                    message: 'Email is not vaild',
                  },
                ]}>
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password',
                  },
                ]}>
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>

              <Flex justify="space-between">
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="" id="login-form-forgot">
                  Forgot password
                </a>
              </Flex>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%', fontWeight: 'bold' }}>
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </Layout>
    </>
  );
};

export default LoginPage;
