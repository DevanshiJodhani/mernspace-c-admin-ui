import { Breadcrumb, Table } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { Tenant } from '../../types';
import { getTenants } from '../../http/api';

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
      <Breadcrumb
        separator={<RightOutlined />}
        items={[
          { title: <Link to="/">Dashboard</Link> },
          { title: 'Restaurants' },
        ]}
      />

      {isLoading && <div>Loading...</div>}
      {isError && <div>{error.message}</div>}

      <Table columns={columns} dataSource={tenants} />
    </>
  );
};

export default Tenants;
