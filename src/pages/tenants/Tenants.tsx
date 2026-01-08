import { Breadcrumb } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Tenants = () => {
  return (
    <>
      <Breadcrumb
        separator={<RightOutlined />}
        items={[
          { title: <Link to="/">Dashboard</Link> },
          { title: 'Restaurants' },
        ]}
      />
    </>
  );
};

export default Tenants;
