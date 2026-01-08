import { Card, Col, Input, Row, Select } from 'antd';

type UsersFilterProps = {
  children?: React.ReactNode;
  onFilterChange: (filterName: string, filterValue: string) => void;
};

const UsersFilter = ({ onFilterChange, children }: UsersFilterProps) => {
  return (
    <Card>
      <Row justify="space-between">
        <Col span={16}>
          <Row gutter={20}>
            <Col span={12}>
              <Input.Search
                placeholder="Search"
                allowClear={true}
                size='large'
                onChange={(e) => onFilterChange('searchFilter', e.target.value)}
              />
            </Col>
            <Col span={6}>
              <Select
                placeholder="Select Role"
                allowClear={true}
                size='large'
                onChange={(selectedItem) =>
                  onFilterChange('roleFilter', selectedItem)
                }
                style={{ width: '100%' }}>
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="manager">Manager</Select.Option>
                <Select.Option value="customer">Customer</Select.Option>
              </Select>
            </Col>
            <Col span={6}>
              <Select
                placeholder="Status"
                allowClear={true}
                size='large'
                onChange={(selectedItem) =>
                  onFilterChange('statusFilter', selectedItem)
                }
                style={{ width: '100%' }}>
                <Select.Option value="ban">Ban</Select.Option>
                <Select.Option value="active">Active</Select.Option>
              </Select>
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

export default UsersFilter;
