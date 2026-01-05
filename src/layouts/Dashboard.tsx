import { Outlet } from 'react-router-dom';

const Dashboard = () => {

    // Protaction Logic
  return (
    <div>
        <h1>Dashboard components</h1>
      <Outlet />
    </div>
  );
};

export default Dashboard;
