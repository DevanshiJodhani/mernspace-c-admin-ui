import { Breadcrumb, Button, Drawer, Form, Space, Table, theme } from 'antd';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { Tenant } from '../../types';
import { getTenants } from '../../http/api';
import TenantFilter from './TenantFilter';
import { useState } from 'react';
import TenantForm from './forms/TenantForm';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const Tenants = () => {
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    data: tenants,
    isLoading,
    isError,
    error,
  } = useQuery<Tenant[]>({
    queryKey: ['tenants'],
    queryFn: async () => {
      const res = await getTenants();
      return res.data.data;
    },
  });

  return (
    <>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Breadcrumb
          separator={<RightOutlined />}
          items={[
            { title: <Link to="/">Dashboard</Link> },
            { title: 'Restaurants' },
          ]}
        />

        {isLoading && <div>Loading...</div>}
        {isError && <div>{error.message}</div>}

        <TenantFilter
          onFilterChange={(filterName: string, filterValue: string) => {
            console.log(filterName, filterValue);
          }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setDrawerOpen(true)}>
            Add Restaurant
          </Button>
        </TenantFilter>

        <Table columns={columns} dataSource={tenants} rowKey="id" />

        <Drawer
          title="Create Restaurant"
          width={720}
          styles={{ body: { background: colorBgLayout } }}
          destroyOnHidden={true}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          extra={
            <Space>
              <Button>Cancel</Button>
              <Button type="primary">Submit</Button>
            </Space>
          }>
          <Form layout="vertical">
            <TenantForm />
          </Form>
        </Drawer>
      </Space>
    </>
  );
};

export default Tenants;
