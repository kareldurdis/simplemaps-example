import type { NextPage } from 'next';
import Head from 'next/head';
import { Container, Row, Text } from '@nextui-org/react';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Hello world</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <Row justify="center" align="center">
            <Text h1>Hello world</Text>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default Home;
