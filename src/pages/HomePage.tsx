import { Card, Col, Row, Typography, Space, Tag } from 'antd';
import {
  BarChartOutlined,
  InboxOutlined,
  ShoppingFilled,
} from '@ant-design/icons';
import { useAuthStore } from '../store';
import LineChart from '../components/icons/LineChart';

const { Title, Text } = Typography;

const recentOrders = [
  {
    name: 'Rakesh Kohali',
    address: 'main street, bandra',
    price: '₹ 1250',
    status: 'Preparing',
    color: 'red',
  },
  {
    name: 'John Doe',
    address: 'side street, bandra',
    price: '₹ 900',
    status: 'On the way',
    color: 'blue',
  },
  {
    name: 'Naman Kar',
    address: 'down street, bandra',
    price: '₹ 1900',
    status: 'Delivered',
    color: 'green',
  },
  {
    name: 'Amit Sharma',
    address: 'link road, andheri',
    price: '₹ 1450',
    status: 'Preparing',
    color: 'red',
  },
  {
    name: 'Priya Mehta',
    address: 'sv road, malad',
    price: '₹ 1100',
    status: 'On the way',
    color: 'blue',
  },
];

function HomePage() {
  const { user } = useAuthStore();

  return (
    <div style={{ padding: 24 }}>
      <Title level={4} style={{ marginBottom: 24 }}>
        Good morning {user?.firstName} 😊
      </Title>

      <Row gutter={16}>
        <Col span={16}>
          <Row gutter={16}>
            <Col span={12}>
              <Card>
                <Space size={16}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#22C55E',
                      fontSize: 20,
                    }}>
                    <ShoppingFilled />
                  </div>

                  <div>
                    <Text type="secondary">Total orders</Text>
                    <Title level={3} style={{ margin: 0 }}>
                      28
                    </Title>
                  </div>
                </Space>
              </Card>
            </Col>

            <Col span={12}>
              <Card>
                <Space size={16}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#3B82F6',
                      fontSize: 20,
                    }}>
                    <BarChartOutlined />
                  </div>

                  <div>
                    <Text type="secondary">Total sale</Text>
                    <Title level={3} style={{ margin: 0 }}>
                      ₹ 50 000
                    </Title>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>

          <Card
            style={{ marginTop: 16 }}
            title={
              <Space>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#3B82F6',
                    fontSize: 16,
                  }}>
                  <BarChartOutlined />
                </div>
                <Text strong>Sales</Text>
              </Space>
            }
            extra={
              <Space size={8}>
                {['W', 'M', 'Y'].map((label) => {
                  const isActive = label === 'M';

                  return (
                    <div
                      key={label}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: isActive ? '#F97316' : '#E5E7EB',
                        color: isActive ? '#fff' : '#000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}>
                      {label}
                    </div>
                  );
                })}
              </Space>
            }>
            <div
              style={{
                height: 260,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <LineChart />
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            title={
              <Space>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#F97316',
                    fontSize: 16,
                  }}>
                  <InboxOutlined />
                </div>
                <Text strong>Recent orders</Text>
              </Space>
            }>
            <Space direction="vertical" style={{ width: '100%' }} size={20}>
              {recentOrders.map((order, index) => (
                <Row key={index} justify="space-between" align="middle">
                  <div>
                    <Text strong>{order.name}</Text>
                    <br />
                    <Text type="secondary">{order.address}</Text>
                  </div>

                  <Space>
                    <Text strong>{order.price}</Text>
                    <Tag color={order.color}>{order.status}</Tag>
                  </Space>
                </Row>
              ))}

              <Text strong style={{ color: '#F97316', cursor: 'pointer' }}>
                See all orders
              </Text>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default HomePage;
