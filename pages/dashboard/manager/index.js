import Head from 'next/head';
import styled from 'styled-components';
import DashboardLayout from '../../../components/layout/dashboard/dashboardLayout';

const Main = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

const Heading = styled.h1`
  color: #000;
  font-size: 10rem;
  font-weight: 900;
`;

export default function Login() {
  return (
    <DashboardLayout>
      <Head>
        <title>Manager Dashboard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>managerDashboard</div>
    </DashboardLayout>
  );
}
