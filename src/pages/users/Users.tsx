import {
  Form,
  Breadcrumb,
  Button,
  Drawer,
  Space,
  Table,
  theme,
  Spin,
  Flex,
  Typography,
} from 'antd';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import { Link, Navigate } from 'react-router-dom';
import { debounce } from 'lodash';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { createUser, getUsers, updateUser } from '../../http/api';
import type { CreateUserData, FieldData, User } from '../../types';
import { useAuthStore } from '../../store';
import UsersFilter from './UsersFilter';
import { useEffect, useMemo, useState } from 'react';
import UserForm from './forms/UserForm';
import { PER_PAGE } from '../../constants';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'firstName',
    key: 'firstName',
    render: (_text: string, record: User) => {
      return (
        <div>
          {record.firstName} {record.lastName}
        </div>
      );
    },
  },

  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },

  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Restaurant',
    dataIndex: 'tenant',
    key: 'tenant',
    render: (_text: string, record: User) => {
      return <div>{record.tenant?.name}</div>;
    },
  },
];

const Users = () => {
  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();

  const [currentEditingUser, setCurrentEditingUser] = useState<User | null>(
    null
  );

  const queryClient = useQueryClient();
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const [queryParams, setQueryParams] = useState({
    perPage: PER_PAGE,
    currentPage: 1,
  });

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (currentEditingUser) {
      form.setFieldsValue({
        ...currentEditingUser,
        tenantId: currentEditingUser.tenant?.id,
      });
    }
  }, [currentEditingUser, form]);

  const {
    data: users,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['users', queryParams],
    queryFn: () => {
      const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter((item) => !!item[1])
      );

      const queryString = new URLSearchParams(
        filteredParams as unknown as Record<string, string>
      ).toString();

      return getUsers(queryString).then((res) => res.data);
    },
    placeholderData: keepPreviousData,
  });

  const { user } = useAuthStore();

  // Fetch create user mutation
  const { mutate: userMutate } = useMutation({
    mutationKey: ['user'],
    mutationFn: async (data: CreateUserData) =>
      createUser(data).then((res) => res.data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      return;
    },
  });

  // Fetch Update user mutation
  const { mutate: updateUserMutate } = useMutation({
    mutationKey: ['update-user'],
    mutationFn: async (data: CreateUserData) =>
      updateUser(data, currentEditingUser!.id).then((res) => res.data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      return;
    },
  });

  // Handle form submit
  const onHandleSubmit = async () => {
    await form.validateFields();
    const isEditMode = !!currentEditingUser;

    if (isEditMode) {
      await updateUserMutate(form.getFieldsValue());
    } else {
      await userMutate(form.getFieldsValue());
    }

    form.resetFields();
    setCurrentEditingUser(null);
    setDrawerOpen(false);
  };

  // Debounced query update
  const debouncedQUpdate = useMemo(() => {
    return debounce((value: string | undefined) => {
      setQueryParams((prev) => ({ ...prev, q: value, currentPage: 1 }));
    }, 500);
  }, []);

  // Handle filter change
  const onFilterChange = (changedFields: FieldData[]) => {
    console.log(changedFields);

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
              { title: 'Users' },
            ]}
          />

          {isFetching && <Spin />}
          {isError && (
            <Typography.Text type="danger">{error.message}</Typography.Text>
          )}
        </Flex>

        <Form form={filterForm} onFieldsChange={onFilterChange}>
          <UsersFilter>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setDrawerOpen(true)}>
              Add User
            </Button>
          </UsersFilter>
        </Form>

        <Table
          columns={[
            ...columns,
            {
              title: 'Action',
              render: (_: string, record: User) => {
                return (
                  <Space>
                    <Button
                      type="link"
                      onClick={() => {
                        setCurrentEditingUser(record);
                        setDrawerOpen(true);
                      }}>
                      Edit
                    </Button>
                  </Space>
                );
              },
            },
          ]}
          dataSource={users?.data}
          rowKey={'id'}
          pagination={{
            total: users?.total,
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
          title={currentEditingUser ? 'Edit User' : 'Create User'}
          width={720}
          styles={{ body: { background: colorBgLayout } }}
          destroyOnClose={true}
          open={drawerOpen}
          onClose={() => {
            form.resetFields();
            setCurrentEditingUser(null);
            setDrawerOpen(false);
          }}
          extra={
            <Space>
              <Button
                onClick={() => {
                  setDrawerOpen(false);
                  form.resetFields();
                }}>
                Cancle
              </Button>
              <Button type="primary" onClick={onHandleSubmit}>
                Submit
              </Button>
            </Space>
          }>
          <Form layout="vertical" form={form}>
            <UserForm isEditMode={!!currentEditingUser} />
          </Form>
        </Drawer>
      </Space>
    </>
  );
};

export default Users;
