import Head from 'next/head';
import styled from 'styled-components';

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
    <>
      <Head>
        <title>Teacher Dashboard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Main>
        <Heading>Teacher Dashboard works!</Heading>
      </Main>
    </>
  );
}
