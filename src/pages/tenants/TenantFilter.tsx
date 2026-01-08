import { Card, Col, Form, Input, Row } from 'antd';

type TenantFilterProps = {
  children: React.ReactNode;
  onFilterChange: (filterName: string, value: string) => void;
};

const TenantFilter = ({ children, onFilterChange }: TenantFilterProps) => {
  return (
    <Card>
      <Form>
        <Row justify="space-between">
          <Col span={16}>
            <Row gutter={20}>
              <Col span={24}>
                <Input.Search
                  allowClear={true}
                  placeholder="Search"
                  size="large"
                  onChange={(e) =>
                    onFilterChange('searchFilter', e.target.value)
                  }
                />
              </Col>
            </Row>
          </Col>
          <Col span={8} style={{ display: 'flex', justifyContent: 'end' }}>
            {children}
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default TenantFilter;
