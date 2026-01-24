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

import type { Category, Tenant } from '../../../types';
import { useQuery } from '@tanstack/react-query';
import { getCategories, getTenants } from '../../../http/api';
import Pricing from './Pricing';
import Attributes from './Attributes';
import ProductImage from './ProductImage';

const ProductForm = () => {
  const selectedCategory = Form.useWatch('categoryId');

  // Fetching Categories
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return getCategories();
    },
  });

  // Fetching Restautants
  const { data: restaurants } = useQuery({
    queryKey: ['restaurants'],
    queryFn: () => {
      return getTenants(`perPage=100&currentPage=1`);
    },
  });

  return (
    <Row>
      <Col span={24}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Card title="Product Information">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="Product name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Product name is required',
                    },
                  ]}>
                  <Input size="large" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Category"
                  name="categoryId"
                  rules={[
                    {
                      required: true,
                      message: 'Category is required',
                    },
                  ]}>
                  <Select
                    placeholder="Select Category"
                    allowClear={true}
                    size="large"
                    style={{ width: '100%' }}>
                    {categories?.data?.categories?.map((category: Category) => (
                      <Select.Option
                        key={category._id}
                        value={JSON.stringify(category)}>
                        {category.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: 'Description is required',
                    },
                  ]}>
                  <Input.TextArea
                    rows={2}
                    maxLength={100}
                    style={{ resize: 'none' }}
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title="Product image">
            <Row gutter={20}>
              <Col span={12}>
                <ProductImage />
              </Col>
            </Row>
          </Card>

          <Card title="Tenant Information">
            <Row gutter={24}>
              <Col span={24}>
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
                    showSearch
                    allowClear
                    size="large"
                    placeholder="Search restaurant">
                    {restaurants?.data.data.map((restaurant: Tenant) => {
                      return (
                        <Select.Option
                          key={restaurant.id}
                          value={restaurant.id}>
                          {restaurant.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {selectedCategory && <Pricing selectedCategory={selectedCategory} />}

          {selectedCategory && (
            <Attributes selectedCategory={selectedCategory} />
          )}

          <Card title="Other Properties">
            <Row gutter={24}>
              <Col span={24}>
                <Space>
                  <Form.Item name="isPublish">
                    <Switch
                      defaultChecked={false}
                      onChange={() => {}}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </Form.Item>
                  <Typography.Text
                    style={{ marginBottom: 25, display: 'block' }}>
                    Published
                  </Typography.Text>
                </Space>
              </Col>
            </Row>
          </Card>
        </Space>
      </Col>
    </Row>
  );
};

export default ProductForm;
