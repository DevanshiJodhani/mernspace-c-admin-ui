import {
  Breadcrumb,
  Button,
  Drawer,
  Flex,
  Form,
  Space,
  Spin,
  Table,
  theme,
  Typography,
} from 'antd';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import { Link, Navigate } from 'react-router-dom';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import type { CreateTenantData, FieldData, Tenant } from '../../types';
import { createTenant, getTenants, updateTenant } from '../../http/api';
import TenantFilter from './TenantFilter';
import { useEffect, useMemo, useState } from 'react';
import TenantForm from './forms/TenantForm';
import { useAuthStore } from '../../store';
import { PER_PAGE } from '../../constants';
import { debounce } from 'lodash';

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

  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();

  const [currentEditingTenant, setCurrentEditingTenant] =
    useState<Tenant | null>(null);

  const [queryParams, setQueryParams] = useState({
    perPage: PER_PAGE,
    currentPage: 1,
  });

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (currentEditingTenant) {
      form.setFieldsValue(currentEditingTenant);
    }
  }, [currentEditingTenant, form]);

  // Fetch tenants
  const {
    data: tenants,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['tenants', queryParams],
    queryFn: () => {
      const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter((item) => !!item[1])
      );

      const queryString = new URLSearchParams(
        filteredParams as unknown as Record<string, string>
      ).toString();

      return getTenants(queryString).then((res) => res.data);
    },

    placeholderData: keepPreviousData,
  });

  const { user } = useAuthStore();

  // Mutation to create tenant
  const queryClient = useQueryClient();
  const { mutate: tenantMutate } = useMutation({
    mutationKey: ['tenant'],
    mutationFn: async (data: CreateTenantData) =>
      createTenant(data).then((res) => res.data),

    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
      return;
    },
  });

  // Fetch Update tenant Mutation
  const { mutate: updateTenantMutate } = useMutation({
    mutationKey: ['update-tenant'],
    mutationFn: async (data: CreateTenantData) => {
      updateTenant(data, currentEditingTenant!.id).then((res) => res.data);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
      return;
    },
  });

  // Handle filter change
  const onHandleSubmit = async () => {
    await form.validateFields();
    const isEditMode = !!currentEditingTenant;
    if (isEditMode) {
      await updateTenantMutate(form.getFieldsValue());
    } else {
      await tenantMutate(form.getFieldsValue());
    }

    form.resetFields();
    setCurrentEditingTenant(null);
    setDrawerOpen(false);
  };

  // Debounce query update for search
  const debouncedQUpdate = useMemo(() => {
    return debounce((value: string | undefined) => {
      setQueryParams((prev) => ({ ...prev, q: value, currentPage: 1 }));
    }, 500);
  }, []);

  // Handle filter changes
  const onFilterChange = (changedFields: FieldData[]) => {
    const changedFilterFields = changedFields
      .map((item) => ({
        [item.name[0]]: item.value,
      }))
      .reduce((acc, item) => ({ ...acc, ...item }), {});

    if ('q' in changedFilterFields) {
      debouncedQUpdate(changedFilterFields.q);
    } else {
      setQueryParams((prev) => ({
        ...prev,
        ...changedFilterFields,
        currentPage: 1,
      }));
    }
  };

  // Redirect if not admin
  if (user?.role !== 'admin') {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Flex justify="space-between">
          <Breadcrumb
            separator={<RightOutlined />}
            items={[
              { title: <Link to="/">Dashboard</Link> },
              { title: 'Restaurants' },
            ]}
          />

          {isFetching && <Spin />}
          {isError && (
            <Typography.Text type="danger">{error.message}</Typography.Text>
          )}
        </Flex>

        <Form form={filterForm} onFieldsChange={onFilterChange}>
          <TenantFilter>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setDrawerOpen(true)}>
              Add Restaurant
            </Button>
          </TenantFilter>
        </Form>

        <Table
          columns={[
            ...columns,
            {
              title: 'Action',
              render: (_: string, record: Tenant) => {
                return (
                  <Space>
                    <Button
                      type="link"
                      onClick={() => {
                        setCurrentEditingTenant(record);
                        setDrawerOpen(true);
                      }}>
                      Edit
                    </Button>
                  </Space>
                );
              },
            },
          ]}
          dataSource={tenants?.data}
          rowKey="id"
          pagination={{
            total: tenants?.total,
            pageSize: queryParams.perPage,
            current: queryParams.currentPage,
            onChange: (page) => {
              setQueryParams((prev) => {
                return {
                  ...prev,
                  currentPage: page,
                };
              });
            },

            showTotal: (total: number, range: number[]) => {
              return `Showing ${range[0]}-${range[1]} of ${total} items`;
            },
          }}
        />

        <Drawer
          title={currentEditingTenant ? 'Edit Restaurant' : 'Create Restaurant'}
          width={720}
          styles={{ body: { background: colorBgLayout } }}
          destroyOnHidden={true}
          open={drawerOpen}
          onClose={() => {
            form.resetFields();
            setCurrentEditingTenant(null);
            setDrawerOpen(false);
          }}
          extra={
            <Space>
              <Button
                onClick={() => {
                  setDrawerOpen(false);
                  setCurrentEditingTenant(null);
                  form.resetFields();
                }}>
                Cancel
              </Button>
              <Button type="primary" onClick={onHandleSubmit}>
                Submit
              </Button>
            </Space>
          }>
          <Form layout="vertical" form={form}>
            <TenantForm />
          </Form>
        </Drawer>
      </Space>
    </>
  );
};

export default Tenants;
